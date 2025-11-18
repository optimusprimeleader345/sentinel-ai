# SentinelAI API Documentation

> Complete API reference for SentinelAI Cybersecurity Platform

## Overview

SentinelAI provides a comprehensive REST API for cybersecurity threat detection, analysis, and response. The API is organized into logical modules covering AI analysis, threat intelligence, incident response, and more.

## Authentication

Most endpoints support optional authentication. When authentication is required, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Base URL

```
http://localhost:5000/api
```

## Health Check

### GET /health
System health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "SentinelAI Backend API is running",
  "timestamp": "2025-11-18T10:57:24.000Z"
}
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here"
}
```

### POST /auth/login
Authenticate user login.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "string",
    "email": "string"
  }
}
```

### GET /auth/profile
Get authenticated user profile.

**Response:**
```json
{
  "id": "user-id",
  "username": "string",
  "email": "string",
  "role": "user"
}
```

---

## AI Analysis Endpoints

### POST /ai/analyze
Analyze threats using AI/ML models.

**Request Body:**
```json
{
  "input": "threat description or data",
  "analysisType": "comprehensive"
}
```

**Response:**
```json
{
  "analysis": {
    "threatLevel": "High",
    "confidence": 0.95,
    "recommendations": ["Isolate system", "Run antivirus"],
    "indicators": ["IP: 192.168.1.1", "Hash: abc123"]
  }
}
```

### POST /ai/bot
Interact with AI chatbot for security queries.

**Request Body:**
```json
{
  "message": "How to detect ransomware?",
  "context": "security_analysis"
}
```

**Response:**
```json
{
  "response": "Ransomware detection involves...",
  "confidence": 0.89,
  "sources": ["KB-001", "NIST-800-53"]
}
```

### POST /ai/actions/simulate
Simulate AI-driven security actions.

**Request Body:**
```json
{
  "action": "isolate_endpoint",
  "target": "endpoint-id",
  "parameters": {"quarantine": true}
}
```

**Response:**
```json
{
  "simulation": {
    "actionId": "sim-001",
    "status": "simulated",
    "expectedOutcome": "Endpoint isolated",
    "riskAssessment": "Low"
  }
}
```

---

## Threat Intelligence Endpoints

### GET /threats
Get all threat entries.

**Response:**
```json
{
  "threats": [
    {
      "id": "threat-001",
      "type": "malware",
      "severity": "High",
      "description": "Ransomware detected",
      "timestamp": "2025-11-18T10:00:00Z",
      "indicators": ["hash:abc123"]
    }
  ],
  "total": 25
}
```

### GET /threats/global
Get global threat intelligence feed.

### POST /threats
Create a new threat entry.

**Request Body:**
```json
{
  "type": "malware",
  "severity": "High",
  "description": "New ransomware variant detected",
  "indicators": ["hash:def456"]
}
```

### GET /threats/overview
Get threat overview dashboard data.

### GET /threats/heatmap
Get threat geographical heatmap data.

### GET /threats/severity-stats
Get threat severity statistics.

### GET /threats/trends
Get threat trend analysis over time.

### GET /threats/lookup?ioc=value
Lookup threat indicators (IOC).

### GET /threats/feed
Get live threat intelligence feed.

### GET /threats/mitre
Get MITRE ATT&CK framework mappings.

### GET /threats/correlation
Get threat correlation engine results.

---

## Security Scoring Endpoints

### GET /security-score
Get overall security score.

**Response:**
```json
{
  "overallScore": 85,
  "categories": {
    "network": 90,
    "endpoint": 80,
    "data": 95,
    "identity": 75
  },
  "lastUpdated": "2025-11-18T10:00:00Z"
}
```

### GET /security-score/factors
Get detailed security scoring factors.

### GET /security-score/history
Get historical security score data.

---

## Zero Trust Endpoints

### GET /zero-trust/radar
Get Zero Trust assessment radar.

**Response:**
```json
{
  "identity": 88,
  "device": 92,
  "network": 85,
  "data": 78,
  "workload": 89,
  "visibility": 91
}
```

### GET /zero-trust/identity-trust
Get identity trust scores.

### GET /zero-trust/device-trust
Get device trust assessment.

### GET /zero-trust/session-trust
Get session trust levels.

### GET /zero-trust/network-trust
Get network trust evaluation.

---

## Incident Response Endpoints

### GET /incident/summary
Get incident summary dashboard.

### POST /incident/timeline
Get incident timeline for specific incident.

**Request Body:**
```json
{
  "incidentId": "incident-001"
}
```

**Response:**
```json
{
  "timeline": [
    {
      "timestamp": "2025-11-18T09:00:00Z",
      "event": "Alert triggered",
      "description": "Malware detected on endpoint"
    }
  ]
}
```

