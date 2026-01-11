w// SentinelAI Browser Guard - Popup Script
// Handles UI interactions and communication with background script

// DOM elements
const elements = {
  currentUrl: document.getElementById('current-url'),
  urlText: document.querySelector('.url-text'),
  riskBadge: document.getElementById('risk-badge'),
  urlRiskIndicator: document.getElementById('url-risk-indicator'),
  scanButton: document.getElementById('scan-button'),
  detailsButton: document.getElementById('details-button'),
  riskAssessment: document.getElementById('risk-assessment'),
  confidenceScore: document.getElementById('confidence-score'),
  riskMeterFill: document.getElementById('risk-meter-fill'),
  threatDetails: document.getElementById('threat-details'),
  threatList: document.getElementById('threat-list'),
  scanCounter: document.getElementById('scan-counter'),
  historyList: document.getElementById('history-list'),
  scanTime: document.getElementById('scan-time'),
  blockingToggle: document.getElementById('blocking-toggle'),
  notificationsToggle: document.getElementById('notifications-toggle'),
  globalStatus: document.getElementById('global-status'),
  statusDot: document.getElementById('status-dot'),
  statusText: document.querySelector('#global-status span:last-child')
};

// State management
let currentTab = null;
let currentScanResult = null;
let scanHistory = [];
let settings = {
  blockingEnabled: true,
  notificationsEnabled: true
};

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', initializePopup);

// Initialize popup functionality
async function initializePopup() {
  console.log('🛡️ Popup initialized');

  try {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      currentTab = tab;
      updateCurrentUrl(tab.url);
      initializeScanResult(tab);
    }

    // Load settings and history
    await loadSettings();
    await loadScanHistory();

    // Set up event listeners
    setupEventListeners();

    // Update statistics
    updateStatistics();

  } catch (error) {
    console.error('Error initializing popup:', error);
    showError('Failed to initialize extension');
  }
}

// Set up event listeners
function setupEventListeners() {
  // Scan button
  elements.scanButton.addEventListener('click', handleScanClick);

  // Phishing scan button
  const phishingScanButton = document.getElementById('phishing-scan-button');
  if (phishingScanButton) {
    phishingScanButton.addEventListener('click', handlePhishingScanClick);
  }

  // Details button
  elements.detailsButton.addEventListener('click', handleDetailsClick);

  // Settings toggles
  elements.blockingToggle.addEventListener('change', handleBlockingToggle);
  elements.notificationsToggle.addEventListener('change', handleNotificationsToggle);

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(handleBackgroundMessage);
}

// Update current URL display
function updateCurrentUrl(url) {
  if (!url) return;

  try {
    const urlObj = new URL(url);
    const displayUrl = `${urlObj.hostname}${urlObj.pathname}`;
    elements.urlText.textContent = displayUrl;

    // Update URL text (truncate if too long)
    if (displayUrl.length > 35) {
      elements.urlText.textContent = displayUrl.substring(0, 32) + '...';
      elements.urlText.title = displayUrl;
    }

  } catch (error) {
    elements.urlText.textContent = 'Invalid URL';
  }
}

// Initialize scan result for current tab
async function initializeScanResult(tab) {
  try {
    // Request current scan result from background script
    const response = await chrome.runtime.sendMessage({
      action: 'getTabScanResult',
      tabId: tab.id
    });

    if (response && response.scanResult) {
      displayScanResult(response.scanResult, response.scannedAt);
    } else {
      showScanningState();
    }

  } catch (error) {
    console.warn('Could not get current scan result:', error);
    showScanningState();
  }
}

// Handle scan button click
async function handleScanClick() {
  if (!currentTab || !currentTab.url) return;

  showScanningState();

  try {
    // Send scan request to background script
    const response = await chrome.runtime.sendMessage({
      action: 'scanUrl',
      url: currentTab.url,
      tabId: currentTab.id
    });

    if (response && response.success) {
      // Wait a moment for the scan to complete
      setTimeout(() => {
        initializeScanResult(currentTab);
      }, 2000);
    } else {
      showError('Failed to initiate scan');
    }

  } catch (error) {
    console.error('Error scanning URL:', error);
    showError('Network error during scan');
  }
}

