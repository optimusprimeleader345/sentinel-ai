# SentinelAI System Architecture

> Comprehensive technical architecture of the SentinelAI Cybersecurity Platform

## System Overview

SentinelAI is a modern, modular cybersecurity platform built with a microservices-inspired architecture using Node.js and React. The platform provides comprehensive threat intelligence, automated incident response, and proactive defense capabilities through a collection of specialized AI-powered security modules.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SentinelAI Platform                           │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────────────────┐ │
│  │   React SPA     │  │   Express    │  │   AI/ML Engine              │ │
│  │   Frontend      │◄►│   API Gateway │◄►│   (OpenAI/API Integration)  │ │
│  │   (Vite)        │  │   (Node.js)  │  │                             │ │
│  └─────────────────┘  └──────────────┘  └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│               Microservices Layer (Mock Implementations)              │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────────────────────┐ │
│  │ Threat Intel│  Behavior   │  Deepfake   │     AI Modules          │ │
│  │   Service   │   Analytics │   Service   │   (Guardian, Defense)   │ │
│  └─────────────┴─────────────┴─────────────┴─────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                 Data Layer & External Integrations                     │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────────────────────┐ │
│  │  MongoDB    │ Elasticsearch│  File       │   External APIs         │ │
│  │  (Optional) │  (Future)   │  Storage    │   (Threat Feeds)        │ │
│  └─────────────┴─────────────┴─────────────┴─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Frontend Layer (React SPA)

#### Technology Stack
- **Framework**: React 18.3.1 with Hooks and Context API
- **Build Tool**: Vite 5.4.6 (fast development and optimized production builds)
- **Routing**: React Router DOM 6.26.0 (client-side routing)
- **State Management**: React Context + useState/useReducer
- **HTTP Client**: Axios with interceptors for authentication
- **UI Framework**: Tailwind CSS with custom dark/neon theming
- **Icons**: Lucide React icon library
- **Charts**: Recharts for data visualization

#### Key Components
```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx        # Data display cards
│   ├── SecurityScoreCard.jsx  # Specialized security metrics
│   ├── ChartCard.jsx   # Data visualization wrapper
│   ├── Sidebar.jsx     # Navigation component
│   └── [20+ components]
├── pages/             # Route-based page components
│   ├── Dashboard.jsx  # Main dashboard (40+ pages total)
│   ├── AIAnalyzer.jsx # AI analysis interface
├── layouts/           # Layout components
│   └── MainLayout.jsx # Common page structure
├── lib/              # Utilities and configuration
│   └── api.js        # Centralized API client
└── data/             # Static mock data
    └── mock.js       # Mock data for development
```

#### Frontend Architecture Patterns
- **Component Composition**: Reusable, composable UI components
- **Custom Hooks**: Encapsulated logic for data fetching and state management
- **Context Providers**: Global state management for authentication and theming
- **Error Boundaries**: Graceful error handling and fallback UI
- **Lazy Loading**: Code splitting for optimal bundle sizes

### 2. Backend Layer (Express API Gateway)

#### Technology Stack
- **Runtime**: Node.js 18+ with ES6 modules
- **Framework**: Express 4.18.2 (minimal web framework)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs password hashing
- **AI Integration**: OpenAI API 4.20.1 client
- **Security**: Helmet (HTTP security headers), CORS protection
- **Validation**: Express-validator for input sanitization
- **File Handling**: Multer for multipart uploads
- **Logging**: Morgan HTTP request logger

#### API Architecture

```
backend/
├── server.js            # Main application entry point
├── config/             # Configuration management
│   └── db.js          # Database connection (optional)
├── controllers/        # Business logic layer (33 modules)
│   ├── aiController.js         # AI analysis logic
│   ├── threatController.js     # Threat management
│   ├── securityController.js   # Security scoring
│   └── [30+ specialized controllers]
├── routes/            # Route definitions (29 route files)
│   ├── aiRoutes.js          # AI endpoints
│   ├── threatRoutes.js      # Threat intelligence
│   ├── securityRoutes.js    # Security monitoring
│   └── [26+ API route files]
├── models/           # Data models (optional MongoDB)
│   ├── User.js       # User authentication
│   ├── Threat.js     # Threat intelligence
│   └── SystemHealth.js # System monitoring
├── middleware/       # Express middleware
│   └── authMiddleware.js    # Authentication guards
├── utils/           # Utility functions
│   ├── encrypt.js   # AES-256 encryption
│   └── fileUpload.js # File upload handling
├── data/           # Mock data and test datasets
│   ├── threatData.js      # Threat intelligence mocks
│   ├── deepfakeMockData.js # Deepfake analysis data
│   └── guardianData.js    # AI Guardian datasets
└── uploads/        # File upload storage
```