### GET /incident/details/:id
Get detailed incident information.

### GET /incident/mitre-mapping
Get MITRE ATT&CK mapping for incident.

### GET /incident/playbook
Get recommended response playbook.

---

## Dark Web Intelligence Endpoints

### POST /darkweb/check-email
Check email for breaches.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "breached": true,
  "breaches": [
    {
      "site": "example.com",
      "date": "2023-01-15",
      "data": "email,password"
    }
  ]
}
```

### GET /darkweb/breaches
Get dark web breach data.

### GET /darkweb/marketplace
Get dark web marketplace monitoring.

### POST /darkweb/search-leaks
Search for leaked credentials.

### GET /darkweb/ransomware
Get ransomware threat intelligence.

### GET /darkweb/pastes
Get pastebin and dark web paste monitoring.

### GET /darkweb/score
Get dark web exposure score.

---

## Scanning Endpoints

### POST /scan/url
Scan URL for security threats.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "safe": false,
  "threats": ["malware", "phishing"],
  "riskLevel": "High"
}
```

### POST /scan/email
Scan email for security threats.

**Request Body:**
```json
{
  "email": "sender@example.com",
  "subject": "Urgent Action Required",
  "content": "email body content"
}
```

### POST /scan/file
Scan uploaded file for threats.

**Request Body:** (multipart/form-data)
```
file: [uploaded file]
```

### GET /scan/reputation?query=value
Check reputation of domain/IP/hash.

### POST /scan/explain
Get detailed explanation of scan results.

---

## Deepfake Detection Endpoints

### POST /deepfake/analyze
Analyze media for deepfake content.

**Request Body:** (multipart/form-data)
```
file: [video/image file]
```

**Response:**
```json
{
  "isDeepfake": true,
  "confidence": 0.87,
  "techniques": ["face_swap", "audio_synthesis"],
  "recommendations": ["Verify with additional sources"]
}
```

### GET /deepfake/forensics
Get deepfake forensic analysis.

### GET /deepfake/frames
Get frame-by-frame analysis.

### GET /deepfake/timeline
Get temporal analysis of deepfake.

### POST /deepfake/explain
Get explanation of deepfake detection.

### GET /deepfake/recommendations
Get deepfake prevention recommendations.

---

## System Management Endpoints

### GET /system/health
Get system health status.

**Response:**
```json
{
  "cpu": 45,
  "memory": 67,
  "disk": 23,
  "network": 12,
  "overall": "Healthy"
}
```

### GET /system/processes
Get system processes monitoring.

---

## Vault Management Endpoints

### POST /vault
Add item to secure vault.

**Request Body:**
```json
{
  "type": "password",
  "title": "Company Email",
  "username": "user@company.com",
  "password": "encrypted-password"
}
```

### GET /vault
Get all vault items.

### DELETE /vault/:id
Delete vault item.

### PUT /vault/:id
Update vault item.

---

## AI Guardian Endpoints

### GET /ai-guardian/overview
Get AI Guardian dashboard overview.

### GET /ai-guardian/alerts
Get AI Guardian alerts and notifications.

### GET /ai-guardian/policies
Get AI Guardian security policies.

### POST /ai-guardian/evaluate
Evaluate activity with AI Guardian.

---

## Behavior Analytics Endpoints

### GET /behavior/summary
Get behavioral analytics summary.

### GET /behavior/trends
Get behavioral trends over time.

### GET /behavior/anomalies
Get detected behavioral anomalies.

---

## Additional Endpoints

### GET /prediction/summary
Get attack prediction summary.

### GET /prediction/types
Get prediction by attack types.

### GET /prediction/risks
Get risk prediction assessments.

### GET /reports/generate
Generate security reports.

### GET /education/courses
Get cybersecurity training courses.

### GET /support/tickets
Get support tickets.

### POST /support/create
Create new support ticket.

### GET /compliance/frameworks
Get compliance frameworks.

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "status": 400
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are rate limited by IP address:
- 100 requests per minute for most endpoints
- 10 requests per minute for AI analysis endpoints
- 5 requests per minute for intensive processing endpoints

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1637240400
```

---

## WebSocket Support

Real-time updates available via WebSocket at `/socket.io`:

```javascript
const socket = io('http://localhost:5000');

// Listen for threat alerts
socket.on('threat-alert', (data) => {
  console.log('New threat detected:', data);
});

// Listen for security score updates
socket.on('security-score-update', (data) => {
  console.log('Score updated:', data);
});
```

---

*This API documentation is automatically maintained. For the latest updates, refer to the backend route files.*