// Handle phishing scan button click
async function handlePhishingScanClick() {
  if (!currentTab || !currentTab.url) return;

  showPhishingScanningState();

  try {
    // Send phishing scan request to background script
    // The background script will relay this to the content script for DOM analysis
    const response = await chrome.runtime.sendMessage({
      action: 'phishingScan',
      url: currentTab.url,
      tabId: currentTab.id
    });

    if (response && response.success) {
      // Wait for phishing analysis to complete
      setTimeout(() => {
        initializePhishingScanResult(currentTab);
      }, 3000); // Give more time for comprehensive analysis
    } else {
      showPhishingError('Failed to initiate phishing scan');
    }

  } catch (error) {
    console.error('Error performing phishing scan:', error);
    showPhishingError('Network error during phishing analysis');
  }
}

// Show phishing scanning state
function showPhishingScanningState() {
  elements.urlRiskIndicator.style.display = 'block';
  elements.riskBadge.textContent = 'PHISHING SCAN';
  elements.riskBadge.className = 'risk-badge scanning';
  const phishingBtn = document.getElementById('phishing-scan-button');
  if (phishingBtn) {
    phishingBtn.innerHTML = '<span class="btn-icon">🎣</span><span>ANALYZING...</span>';
  }
  elements.detailsButton.style.display = 'none';
  elements.riskAssessment.style.display = 'none';
  elements.threatDetails.style.display = 'none';
  elements.scanTime.textContent = 'Now';
}

// Initialize phishing scan result
async function initializePhishingScanResult(tab) {
  try {
    // Request current phishing analysis result from background script
    const response = await chrome.runtime.sendMessage({
      action: 'getTabPhishingResult',
      tabId: tab.id
    });

    if (response && response.result) {
      displayPhishingResult(response.result, response.analyzedAt);
    } else {
      showPhishingError('No phishing analysis available');
    }
  } catch (error) {
    console.warn('Could not get phishing analysis result:', error);
    showPhishingError('Failed to retrieve phishing results');
  }
}

// Display phishing analysis result
function displayPhishingResult(result, analyzedAt) {
  // Reset phishing button
  const phishingBtn = document.getElementById('phishing-scan-button');
  if (phishingBtn) {
    phishingBtn.innerHTML = '<span class="btn-icon">🎣</span><span>PHISHING RE-SCAN</span>';
  }

  // Show results
  elements.urlRiskIndicator.style.display = 'block';
  elements.detailsButton.style.display = 'block';
  elements.riskAssessment.style.display = 'block';

  // Update risk badge for phishing
  updatePhishingRiskBadge(result);

  // Update confidence score
  updateConfidenceScore(result.confidence || 50);

  // Update risk meter
  updateRiskMeter(result.riskLevel);

  // Show phishing-specific threat details
  if (result.threatsDetected && result.threatsDetected.length > 0) {
    showPhishingThreatDetails(result.threatsDetected);
  }

  // Update scan time
  updateScanTime(analyzedAt);

  // Add to history (phishing type)
  addPhishingToScanHistory(currentTab.url, result, analyzedAt);

  console.log('🎣 Phishing analysis displayed:', result);
}

// Update risk badge for phishing results
function updatePhishingRiskBadge(result) {
  const badge = elements.riskBadge;
  badge.className = 'risk-badge';

  const riskLevel = result.riskLevel?.toUpperCase();
  const detectionType = result.detectionType || '';

  if (result.threatsDetected && result.threatsDetected.length > 0) {
    // Color based on risk level
    switch (riskLevel) {
      case 'HIGH':
        badge.classList.add('high-risk');
        badge.textContent = 'PHISHING HIGH';
        break;
      case 'MEDIUM':
        badge.classList.add('medium-risk');
        badge.textContent = 'PHISHING MEDIUM';
        break;
      case 'LOW':
        badge.classList.add('low-risk');
        badge.textContent = 'PHISHING LOW';
        break;
      default:
        badge.classList.add('unknown-risk');
        badge.textContent = 'ANALYZED';
    }
  } else {
    // Safe result
    badge.classList.add('low-risk');
    badge.textContent = 'SAFE SITE';
  }
}