### 3. Microservices-Style Module Architecture

SentinelAI implements a modular architecture where each security function operates as a semi-independent "microservice" within the monolithic application structure. This design allows for:

- **Independent Development**: Each module can be developed and tested independently
- **Scalability**: Modules can be scaled individually based on demand
- **Technology Flexibility**: Different modules can use different AI/ML approaches
- **Mock-to-Production Migration**: Easy transition from mock implementations to real services

#### AI Modules as Microservices

```
AI Module Layer
├── AI Analyzer Service
│   ├── Mock Implementation: Random analysis generation
│   ├── Future: Custom ML models + OpenAI integration
│   └── Interface: REST API (/api/ai/*)
├── AI Defense Bot Service
│   ├── Mock Implementation: Rule-based defense actions
│   ├── Future: Autonomous response orchestration
│   └── Interface: REST API (/api/ai-defense/*)
├── AI Guardian Service
│   ├── Mock Implementation: Anomaly detection simulation
│   ├── Future: Advanced behavioral analytics
│   └── Interface: REST API (/api/ai-guardian/*)
└── AI Log Analyzer Service
    ├── Mock Implementation: Pattern matching simulation
    ├── Future: Machine learning log analysis
    └── Interface: Multiple endpoints across modules
```

#### Threat Intelligence Modules

```
├── Threat Intelligence Hub
│   ├── Advanced Threat Detection
│   ├── Dark Web Monitoring
│   ├── Deepfake Detection
│   └── Behavior Analytics
├── Security Operations Center
│   ├── Incident Response
│   ├── Attack Simulation
│   ├── Defense Playbooks
│   └── Reporting Center
└── Security Assessment
    ├── Security Scoring
    ├── Zero Trust Analysis
    ├── Compliance Center
    └── Vulnerability Scanning
```

## Data Flow Architecture

### Frontend-Backend Communication

```
┌─────────────┐     HTTP/WebSocket     ┌─────────────┐
│   React     │◄─────────────────────►│   Express   │
│   Frontend  │  JSON REST API        │   Backend   │
│   (SPA)     │  JWT Authentication   │   (API)     │
└─────────────┘                       └─────────────┘
     │                                       │
     │                                       │
     ▼                                       ▼
┌─────────────┐                     ┌─────────────┐
│   Browser   │                     │   MongoDB   │
│   Storage   │                     │   (Optional)│
│   (local)   │                     │             │
└─────────────┘                     └─────────────┘
```

### AI Integration Flow

```
┌────────────┐     ┌─────────────┐     ┌─────────────┐
│ User Query │────►│ Controller  │────►│ OpenAI API  │
│            │     │  Logic      │     │   or Mock   │
└────────────┘     └─────────────┘     └─────────────┘
                        │                       │
                        ▼                       ▼
                ┌─────────────┐     ┌─────────────┐
                │ Response    │     │ Cache/Store │
                │ Processing  │     │  Results    │
                └─────────────┘     └─────────────┘
```

## Database Architecture

### Current Implementation: Mock-Based Data Layer

```
┌─────────────────────────────────────────────────────────┐
│                 Mock Data Architecture                  │
├─────────────────────────────────────────────────────────┤
│  ┌────────────┬────────────┬────────────┬────────────┐ │
│  │ Threat     │ Behavior   │ Deepfake   │ Security   │ │
│  │ Intelligence│ Analytics │ Analysis   │ Scores     │ │
│  │ Data       │ Data       │ Data       │ Data       │ │
│  └────────────┴────────────┴────────────┴────────────┘ │
├─────────────────────────────────────────────────────────┤
│              File-Based JSON Storage                    │
├─────────────────────────────────────────────────────────┤
│  backend/data/*.js files containing mock datasets       │
└─────────────────────────────────────────────────────────┘
```

### Future Production Database Architecture

