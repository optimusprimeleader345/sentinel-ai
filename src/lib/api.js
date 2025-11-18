import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      // Optionally redirect to login
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
}

// AI API
export const aiAPI = {
  analyze: (data) => api.post('/ai/analyze', data),
  botChat: (data) => api.post('/ai/bot', data),
  simulateAction: (data) => api.post('/ai/actions/simulate', data),
}

// Threat API
export const threatAPI = {
  getThreats: () => api.get('/threats'),
  getGlobalThreats: () => api.get('/threats/global'),
  createThreat: (data) => api.post('/threats', data),
  updateThreat: (id, data) => api.put(`/threats/${id}`, data),
  deleteThreat: (id) => api.delete(`/threats/${id}`),
  getThreatOverview: () => api.get('/threats/overview'),
  lookupIOC: (query) => api.get(`/threats/lookup?query=${query}`),
  getDarkWebIntel: () => api.get('/threats/darkweb'),
  getThreatCorrelation: () => api.get('/threats/correlation'),
  classifyThreat: (data) => api.post('/threats/classify', data),
  // Threat Intelligence Center APIs
  getHeatmap: () => api.get('/threats/heatmap'),
  getSeverityStats: () => api.get('/threats/severity-stats'),
  getTrends: () => api.get('/threats/trends'),
  getThreatFeed: () => api.get('/threats/feed'),
  getMitreMatrix: () => api.get('/threats/mitre'),
  getCorrelationEngine: () => api.get('/threats/correlation'),
}

// System API
export const systemAPI = {
  getHealth: () => api.get('/system/health'),
  updateHealth: (data) => api.post('/system/health', data),
  getProcesses: () => api.get('/system/processes'),
}

// Scan API
export const scanAPI = {
  scanURL: (data) => api.post('/scan/url', data),
  scanEmail: (data) => api.post('/scan/email', data),
  getHistory: () => api.get('/scan/history'),
}

export const scanFile = (filename) => api.post('/scan/file', { filename })
export const checkReputation = (query) => api.get(`/scan/reputation?query=${query}`)
export const explainScan = (data) => api.post('/scan/explain', data)

// Logs API
export const logsAPI = {
  getLogs: (params) => api.get('/logs', { params }),
  createLog: (data) => api.post('/logs', data),
}