// Show phishing-specific threat details
function showPhishingThreatDetails(threatsDetected) {
  elements.threatDetails.style.display = 'block';
  elements.threatList.innerHTML = '';

  // Group threats by type and show top threats
  const threatsByType = {};
  threatsDetected.forEach(threat => {
    if (!threatsByType[threat.type]) {
      threatsByType[threat.type] = [];
    }
    threatsByType[threat.type].push(threat);
  });

  Object.keys(threatsByType).slice(0, 3).forEach(threatType => { // Show top 3 threat types
    const threats = threatsByType[threatType];
    const primaryThreat = threats[0]; // Most severe threat of this type

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="threat-icon">${getPhishingThreatIcon(primaryThreat.type)}</div>
      <div class="threat-text">${primaryThreat.description || `${primaryThreat.type} detected`}</div>
      <div class="threat-severity">
        <span class="severity-dot" style="background: ${getSeverityColor(primaryThreat.severity)}"></span>
      </div>
    `;
    elements.threatList.appendChild(li);
  });
}

// Get appropriate icon for phishing threat types
function getPhishingThreatIcon(threatType) {
  const icons = {
    'keyword': '💬',
    'suspicious_form': '📝',
    'hidden_field': '🙈',
    'safeBrowsing': '🚫',
    'domain_analysis': '🌐',
    'html_signature': '⚠️',
    'ssl_certificate': '🔒',
    'webcam_request': '📹',
    'fake_branding': '🎭',
    'redirection': '🔄',
    'phishing_analysis': '🎣'
  };

  return icons[threatType] || '⚠️';
}

// Get color for threat severity
function getSeverityColor(severity) {
  switch (severity?.toLowerCase()) {
    case 'high': return '#dc2626';
    case 'medium': return '#ea580c';
    case 'low': return '#16a34a';
    default: return '#6b7280';
  }
}

// Show phishing error
function showPhishingError(message) {
  elements.riskBadge.textContent = 'PHISHING ERROR';
  elements.riskBadge.className = 'risk-badge error';
  const phishingBtn = document.getElementById('phishing-scan-button');
  if (phishingBtn) {
    phishingBtn.innerHTML = '<span class="btn-icon">❌</span><span>RETRY PHISHING</span>';
  }
  console.error('Phishing error:', message);
}

// Add phishing result to scan history
function addPhishingToScanHistory(url, result, timestamp) {
  const phishingResult = {
    ...result,
    scanType: 'phishing_analysis',
    url: url,
    timestamp: timestamp || Date.now(),
    displayType: '🎣 PHISHING'
  };

  addToScanHistory(url, phishingResult, timestamp);
}

// Handle details button click
function handleDetailsClick() {
  openDashboard(); // Currently opens dashboard (could show detailed popup)
}

// Handle settings toggles
async function handleBlockingToggle(event) {
  settings.blockingEnabled = event.target.checked;
  await saveSettings();
  showStatusMessage(`Auto-blocking ${settings.blockingEnabled ? 'enabled' : 'disabled'}`);

  // Notify background script
  await chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings: settings
  });
}

async function handleNotificationsToggle(event) {
  settings.notificationsEnabled = event.target.checked;
  await saveSettings();
  showStatusMessage(`Notifications ${settings.notificationsEnabled ? 'enabled' : 'disabled'}`);

  // Notify background script
  await chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings: settings
  });
}

// Display scan result
function displayScanResult(result, scannedAt) {
  currentScanResult = result;

  // Hide scanning state
  elements.urlRiskIndicator.style.display = 'none';
  elements.scanButton.innerHTML = '<span class="btn-icon">🔄</span><span>RE-SCAN</span>';

  // Show results
  elements.urlRiskIndicator.style.display = 'block';
  elements.detailsButton.style.display = 'block';
  elements.riskAssessment.style.display = 'block';

  // Update risk badge
  updateRiskBadge(result.riskLevel);

  // Update confidence score
  updateConfidenceScore(result.confidence);

  // Update risk meter
  updateRiskMeter(result.riskLevel);

  // Show threats if any
  if (result.categories && result.categories.length > 0) {
    showThreatDetails(result.categories);
  }

  // Update scan time
  updateScanTime(scannedAt);

  // Add to history
  addToScanHistory(currentTab.url, result, scannedAt);
}

// Update risk badge
function updateRiskBadge(riskLevel) {
  const badge = elements.riskBadge;
  badge.className = 'risk-badge';

  switch (riskLevel.toUpperCase()) {
    case 'HIGH':
      badge.classList.add('high-risk');
      badge.textContent = 'HIGH RISK';
      break;
    case 'MEDIUM':
      badge.classList.add('medium-risk');
      badge.textContent = 'MEDIUM RISK';
      break;
    case 'LOW':
      badge.classList.add('low-risk');
      badge.textContent = 'LOW RISK';
      break;
    default:
      badge.classList.add('unknown-risk');
      badge.textContent = 'UNKNOWN';
  }
}

// Update confidence score
function updateConfidenceScore(confidence) {
  const score = confidence || 0;
  elements.confidenceScore.textContent = `${score}%`;
  elements.confidenceScore.className = `confidence-score ${getConfidenceClass(score)}`;
}

// Get confidence class
function getConfidenceClass(confidence) {
  if (confidence >= 80) return 'high-confidence';
  if (confidence >= 60) return 'medium-confidence';
  return 'low-confidence';
}

// Update risk meter
function updateRiskMeter(riskLevel) {
  const fill = elements.riskMeterFill;
  let percentage = 0;

  switch (riskLevel.toUpperCase()) {
    case 'HIGH':
      percentage = 85;
      break;
    case 'MEDIUM':
      percentage = 50;
      break;
    case 'LOW':
      percentage = 15;
      break;
  }

  fill.style.width = `${percentage}%`;
  fill.className = `meter-fill ${riskLevel.toLowerCase()}-risk`;
}

// Show threat details
function showThreatDetails(categories) {
  elements.threatDetails.style.display = 'block';
  elements.threatList.innerHTML = '';

  categories.forEach(category => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="threat-icon">⚠️</div>
      <div class="threat-text">${category}</div>
      <div class="threat-severity">
        <span class="severity-dot high"></span>
      </div>
    `;
    elements.threatList.appendChild(li);
  });
}

