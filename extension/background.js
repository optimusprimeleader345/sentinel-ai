// SentinelAI Browser Guard - Background Service Worker
// Real-time URL threat scanning and site blocking

// Configuration
const API_BASE_URL = 'http://localhost:5000'; // Update with your actual backend URL
const SCAN_ENDPOINT = '/api/url/scan';
const PHISHING_ENDPOINT = '/api/phishing/detect';
const SCAN_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const MAX_CACHE_SIZE = 100;

// Global state
let scanCache = new Map();
let extensionEnabled = true;
let blockingEnabled = true;
let blockedSites = new Set();

// Initialize extension
chrome.runtime.onStartup.addListener(initializeExtension);
chrome.runtime.onInstalled.addListener(initializeExtension);

async function initializeExtension() {
  console.log('🛡️ SentinelAI Browser Guard initialized');

  // Load settings from storage
  const result = await chrome.storage.local.get(['extensionEnabled', 'blockingEnabled', 'blockedSites']);
  extensionEnabled = result.extensionEnabled ?? true;
  blockingEnabled = result.blockingEnabled ?? true;
  blockedSites = new Set(result.blockedSites || []);

  // Set up navigation listener
  chrome.tabs.onUpdated.addListener(handleTabUpdate);
  chrome.webNavigation.onDOMContentLoaded.addListener(handleNavigation);

  // Handle keyboard shortcuts
  chrome.commands.onCommand.addListener(handleCommand);

  // Handle messages from content scripts
  chrome.runtime.onMessage.addListener(handleContentScriptMessage);

  // Cleanup cache periodically
  setInterval(cleanupCache, SCAN_CACHE_DURATION);
}

// Handle messages from content scripts (phishing analysis, etc.)
function handleContentScriptMessage(message, sender, sendResponse) {
  if (message.action === 'phishingPageAnalysis') {
    // Handle phishing analysis from content script
    handlePhishingAnalysis(sender.tab.id, message.data);
    sendResponse({ success: true });
    return true;
  }

  sendResponse({ success: false, error: 'Unknown action' });
  return true;
}

