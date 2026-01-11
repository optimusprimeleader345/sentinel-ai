/**
 * SentinelAI Browser Guard - Advanced Phishing Detection Content Script
 * Performs real-time phishing analysis on every loaded webpage
 */

(() => {
  'use strict';

  const SCRIPT_VERSION = '2.0.0';
  const DEBUG_MODE = false;

  // Phishing detection state
  let pageAnalysis = null;
  let analysisInProgress = false;

  /**
   * Initialize phishing detection content script
   */
  function initialize() {
    if (DEBUG_MODE) {
      console.log('🔍 SentinelAI Advanced Phishing Detection v' + SCRIPT_VERSION + ' loaded');
    }

    // Analyze page once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', performPhishingAnalysis);
    } else {
      performPhishingAnalysis();
    }

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(handleMessage);

    // Expose global API for debugging
    window.sentinelAIPhishing = {
      version: SCRIPT_VERSION,
      analyze: performPhishingAnalysis,
      getResults: () => pageAnalysis
    };
  }

  /**
   * Perform comprehensive phishing analysis on current page
   */
  function performPhishingAnalysis() {
    if (analysisInProgress) return;

    analysisInProgress = true;

    try {
      if (DEBUG_MODE) {
        console.log('🔬 Starting phishing analysis for:', window.location.href);
      }

      // Extract all phishing-relevant data
      const analysisData = extractPageData();

      // Send to background script for backend processing
      notifyBackgroundOfAnalysis(analysisData);

      // Store locally for immediate blocking if needed
      pageAnalysis = analysisData;

      analysisInProgress = false;

    } catch (error) {
      console.error('Phishing analysis error:', error);
      analysisInProgress = false;
    }
  }

  /**
   * Extract comprehensive page data for phishing analysis
   */
  function extractPageData() {
    const data = {
      url: window.location.href,

      // DOM/HTML Content
      htmlContent: getPageHTML(),

      // Visible Text Analysis
      visibleText: getVisibleText(),

      // Form Analysis
      formFields: extractFormFields(),

      // SSL Certificate Info (if available)
      sslCertificate: getSSLCertificateInfo(),

      // Suspicious Elements Detection
      suspiciousElements: detectSuspiciousElements(),

      // Additional Context
      title: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,

      // Metadata
      analyzedAt: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Add domain analysis
    data.domain = extractDomainInfo(data.url);

    return data;
  }

  /**
   * Get page HTML content for analysis
   */
  function getPageHTML() {
    // Get a truncated version to avoid sending too much data
    const html = document.documentElement.outerHTML;

    // Limit to first 300KB to avoid API limits
    if (html.length > 300000) {
      return html.substring(0, 300000) + '...[truncated]';
    }

    return html;
  }

  /**
   * Extract all visible text from the page
   */
  function getVisibleText() {
    const elements = document.querySelectorAll('*');
    const textContent = [];

    elements.forEach(el => {
      // Skip invisible elements
      const style = window.getComputedStyle(el);
      if (style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          el.offsetWidth === 0 ||
          el.offsetHeight === 0) {
        return;
      }

      const text = el.textContent?.trim();
      if (text && text.length > 0) {
        textContent.push(text);
      }
    });

    return textContent.join(' ').substring(0, 50000); // Limit size
  }

  /**
   * Extract all form fields for phishing detection
   */
  function extractFormFields() {
    const forms = document.querySelectorAll('form');
    const formFields = [];

    forms.forEach((form, formIndex) => {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach((input, inputIndex) => {
        const fieldInfo = {
          name: input.name || input.id || `field_${formIndex}_${inputIndex}`,
          type: input.type || 'text',
          placeholder: input.placeholder || '',
          value: (input.type === 'password' ? '[REDACTED]' : input.value || ''),
          id: input.id || '',
          class: input.className || '',
          required: input.required || false,
          pattern: input.pattern || '',
          autocomplete: input.autocomplete || '',
          formMethod: form.method || '',
          formAction: getCleanUrl(form.action) || ''
        };

        formFields.push(fieldInfo);
      });
    });

    return formFields;
  }

  /**
   * Extract domain information for analysis
   */
  function extractDomainInfo(url) {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      const parts = domain.split('.');

      return {
        fullDomain: domain,
        primaryDomain: parts.length >= 2 ? parts[parts.length - 2] + '.' + parts[parts.length - 1] : domain,
        subdomain: parts.length > 2 ? parts.slice(0, -2).join('.') : '',
        tld: parts.length >= 1 ? parts[parts.length - 1] : '',
        isIP: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain),
        containsNumbers: /\d/.test(domain),
        hasSuspiciousTLD: ['tk', 'ml', 'ga', 'cf', 'gq', 'eu', 'top', 'pro', 'club', 'work', 'online', 'xyz', 'space', 'website', 'site', 'biz'].includes(parts[parts.length - 1])
      };
    } catch (error) {
      return {
        fullDomain: url,
        primaryDomain: '',
        error: error.message
      };
    }
  }

  /**
   * Get SSL certificate information (if available)
   */
  function getSSLCertificateInfo() {
    // This is a simplified version - real SSL info would require native messaging
    const isHTTPS = window.location.protocol === 'https:';

    return {
      isHTTPS,
      valid: isHTTPS, // Assume valid if HTTPS (simplified)
      issuer: isHTTPS ? 'Unknown (HTTPS enabled)' : 'No SSL',
      protocol: window.location.protocol,
      // Note: Real SSL fingerprinting would require native app
      fingerprint: isHTTPS ? 'available' : 'none'
    };
  }

  /**
   * Detect suspicious elements that indicate phishing
   */
  function detectSuspiciousElements() {
    const suspicious = [];

    // Check for hidden password fields
    const hiddenPasswords = document.querySelectorAll('input[type="password"]:not([style*="display: none"]):not([style*="visibility: hidden"])');
    document.querySelectorAll('*').forEach(el => {
      if (el.type === 'password') {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') {
          suspicious.push('hidden-password');
        }
      }
    });

    // Check for fake brand logos or missing logos
    const images = document.querySelectorAll('img');
    const brandImages = Array.from(images).filter(img =>
      img.src.toLowerCase().includes('logo') ||
      img.alt.toLowerCase().includes('logo') ||
      img.className.toLowerCase().includes('logo')
    );

    if (brandImages.length === 0 && (
      document.title.toLowerCase().includes('bank') ||
      document.title.toLowerCase().includes('paypal') ||
      document.title.toLowerCase().includes('login')
    )) {
      suspicious.push('fake-branding');
    }

    // Check for redirection scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const content = script.innerHTML;
      if (content.includes('location.href') ||
          content.includes('location.replace') ||
          content.includes('window.open')) {
        suspicious.push('redirection-script');
      }
    });

    // Check for iframe injections
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.src && (
        iframe.src.includes('#') ||
        iframe.style.display === 'none'
      )) {
        suspicious.push('iframe-injection');
      }
    });

    // Check for webcam access requests
    const videoElements = document.querySelectorAll('video, input[type="file"]');
    videoElements.forEach(el => {
      if (el.capture === 'user' ||
          el.accept?.includes('video') ||
          el.getAttribute('capture') === 'user') {
        suspicious.push('webcam-access-request');
      }
    });

    return [...new Set(suspicious)]; // Remove duplicates
  }

  /**
   * Send analysis data to background script
   */
  function notifyBackgroundOfAnalysis(analysisData) {
    chrome.runtime.sendMessage({
      action: 'phishingPageAnalysis',
      data: analysisData,
      timestamp: Date.now()
    });
  }

  /**
   * Handle messages from background script
   */
  function handleMessage(message, sender, sendResponse) {
    switch (message.action) {

      case 'getPageData':
        sendResponse({ success: true, data: pageAnalysis });
        return true;

      case 'blockSite':
        blockSite(message.reason);
        sendResponse({ success: true });
        return true;

      case 'showWarning':
        showPhishingWarning(message.warning);
        sendResponse({ success: true });
        return true;

      case 'reanalyze':
        performPhishingAnalysis();
        sendResponse({ success: true });
        return true;

      default:
        sendResponse({ success: false, error: 'Unknown action' });
    }

    return true;
  }

  /**
   * Block current site with phishing-specific overlay
   */
  function blockSite(reason = 'Phishing site detected') {
    document.body.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100vh;z-index:2147483647;background:linear-gradient(135deg,#1a1a2e,#16213e);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="text-align:center;background:rgba(15,23,42,.95);border:1px solid rgba(239,68,68,.3);border-radius:16px;padding:32px;max-width:450px;box-shadow:0 20px 40px rgba(0,0,0,.5);">
          <div style="font-size:48px;margin-bottom:16px;animation:pulse 2s infinite;">🚫</div>
          <h2 style="color:#dc2626;font-size:20px;font-weight:700;margin-bottom:12px;letter-spacing:.5px;text-transform:uppercase;">PHISHING SITE BLOCKED</h2>
          <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin-bottom:4px;">This page has been identified as a phishing attempt.</p>
          <p style="color:#9ca3af;font-size:13px;margin-bottom:24px;">Potential identity theft and financial fraud risk detected.</p>
          <div style="display:flex;gap:12px;margin-top:20px;flex-direction:column;">
            <button onclick="window.history.back()" style="padding:12px 24px;background:rgba(6,182,212,.2);color:#06b6d4;border:1px solid rgba(6,182,212,.3);border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;" onmouseover="this.style.background='rgba(6,182,212,.3)'" onmouseout="this.style.background='rgba(6,182,212,.2)'">← Go Back (Safe)</button>
            <button onclick="this.parentElement.parentElement.parentElement.remove();document.body.style.display='block';" style="padding:12px 24px;background:#dc2626;color:white;border:1px solid #dc2626;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;" onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">⚠️ Continue Anyway (Risky)</button>
          </div>
          <div style="margin-top:20px;font-size:11px;color:#6b7280;">Protected by SentinelAI • Real-time phishing detection</div>
        </div>
      </div>
      <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}</style>
    `;

    document.documentElement.appendChild(overlay);
  }

  /**
   * Show phishing warning (non-blocking)
   */
  function showPhishingWarning(warning) {
    const alertDiv = document.createElement('div');
    alertDiv.innerHTML = `
      <div style="position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#fcd34d,#f59e0b);color:#1f2937;padding:16px 20px;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,.3);border:1px solid rgba(245,158,11,.3);z-index:2147483646;max-width:350px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;cursor:pointer;animation:slideIn .3s ease-out;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="font-size:24px;line-height:1;">⚠️</div>
          <div style="flex-grow:1;">
            <div style="font-weight:600;font-size:14px;margin-bottom:4px;">Phishing Warning</div>
            <div style="font-size:13px;line-height:1.4;opacity:.9;">${warning.message || 'Suspicious activity detected on this page.'}</div>
            <div style="font-size:12px;margin-top:6px;opacity:.7;">Risk Level: ${warning.risk || 'Unknown'}</div>
          </div>
          <button style="background:none;border:none;color:#1f2937;cursor:pointer;font-size:18px;line-height:1;opacity:.7;padding:0;" onclick="event.stopPropagation();this.parentElement.parentElement.remove()">×</button>
        </div>
      </div>
      <style>@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}</style>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove after 15 seconds for phishing warnings
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 15000);
  }

  /**
   * Clean URL for analysis (remove fragments, normalize)
   */
  function getCleanUrl(urlString) {
    if (!urlString) return '';

    try {
      const url = new URL(urlString);
      return url.origin + url.pathname + url.search;
    } catch (error) {
      return urlString;
    }
  }

  // Initialize when script loads
  initialize();

})();