// Update scan time
function updateScanTime(timestamp) {
  if (timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    let timeString = '--:--';
    if (diff < 60000) { // Less than 1 minute
      timeString = 'Just now';
    } else if (diff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      timeString = `${minutes}m ago`;
    } else if (diff < 86400000) { // Less than 1 day
      const hours = Math.floor(diff / 3600000);
      timeString = `${hours}h ago`;
    } else {
      timeString = date.toLocaleDateString();
    }

    elements.scanTime.textContent = timeString;
  }
}

// Show scanning state
function showScanningState() {
  elements.urlRiskIndicator.style.display = 'block';
  elements.riskBadge.textContent = 'SCANNING';
  elements.riskBadge.className = 'risk-badge scanning';
  elements.scanButton.innerHTML = '<span class="btn-icon">⏳</span><span>SCANNING...</span>';
  elements.detailsButton.style.display = 'none';
  elements.riskAssessment.style.display = 'none';
  elements.threatDetails.style.display = 'none';
  elements.scanTime.textContent = 'Now';
}

// Show error state
function showError(message) {
  elements.riskBadge.textContent = 'ERROR';
  elements.riskBadge.className = 'risk-badge error';
  elements.scanButton.innerHTML = '<span class="btn-icon">❌</span><span>RETRY</span>';
  console.error('Popup error:', message);
}