// Handle phishing analysis from content script
async function handlePhishingAnalysis(tabId, analysisData) {
  try {
    console.log(`🔍 Analyzing phishing threats for tab ${tabId}: ${analysisData.url}`);

    // Send analysis data to backend phishing detection API
    const response = await fetch(`${API_BASE_URL}${PHISHING_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Extension-Version': chrome.runtime.getManifest().version
      },
      body: JSON.stringify(analysisData)
    });

    let result;

    if (response.ok) {
      result = await response.json();

      // Extract the actual analysis result from the response
      if (result.success && result.hasOwnProperty('riskLevel')) {
        // Response is already the analysis result
        result = result;
      } else {
        // Fallback to error message
        result = {
          riskLevel: 'MEDIUM',
          score: 65,
          confidence: 50,
          threatsDetected: [{ type: 'phishing_analysis', severity: 'medium', description: 'Phishing analysis returned unexpected format', score: 10 }],
          recommendation: 'WARN_USER',
          detectionType: 'analysis_error',
          url: analysisData.url,
          timestamp: new Date().toISOString()
        };
      }
    } else {
      console.warn('Phishing API failed, falling back to basic analysis');
      // Fallback analysis if backend is unavailable
      result = await performBasicPhishingAnalysis(analysisData);
    }

    // Handle phishing detection result
    await handlePhishingResult(tabId, analysisData.url, result);

  } catch (error) {
    console.error('Phishing analysis failed:', error);
    // Fallback to minimal analysis
    const fallbackResult = await performBasicPhishingAnalysis(analysisData);
    await handlePhishingResult(tabId, analysisData.url, fallbackResult);
  }
}

// Handle phishing detection result
async function handlePhishingResult(tabId, url, result) {
  try {
    console.log(`🛡️ Phishing analysis for ${url}: ${result.riskLevel} (${result.score})`);

    // Update extension icon to show phishing risk level
    await updateIcon(tabId, result.riskLevel);

    // Handle high-risk phishing sites
    if (result.riskLevel === 'HIGH' && blockingEnabled && !isWhitelisted(url)) {
      await blockPhishingSite(tabId, result);
      return;
    }

    // Show warnings for medium/high risk
    if ((result.riskLevel === 'HIGH' || result.riskLevel === 'MEDIUM') && blockingEnabled) {
      await showPhishingWarningNotification(tabId, result);
    }

    // Log phishing analysis
    logPhishingResult(url, result);

  } catch (error) {
    console.error('Error handling phishing result:', error);
  }
}

// Block a phishing site
async function blockPhishingSite(tabId, result) {
  try {
    console.log(`🚫 Blocking phishing site: ${result.url}`);

    // Use content script to inject phishing-specific blocking overlay
    await chrome.tabs.sendMessage(tabId, {
      action: 'blockSite',
      reason: getBlockingReason(result)
    });

    // Update blocked sites list
    blockedSites.add(cleanUrl(result.url));
    saveBlockedSites();

  } catch (error) {
    console.error('Error blocking phishing site:', error);
    // Fallback to browser notification
    await showPhishingWarningNotification(tabId, result);
  }
}

// Show phishing warning notification
async function showPhishingWarningNotification(tabId, result) {
  try {
    const notificationId = `phishing-alert-${Date.now()}`;

    // Get primary threat description
    const primaryThreat = result.threatsDetected[0] || {};
    const message = primaryThreat.description ?
      (primaryThreat.description.length > 50 ? primaryThreat.description.substring(0, 50) + '...' : primaryThreat.description) :
      'Potential phishing activity detected';

    await chrome.notifications.create(notificationId, {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icon16.png'),
      title: `🎣 PHISHING ALERT - ${result.riskLevel}`,
      message: message,
      buttons: [
        { title: 'View Details' },
        { title: 'Continue Risk' }
      ],
      requireInteraction: true
    });

    // Handle notification button clicks
    chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
      if (notifId === notificationId) {
        if (btnIdx === 0) {
          // Open extension popup to show details
          chrome.action.openPopup();
        }
        chrome.notifications.clear(notifId);
      }
    });

  } catch (error) {
    console.error('Error showing phishing notification:', error);
  }
}

// Basic fallback phishing analysis (when backend is unavailable)
async function performBasicPhishingAnalysis(analysisData) {
  const threats = [];
  let score = 0;

  // Basic keyword analysis
  const suspiciousKeywords = ['login', 'verify', 'account', 'password', 'bank', 'paypal', 'security'];
  const text = (analysisData.visibleText || '') + ' ' + (analysisData.htmlContent || '').substring(0, 1000);

  let keywordMatches = 0;
  suspiciousKeywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = text.match(regex);
    if (matches) keywordMatches += matches.length;
  });

  if (keywordMatches > 3) {
    score += Math.min(keywordMatches * 10, 50);
    threats.push({
      type: 'keyword',
      severity: 'medium',
      description: `Found ${keywordMatches} suspicious authentication-related keywords`,
      score: Math.min(keywordMatches * 10, 40)
    });
  }

  // Form analysis
  const forms = analysisData.formFields || [];
  const hasPasswordField = forms.some(form =>
    form.type === 'password' || form.name?.toLowerCase().includes('pass')
  );

  const hasEmailField = forms.some(form =>
    form.type === 'email' || form.name?.toLowerCase().includes('email')
  );

  if (hasPasswordField && hasEmailField) {
    score += 25;
    threats.push({
      type: 'login_form',
      severity: 'medium',
      description: 'Identified login form with email-password combination',
      score: 25
    });
  }

  // Domain analysis
  if (analysisData.domain?.hasSuspiciousTLD) {
    score += 20;
    threats.push({
      type: 'domain',
      severity: 'low',
      description: `Suspicious domain extension: .${analysisData.domain.tld}`,
      score: 20
    });
  }

  // Determine risk level
  let riskLevel = 'LOW';
  if (score > 60) {
    riskLevel = 'MEDIUM';
  } else if (score > 30) {
    riskLevel = 'LOW';
  }

  return {
    url: analysisData.url,
    riskLevel,
    score: Math.min(score, 100),
    confidence: 25, // Low confidence when using basic analysis
    threatsDetected: threats,
    recommendation: riskLevel === 'MEDIUM' ? 'WARN_USER' : 'ALLOW_ACCESS',
    detectionType: 'basic_fallback',
    metadata: {
      keywordMatches,
      hasPasswordField,
      hasEmailField,
      suspiciousTLD: analysisData.domain?.hasSuspiciousTLD,
      fallback: true
    }
  };
}

// Get blocking reason for phishing sites
function getBlockingReason(result) {
  const primaryThreat = result.threatsDetected[0];
  if (primaryThreat) {
    return `Blocked due to: ${primaryThreat.description}`;
  }
  return 'High-risk phishing indicators detected';
}

// Log phishing analysis result
function logPhishingResult(url, result) {
  console.log(`🎣 Phishing analysis complete for ${url}:`, {
    riskLevel: result.riskLevel,
    score: result.score,
    confidence: result.confidence,
    threatCount: result.threatsDetected.length,
    detectionType: result.detectionType,
    timestamp: new Date().toISOString()
  });
}

// Handle tab updates (URL changes, loading states)
async function handleTabUpdate(tabId, changeInfo, tab) {
  if (!extensionEnabled || !tab.url || !isHttpUrl(tab.url)) {
    return;
  }

  try {
    // Only scan when page starts loading
    if (changeInfo.status === 'loading') {
      await scanUrl(tabId, tab.url);
    }
  } catch (error) {
    console.error('Error handling tab update:', error);
  }
}

// Handle navigation events
async function handleNavigation(details) {
  if (!extensionEnabled || !details.url || !isHttpUrl(details.url) || details.frameId !== 0) {
    return;
  }

  try {
    await scanUrl(details.tabId, details.url);
  } catch (error) {
    console.error('Error handling navigation:', error);
  }
}

// Main URL scanning function
async function scanUrl(tabId, url) {
  try {
    // Check cache first
    const cachedResult = getCachedResult(url);
    if (cachedResult) {
      handleScanResult(tabId, url, cachedResult);
      return;
    }

    // Prepare scan request
    const cleanedUrl = cleanUrl(url);
    const requestBody = { url: cleanedUrl };

    console.log(`🔍 Scanning URL: ${cleanedUrl}`);

    // Send scan request to backend
    const response = await fetch(`${API_BASE_URL}${SCAN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Extension-Version': chrome.runtime.getManifest().version
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Cache the result
    cacheResult(url, result);

    // Handle the scan result
    handleScanResult(tabId, url, result);

  } catch (error) {
    console.error('URL scan error:', error);
    handleScanError(tabId, url, error);
  }
}

// Handle scan results
async function handleScanResult(tabId, url, result) {
  try {
    // Always show visual indicator in extension icon
    updateIcon(tabId, result.riskLevel);

    if (result.riskLevel === 'HIGH') {
      // High risk - show blocking page or notification
      if (blockingEnabled && !isWhitelisted(url)) {
        await blockSite(tabId, result);
        return;
      }
    }

    if (result.riskLevel === 'MEDIUM' || result.riskLevel === 'HIGH') {
      // Medium/High risk - show warning notification
      await showWarningNotification(tabId, result);
    }

    // Log scan result for analytics
    logScanResult(url, result);

  } catch (error) {
    console.error('Error handling scan result:', error);
  }
}

// Handle scan errors
function handleScanError(tabId, url, error) {
  console.warn('Scan failed, showing safe fallback:', error);
  updateIcon(tabId, 'UNKNOWN');
}

// Block a dangerous site
async function blockSite(tabId, result) {
  try {
    const blockUrl = chrome.runtime.getURL('blocked.html') + `?url=${encodeURIComponent(result.url)}&reason=${encodeURIComponent(result.reason)}`;

    // Inject blocking overlay or redirect
    await chrome.tabs.update(tabId, { url: blockUrl });

    // Add to blocked sites
    blockedSites.add(cleanUrl(result.url));
    saveBlockedSites();

    console.log(`🚫 Blocked dangerous site: ${result.url}`);

  } catch (error) {
    console.error('Error blocking site:', error);
    // Fallback to notification
    await showWarningNotification(tabId, result);
  }
}

// Show warning notification
async function showWarningNotification(tabId, result) {
  try {
    // Create browser notification
    const notificationId = `sentinel-alert-${Date.now()}`;

    await chrome.notifications.create(notificationId, {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icon16.png'),
      title: `🔴 ${result.riskLevel} RISK DETECTED`,
      message: result.reason || 'Potential security threat identified',
      buttons: [
        { title: 'View Details' },
        { title: 'Continue Anyway' }
      ],
      requireInteraction: true
    });

    // Handle notification click
    chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
      if (notifId === notificationId) {
        if (btnIdx === 0) {
          // Open extension popup
          chrome.action.openPopup()
        }
        chrome.notifications.clear(notifId);
      }
    });

  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

// Update extension icon based on risk level (using existing icons only)
async function updateIcon(tabId, riskLevel) {
  try {
    // For now, all risk levels use the same icon since we only have one variant
    // In the future, create different colored variants based on risk level
    const iconPaths = {
      16: chrome.runtime.getURL('icon16.png'),
      32: chrome.runtime.getURL('icon32.png'),
      48: chrome.runtime.getURL('icon48.png')
    };

    await chrome.action.setIcon({
      tabId: tabId,
      path: iconPaths
    });

    // Set badge to indicate risk level (alternative to changing icon)
    let badgeColor = '#6B7280'; // gray
    let badgeText = '';

    switch (riskLevel.toLowerCase()) {
      case 'high':
        badgeColor = '#EF4444'; // red
        badgeText = 'H';
        break;
      case 'medium':
        badgeColor = '#F97316'; // orange
        badgeText = 'M';
        break;
      case 'low':
        badgeColor = '#EAB308'; // yellow
        badgeText = 'L';
        break;
    }

    await chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: badgeColor });
    await chrome.action.setBadgeText({ tabId: tabId, text: badgeText });

  } catch (error) {
    console.error('Error updating icon:', error);
  }
}

