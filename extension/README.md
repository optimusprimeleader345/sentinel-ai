# 🔒 SentinelAI Browser Guard

**Real-time URL threat scanning powered by SentinelAI** - Automatically detects phishing, malicious domains, and suspicious activity in your browser.

## 🚀 Quick Installation

### Prerequisites
- Chrome Browser (recommended)
- SentinelAI backend server running on `http://localhost:5000`
- Alternative: Update `API_BASE_URL` in `background.js` to your production server

### Installation Steps

1. **Open Chrome Extensions**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Select the `/extension/` folder from your project

4. **Verify Installation**
   - Look for "SentinelAI Browser Guard" in your extensions list
   - The shield icon should appear in your Chrome toolbar

## 🛡️ Features

### 🔍 Automatic URL Scanning
- **Real-time Protection**: Every website you visit is automatically scanned
- **Comprehensive Analysis**: Checks for phishing, malicious URLs, suspicious TLDs
- **Safe Browsing Integration**: Compatible with Google Safe Browsing API
- **Threat Intelligence**: Real-time backend analysis using your URL scanner

### 🔔 Smart Alerts
- **Risk Level Notifications**: HIGH/MEDIUM/LOW threat classifications
- **Non-intrusive Warnings**: Browser notifications without blocking browsing
- **Visual Indicators**: Color-coded extension icon showing current risk level

### 🚫 Optional Site Blocking
- **High-Risk Blocking**: Optionally blocks HIGH-risk sites entirely
- **User Control**: Choose to continue browsing or accept the block
- **Graceful Fallback**: Notifications if blocking fails
- **Whitelist Support**: Future feature for trusted sites

### 📊 Security Dashboard
- **Extension Popup**: Click the shield icon for detailed security information
- **Risk Assessment**: Visual threat meters and confidence scores
- **Scan History**: Recent URL scan results with timestamps
- **Settings Panel**: Toggle blocking and notification preferences

## ⚙️ Configuration

### Backend API Endpoint
Update `API_BASE_URL` in `background.js`:
```javascript
const API_BASE_URL = 'https://your-sent intel-ai-api.com'; // Production URL
```

### Settings
Accessible via extension popup:
- **Auto Block Sites**: Block HIGH-risk websites automatically
- **Notifications**: Show browser alerts for threats
- **URL Whitelist**: Future feature for trusted domains

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Latest Chrome extension standard
- **Service Worker**: Background processing with low resource usage
- **Content Scripts**: Page-level injections for advanced features
- **Storage API**: Persistent settings and scan history

### Permissions Required
- `"tabs"` - Monitor tab navigation and content
- `"storage"` - Save settings and scan history
- `"scripting"` - Inject security overlays
- `"activeTab"` - Interact with current tab
- `"*://*/"` - HTTP requests to backend API

### Files Structure
```
/extension/
├── manifest.json     # Extension configuration & permissions
├── background.js     # Core logic & URL scanning
├── popup.html       # Extension popup interface
├── popup.js         # Popup functionality
├── popup.css        # Security-themed styling
├── content.js       # Page content injections
└── icon.png         # Extension icons (REPLACE WITH REAL PNG)
```

## 🔧 Extension Files

### manifest.json
Chrome extension configuration with Manifest V3 standard.

### background.js
- **Navigation Detection**: Monitors all website visits
- **URL Scanning**: Sends requests to SentinelAI backend
- **Site Blocking**: Optional blocking for high-risk sites
- **Notifications**: Browser-level security alerts
- **Caching**: 5-minute scan result cache for performance

### popup.html & popup.js
- **Real-time Status**: Current site risk assessment
- **Threat Details**: Breakdown of detected issues
- **Scan History**: Recent security scan results
- **Settings Controls**: User preferences and toggles

### content.js
- **Page Overlays**: Optional blocking overlays
- **DOM Analysis**: Future page content scanning
- **Visual Indicators**: Security status badges

## 🎨 Customization

### Replace Extension Icons
The extension requires PNG icons in these sizes:
- `icon.png` - 16x16, 32x32, 48x48, 128x128px

Replace the placeholder with:
1. Shield icon in security theme colors (red/purple/cyan)
2. Transparent background
3. PNG format for all required sizes

### Backend URL Configuration
Before installation, update the backend URL in `background.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000'; // Local development
const API_BASE_URL = 'https://api.sentintelai.com'; // Production
```

### UI Themes
Customize colors in `popup.css`:
```css
--primary-red: #dc2626;
--primary-purple: #9333ea;
--primary-cyan: #06b6d4;
```

## 🚨 Usage Instructions

### Daily Usage
1. **Browse Normally**: Extension works invisibly in the background
2. **Check Status**: Click extension icon for current site analysis
3. **Review Alerts**: Browser notifications appear for suspicious sites
4. **Configure**: Access settings via popup for blocking preferences

### When Warnings Appear
1. **HIGH RISK**: Site may be dangerous - consider alternative
2. **MEDIUM RISK**: Exercise caution - extra verification recommended
3. **LOW RISK**: Normal browsing - minor issues detected
4. **UNKNOWN**: Scan failed - backend may be unavailable

### Blocking Behavior
When Auto Block is enabled:
- **HIGH RISK sites**: Automatically blocked with option to continue
- **Go Back**: Returns to previous page
- **Continue Anyway**: Allows access to potentially dangerous site

## 📝 Troubleshooting

### Extension Not Loading
- Verify `/extension/` folder is selected in "Load unpacked"
- Check Chrome console for errors: `chrome://extensions/`
- Ensure backend server is running if using local API

### Scans Not Working
- Check backend connectivity: `http://localhost:5000/api/url/scan`
- Verify network permissions in extension settings
- Check browser console for extension errors

### Blocking Not Working
- Confirm blocking is enabled in extension popup
- Check for conflicting extensions
- Verify popup has permission to modify tabs

### Performance Issues
- Extension uses minimal resources with 100-item cache limit
- Cache automatically cleans every 5 minutes
- Disable if experiencing performance problems

## 🔒 Security Considerations

### Privacy Protection
- URLs are sent to your backend only for scanning
- No browsing history or personal data collected
- Extension uses your existing security infrastructure

### Permission Justification
- **Tabs Permission**: Required to monitor URL navigation
- **Storage**: Saves user preferences and scan cache
- **Scripting**: For security overlays and content analysis
- **Host Permissions**: API communication with backend

### Trusted Domains
Future updates will include:
- Whitelist for trusted domains
- Organization-wide policy enforcement
- Custom risk thresholds per site categories

## 🆘 Support

For issues or questions:
1. Check Chrome extension console logs
2. Verify backend API connectivity
3. Review extension permissions
4. Test with different websites

## 📈 Future Enhancements

### Planned Features
- **Content Analysis**: Scan page content for additional threats
- **ML Predictions**: Machine learning threat classification
- **Enterprise Integration**: Corporate policy enforcement
- **Advanced Blocking**: Category-based blocking rules
- **Reporting**: Detailed analytics and threat intelligence
- **Multi-Browser**: Firefox, Edge, Safari compatibility

### Security Expansions
- **File Scanning**: Upload form protection
- **Network Monitoring**: DNS and IP reputation tracking
- **Zero Trust Integration**: Advanced authentication checks
- **Dark Web Monitoring**: Mention correlation with backend features

---

**Built with ❤️ by SentinelAI - Advanced Cyber Threat Intelligence Platform**

*Protecting users through real-time threat detection and AI-powered security analysis.*