// Load settings from storage
async function loadSettings() {
  try {
    const result = await chrome.storage.local.get(['extensionEnabled', 'blockingEnabled', 'notificationsEnabled']);
    settings = {
      blockingEnabled: result.blockingEnabled ?? true,
      notificationsEnabled: result.notificationsEnabled ?? true
    };

    elements.blockingToggle.checked = settings.blockingEnabled;
    elements.notificationsToggle.checked = settings.notificationsEnabled;

  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Save settings to storage
async function saveSettings() {
  try {
    await chrome.storage.local.set(settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Load scan history
async function loadScanHistory() {
  try {
    const result = await chrome.storage.local.get(['scanHistory']);
    scanHistory = result.scanHistory || [];

    renderScanHistory();

  } catch (error) {
    console.error('Error loading scan history:', error);
  }
}

// Add to scan history
function addToScanHistory(url, result, timestamp) {
  scanHistory.unshift({
    url: url,
    result: result,
    timestamp: timestamp || Date.now()
  });

  // Keep only recent 10 scans
  if (scanHistory.length > 10) {
    scanHistory = scanHistory.slice(0, 10);
  }

  // Save to storage
  chrome.storage.local.set({ scanHistory: scanHistory });

  renderScanHistory();
}

// Render scan history
function renderScanHistory() {
  const historyList = elements.historyList;

  if (scanHistory.length === 0) {
    historyList.innerHTML = `
      <div class="empty-history">
        <div class="empty-icon">🔍</div>
        <div>No recent scans</div>
      </div>
    `;
    return;
  }

  historyList.innerHTML = '';

  scanHistory.forEach((scan, index) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    const riskIcon = getRiskIcon(scan.result.riskLevel);
    const timestamp = new Date(scan.result.lastChecked || scan.timestamp);
    const timeString = formatTimeAgo(timestamp);

    historyItem.innerHTML = `
      <div class="history-risk">${riskIcon}</div>
      <div class="history-info">
        <div class="history-url">${truncateUrl(scan.url, 25)}</div>
        <div class="history-time">${timeString}</div>
      </div>
    `;

    historyItem.addEventListener('click', () => showHistoryDetails(scan));
    historyList.appendChild(historyItem);
  });
}

// Show history details (could be expanded)
function showHistoryDetails(scan) {
  // For now, just highlight it
  console.log('History item clicked:', scan);
}

// Update statistics
function updateStatistics() {
  elements.scanCounter.textContent = scanHistory.length;
}

// Handle messages from background script
function handleBackgroundMessage(message) {
  console.log('Received message:', message);

  if (message.action === 'scanComplete') {
    if (message.tabId === currentTab?.id) {
      displayScanResult(message.result, message.timestamp);
    }
  } else if (message.action === 'scanStarted') {
    if (message.tabId === currentTab?.id) {
      showScanningState();
    }
  } else if (message.action === 'scanError') {
    if (message.tabId === currentTab?.id) {
      showError(message.error);
    }
  }
}

// Utility functions
function getRiskIcon(riskLevel) {
  switch (riskLevel?.toUpperCase()) {
    case 'HIGH': return '🔴';
    case 'MEDIUM': return '🟠';
    case 'LOW': return '🟢';
    default: return '⚪';
  }
}

function getRiskIconColored(riskLevel) {
  switch (riskLevel?.toUpperCase()) {
    case 'HIGH': return '🚫';
    case 'MEDIUM': return '⚠️';
    case 'LOW': return '✅';
    default: return '❓';
  }
}

function truncateUrl(url, maxLength) {
  if (url.length <= maxLength) return url;
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    return domain.length > maxLength ? domain.substring(0, maxLength - 3) + '...' : domain;
  } catch {
    return url.substring(0, maxLength - 3) + '...';
  }
}

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString();
}

function showStatusMessage(message) {
  // Could implement a toast notification
  console.log('Status:', message);
}

// Global functions for HTML onclick
function openDashboard() {
  chrome.tabs.create({ url: 'http://localhost:3000' }); // Update with your dashboard URL
}

function goBack() {
  window.close(); // Close popup, user can use browser back button
}

function continueAnyway() {
  // This would need to communicate with background script to allow continuation
  // For now, just close popup
  window.close();
}