```
┌─────────────────────────────────────────────────────────┐
│            Production Database Architecture             │
├─────────────────────────────────────────────────────────┤
│  ┌────────────┬────────────┬────────────┬────────────┐ │
│  │ MongoDB    │ Elasticsearch│ Redis      │ PostgreSQL│ │
│  │ (Primary)  │ (Search)    │ (Cache)    │ (Analytics)│ │
│  └────────────┴────────────┴────────────┴────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌────────────┬────────────┬────────────┬────────────┐ │
│  │ Users      │ Threat Logs │ Session    │ Reports    │ │
│  │ & Auth     │ & Events    │ Data       │ & Metrics  │ │
│  └────────────┴────────────┴────────────┴────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## External Integration Architecture

### Threat Intelligence Feeds

```
SentinelAI Backend
        │
        ▼
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ VirusTotal  │ AbuseIPDB   │ AlienVault  │ Mandiant    │
│ API         │ API         │ OTX         │ Threat Intel│
└─────────────┴─────────────┴─────────────┴─────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│        Threat Intelligence Correlation Engine           │
│  - IOC Correlation   - Threat Enrichment                │
│  - False Positive Reduction  - Alert Prioritization    │
└─────────────────────────────────────────────────────────┘
```

### AI Service Providers

```
┌─────────────────┐     ┌─────────────────┐
│   SentinelAI    │────►│   OpenAI API    │
│   Backend       │     │   GPT Models    │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Custom ML Models│     │   Claude AI     │
│ (Future)        │     │   Integration   │
└─────────────────┘     └─────────────────┘
```

## Security Architecture

### Authentication & Authorization

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────►│  JWT Auth   │────►│ Protected   │
│   Request   │     │  Middleware │     │ Resources   │
└─────────────┘     └─────────────┘     └─────────────┘
                                             │
                                             ▼
                                   ┌─────────────┐
                                   │ Role-Based  │
                                   │ Access Ctrl │
                                   └─────────────┘
```

### Data Protection Layers

```
┌─────────────────────────────────────────────────────────┐
│                Data Protection Architecture             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────┐ │
│  │ TLS 1.3     │ AES-256     │ bcrypt      │ Argon2  │ │
│  │ Encryption  │ Encryption  │ Passwords   │ Hashing │ │
│  └─────────────┴─────────────┴─────────────┴─────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┬─────────────┬─────────────┬─────────┐ │
│  │ Input       │ XSS         │ CSRF        │ Rate    │ │
│  │ Validation  │ Protection  │ Protection  │ Limiting│ │
│  └─────────────┴─────────────┴─────────────┴─────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Development Environment

```
┌─────────────────┐     ┌─────────────────┐
│   Vite Dev      │     │   Node Dev      │
│   Server        │     │   Server        │
│   (:5173)       │     │   (:5000)       │
└─────────────────┘     └─────────────────┘
         │                       │
         └──► Browser ◄──────────┘
             (CORS enabled)
```

### Production Deployment

```
┌─────────────────┐     ┌─────────────────┐
│   Vercel/Netlify│     │   Railway/     │
│   Frontend      │     │   Render       │
│   (CDN)         │     │   Backend       │
└─────────────────┘     └─────────────────┘
         │                       │
         └──► CloudFlare ◄───────┘
             (CDN & Security)
```

## Performance & Scalability

### Frontend Optimization

- **Code Splitting**: Route-based lazy loading with React.lazy()
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: Service worker for offline functionality (future)
- **CDN**: Static asset delivery optimization

### Backend Optimization

- **Clustering**: PM2 clustering for multi-core utilization
- **Caching**: Redis integration for session and data caching (future)
- **Rate Limiting**: Express rate limiting middleware
- **Compression**: Gzip compression for API responses

### AI Module Performance

- **Async Processing**: Non-blocking AI analysis operations
- **Queue Management**: Background job processing for resource-intensive tasks
- **Caching**: AI response caching to reduce API costs
- **Batch Processing**: Efficient handling of multiple analysis requests

## Monitoring & Observability

### Application Monitoring

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Application   │────►│   Health        │────►│   PM2           │
│   Metrics       │     │   Checks        │     │   Monitoring    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                             ┌─────────────────┐
                                             │   Grafana/      │
                                             │   Kibana        │
                                             │   Dashboards    │
                                             └─────────────────┘
```

### Error Tracking & Logging

- **Morgan**: HTTP request logging with custom formats
- **Winston**: Structured logging with multiple transports (future)
- **Error Boundaries**: Frontend error capturing and reporting
- **API Error Handling**: Consistent error response format

## Future Architecture Evolution

### Phase 1: Microservices Migration (6 months)

```
┌─────────────────┐     ┌─────────────────┐
│   API Gateway   │────►│   Microservice  │
│   (Express)     │     │   Registry      │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ AI Analyzer μS  │     │ Threat Intel μS │
│ (Docker)        │     │ (Docker)        │
└─────────────────┘     └─────────────────┘
```

### Phase 2: Cloud-Native Architecture (12-18 months)

```
┌─────────────────┐     ┌─────────────────┐
│   Kubernetes    │────►│   Istio         │
│   Cluster       │     │   Service Mesh  │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   Auto-scaling  │     │   AI Inference  │
│   Pods          │     │   GPUs          │
└─────────────────┘     └─────────────────┘
