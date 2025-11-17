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

// Vault API
export const vaultAPI = {
  addItem: (data) => api.post('/vault/add', data),
  getAllItems: () => api.get('/vault/all'),
  deleteItem: (id) => api.delete(`/vault/${id}`),
  updateItem: (id, data) => api.put(`/vault/${id}`, data),
}

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
  submitQuiz: (data) => api.post('/education/quiz', data),
}

// Support API
export const supportAPI = {
  createTicket: (data) => api.post('/support/ticket', data),
  getTickets: () => api.get('/support/ticket'),
  getFAQ: () => api.get('/support/faq'),
  getAISupport: (data) => api.post('/support/ai', data),
  getChatMessages: () => api.get('/support/chat'),
  sendMessage: (data) => api.post('/support/chat', data),
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

export default api