// Deepfake API
export const deepfakeAPI = {
  analyze: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/deepfake/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export const analyzeDeepfake = (data) => api.post('/deepfake/analyze', data);
export const getDeepfakeForensics = (id) => api.get(`/deepfake/forensics/${id}`);
export const getDeepfakeFrames = (id) => api.get(`/deepfake/frames/${id}`);
export const getDeepfakeTimeline = (id) => api.get(`/deepfake/timeline/${id}`);
export const explainDeepfake = (data) => api.post('/deepfake/explain', data);
export const getDeepfakeRecommendations = () => api.get('/deepfake/recommendations');

// Vault API (Legacy)
export const vaultAPI = {
  addItem: (data) => api.post('/vault/db/add', data),  // Updated to avoid conflicts
  getAllItems: () => api.get('/vault/db/all'),
  deleteItem: (id) => api.delete(`/vault/db/${id}`),
  updateItem: (id, data) => api.put(`/vault/db/${id}`, data),
}

// ===== NEW MOCK VAULT API FUNCTIONS =====
export const unlockVault = (data) => api.post('/vault/unlock', data)
export const addVaultItem = (data) => api.post('/vault/add', data)
export const getVaultItems = () => api.get('/vault/list')
export const decryptVaultItem = (data) => api.post('/vault/decrypt', data)
export const searchVault = (query) => api.get(`/vault/search?query=${query}`)
export const filterVault = (type) => api.get(`/vault/filter?type=${type}`)
export const getVaultHistory = () => api.get('/vault/history')
export const deleteVaultItemNew = (id) => api.delete(`/vault/${id}`)

// Intel API
export const intelAPI = {
  getFeed: () => api.get('/intel/feed'),
  getSummary: () => api.get('/intel/summary'),
  getMalwareTrends: () => api.get('/intel/malware-trends'),
  getTechniques: () => api.get('/intel/techniques'),
}

// Dark Web API
export const darkwebAPI = {
  checkEmail: (email) => api.get('/darkweb/check', { params: { email } }),
  getBreaches: () => api.get('/darkweb/breaches'),
}

// Education API
export const educationAPI = {
  getCourses: () => api.get('/education/courses'),
  getTips: () => api.get('/education/tips'),
  getTopics: () => api.get('/education/topics'),
  getLesson: (id) => api.get(`/education/lessons/${id}`),
  getVideos: () => api.get('/education/videos'),
  getQuiz: (id) => api.get(`/education/quiz/${id}`),
  getProgress: () => api.get('/education/progress'),
  submitQuiz: (data) => api.post('/education/submit', data),
}

// Support API
export const supportAPI = {
  createTicket: (data) => api.post('/support/ticket', data),
  getTickets: () => api.get('/support/ticket'),
  getFAQ: () => api.get('/support/faq'),
  getAISupport: (data) => api.post('/support/ai', data),
  getChatMessages: () => api.get('/support/chat'),
  sendMessage: (data) => api.post('/support/chat', data),

  // ===== NEW API FUNCTIONS FOR COMPLETE CUSTOMER SUPPORT SYSTEM =====
  createSupportTicket: (d) => api.post('/support/tickets', d),
  getSupportTickets: () => api.get('/support/tickets'),
  getTicketDetails: (id) => api.get(`/support/tickets/${id}`),
  replyTicket: (id, d) => api.post(`/support/tickets/${id}/reply`, d),
  askSupportAI: (d) => api.post('/support/assistant', d),
  getSupportStats: () => api.get('/support/stats'),
}

// Security API
export const securityAPI = {
  getScore: () => api.get('/security/score'),
}

// Guardian API
export const guardianAPI = {
  getReport: () => api.get('/guardian/report'),
}

export const getGuardianScore = () => api.get('/guardian/score');
export const getGuardianAnomalies = () => api.get('/guardian/anomalies');
export const getGuardianPrivacyScan = () => api.get('/guardian/privacy-scan');
export const getGuardianDeviceSecurity = () => api.get('/guardian/device-security');
export const getGuardianRecommendations = () => api.get('/guardian/recommendations');
export const askAIGuardian = (data) => api.post('/guardian/ask', data);

// Defense API
export const getDefenseStatus = () => api.get('/defense/status');
export const getDefenseActions = () => api.get('/defense/actions');
export const getActiveThreats = () => api.get('/defense/active-threats');
export const getDefenseRecommendations = () => api.get('/defense/recommendations');
export const sendDefenseCommand = (data) => api.post('/defense/command', data);

// Log Analysis API
export const analyzeLogs = (data) => api.post('/logs/analyze', data);
export const uploadLogFile = (data) => api.post('/logs/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getLogAnomalies = () => api.get('/logs/anomalies');
export const getLogEvents = () => api.get('/logs/events');
export const getLogTimeline = () => api.get('/logs/timeline');

// Prediction API
export const getPredictionSummary = () => api.get('/prediction/summary');
export const getPredictionAttackTypes = () => api.get('/prediction/attack-types');
export const getPredictionRisks = () => api.get('/prediction/risks');
export const getPredictionInsights = () => api.get('/prediction/insights');
export const getPredictionHeatmap = () => api.get('/prediction/heatmap');
export const getPredictionExplanation = () => api.get('/prediction/explain');

// Behavior Analytics API (UEBA)
export const getBehaviorSummary = () => api.get('/behavior/summary');
export const getBehaviorTrends = () => api.get('/behavior/trends');
export const getAnomalyEvents = () => api.get('/behavior/anomalies');
export const getUserRisk = () => api.get('/behavior/risk');
export const getDeviceBehavior = () => api.get('/behavior/devices');
export const getLocationActivity = () => api.get('/behavior/locations');
export const getBehaviorInsights = () => api.get('/behavior/insights');

// Security Score
export const getOverallSecurityScore = () => api.get('/security-score/overall');
export const getSecurityScoreFactors = () => api.get('/security-score/factors');
export const getSecurityScoreHistory = () => api.get('/security-score/history');

// Dark Web Monitor
export const getDarkwebBreaches = () => api.get('/darkweb/breaches-exact');
export const getDarkwebCredentials = () => api.get('/darkweb/exposed-credentials');
export const getDarkwebWarnings = () => api.get('/darkweb/warnings');

// Zero Trust APIs
export const getZTIdentity = () => api.get('/zero-trust/identity');
export const getZTDevice = () => api.get('/zero-trust/device');
export const getZTSession = () => api.get('/zero-trust/session');
export const getZTNetwork = () => api.get('/zero-trust/network');
export const getZTRadar = () => api.get('/zero-trust/radar');
export const getZTRecommendations = () => api.get('/zero-trust/recommendations');

// Incident Response APIs
export const getIncidentSummary = () => api.get('/incident/summary');
export const getIncidentTimeline = () => api.get('/incident/timeline');
export const getIncidentDetails = () => api.get('/incident/details');
export const getIncidentMITRE = () => api.get('/incident/mitre');
export const getIncidentPlaybook = () => api.get('/incident/playbook');

// Attack Simulation APIs
export const getSimulationScenarios = () => api.get('/simulation/scenarios');
export const runSimulation = (data) => api.post('/simulation/run', data);
export const getSimulationHistory = () => api.get('/simulation/history');

// Defense Playbooks APIs
export const getPlaybooks = () => api.get('/playbooks/list');
export const getPlaybookFlow = (params) => api.get('/playbooks/flow', { params });
export const togglePlaybook = (data) => api.post('/playbooks/toggle', data);
export const simulatePlaybook = (data) => api.post('/playbooks/simulate', data);
export const getPlaybookHistory = () => api.get('/playbooks/history');

// Reporting Center
export const generateReport = (data) => api.post("/reports/generate", data);
export const getReportHistory = () => api.get("/reports/history");

// Secure Vault
export const getVaultItemsNew = () => api.get("/vault/list");
export const addVaultItemNew = (data) => api.post("/vault/add", data);
export const deleteVaultItemNewer = (id) => api.delete(`/vault/delete/${id}`);
export const decryptVaultItemNew = (data) => api.post("/vault/decrypt", data);

// Scan Center
export const newScanURL = (data) => api.post("/scan/url", data);
export const newScanEmail = (data) => api.post("/scan/email", data);
export const newScanFile = (data) =>
  api.post("/scan/file", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Threat Intel
export const getThreatFeed = () => api.get("/threat-intel/feed");
export const getThreatActors = () => api.get("/threat-intel/actors");
export const getThreatIOCs = () => api.get("/threat-intel/iocs");

// Customer Support
export const getTickets = () => api.get("/support/tickets");
export const getTicketDetails = (id) => api.get(`/support/tickets/${id}`);
export const createTicket = (data) => api.post("/support/tickets", data);
export const replyTicket = (id, data) => api.post(`/support/tickets/${id}/reply`, data);
export const updateTicketStatus = (id, data) => api.patch(`/support/tickets/${id}/status`, data);
export const getSupportStats = () => api.get("/support/stats");

// Compliance Center
export const getComplianceFrameworks = () => api.get("/compliance/frameworks");
export const getComplianceControls = () => api.get("/compliance/controls");
export const getComplianceGaps = () => api.get("/compliance/gaps");

// AI Defense Bot
export const getAIDefenseOverview = () => api.get("/ai-defense/overview");
export const analyzeDefenseContext = (data) => api.post("/ai-defense/analyze-context", data);
export const getAIDefenseActions = () => api.get("/ai-defense/actions");
export const simulateDefenseAction = (data) => api.post("/ai-defense/simulate", data);

// AI Guardian
export const getAIGuardianOverview = () => api.get("/ai-guardian/overview");
export const getAIGuardianAlerts = () => api.get("/ai-guardian/alerts");
export const getAIGuardianPolicies = () => api.get("/ai-guardian/policies");
export const evaluateWithGuardian = (data) => api.post("/ai-guardian/evaluate", data);

export default api