// Cache management
function getCachedResult(url) {
  const cached = scanCache.get(cleanUrl(url));
  if (cached && Date.now() - cached.timestamp < SCAN_CACHE_DURATION) {
    return cached.result;
  }
  return null;
}

function cacheResult(url, result) {
  const cleanedUrl = cleanUrl(url);

  // Cleanup cache if too large
  if (scanCache.size >= MAX_CACHE_SIZE) {
    cleanupCache();
  }

  scanCache.set(cleanedUrl, {
    result,
    timestamp: Date.now()
  });
}

function cleanupCache() {
  const now = Date.now();
  for (const [url, data] of scanCache.entries()) {
    if (now - data.timestamp > SCAN_CACHE_DURATION) {
      scanCache.delete(url);
    }
  }
}

// Utility functions
function isHttpUrl(url) {
  return url && (url.startsWith('http://') || url.startsWith('https://'));
}

function cleanUrl(url) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;
  } catch (error) {
    return url;
  }
}

function isWhitelisted(url) {
  // Check if URL is in whitelist (could be user-configured trusted sites)
  // For now, return false - implement whitelist later
  return false;
}

function logScanResult(url, result) {
  // Log for analytics/troublehooting (could send to backend later)
  console.log(`✅ Scan result for ${url}:`, {
    riskLevel: result.riskLevel,
    confidence: result.confidence,
    timestamp: new Date().toISOString()
  });
}

async function saveBlockedSites() {
  try {
    await chrome.storage.local.set({ blockedSites: Array.from(blockedSites) });
  } catch (error) {
    console.error('Error saving blocked sites:', error);
  }
}

// Handle keyboard shortcuts
function handleCommand(command) {
  switch (command) {
    case 'toggle_blocking':
      blockingEnabled = !blockingEnabled;
      chrome.storage.local.set({ blockingEnabled });
      showToggleNotification();
      break;
  }
}

function showToggleNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icon16.png'),
    title: 'Site Blocking ' + (blockingEnabled ? 'Enabled' : 'Disabled'),
    message: 'Automatic blocking is now ' + (blockingEnabled ? 'active' : 'inactive')
  });
}

// Handle extension settings updates
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.extensionEnabled) {
      extensionEnabled = changes.extensionEnabled.newValue;
    }
    if (changes.blockingEnabled) {
      blockingEnabled = changes.blockingEnabled.newValue;
    }
    if (changes.blockedSites) {
      blockedSites = new Set(changes.blockedSites.newValue || []);
    }
  }
});
