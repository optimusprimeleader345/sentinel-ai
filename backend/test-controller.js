// Direct test of prediction controller functions
console.log('🔍 Testing Prediction Controller Functions...\n');

// Also test the new behavior analytics, log analyzer, security score, and dark web functions
console.log('🔍 Testing Behavior Analytics, Log Analyzer, Security Score, and Dark Web Functions...\n');
import {
  // Behavior Analytics (exact specifications)
  getSummary,
  getTrends,
  getAnomalies,
  getRiskScore,
  getDevices,
  getLocations,
  getInsights
} from './controllers/behaviorController.js';
import {
  // Log Analyzer (exact specifications)
  analyzeLogsExact as logAnalyze,
  uploadLogFileExact as logUpload,
  getAnomaliesExact as logAnomalies,
  getEventsExact as logEvents,
  getTimelineExact as logTimeline
} from './controllers/logController.js';

// New Security Score, Dark Web Monitor, Zero Trust, and Incident functions
import {
  getOverallScore,
  getScoreFactors,
  getScoreHistory
} from './controllers/securityScoreController.js';
import {
  getBreachesExact,
  getExposedCredentials,
  getWarnings
} from './controllers/darkwebController.js';
import {
  getIdentityTrust,
  getDeviceTrust,
  getSessionTrust,
  getNetworkTrust,
  getRadar,
  getZTRecommendations
} from './controllers/zeroTrustController.js';
import {
  getSummary as incidentSummary,
  getTimeline as incidentTimeline,
  getDetails as incidentDetails,
  getMITREMapping as mitreMapping,
  getPlaybook as incidentPlaybook
} from './controllers/incidentController.js';
import {
  getScenarios,
  runSimulation,
  getSimulationHistory
} from './controllers/simulationController.js';
import {
  getPlaybookList,
  getPlaybookFlow,
  togglePlaybook,
  simulatePlaybook,
  getPlaybookHistory
} from './controllers/playbookController.js';

import {
  getPredictionSummary,
  getPredictionAttackTypes,
  getPredictionRisks,
  getPredictionInsights,
  getPredictionHeatmap,
  getPredictionExplanation
} from './controllers/predictionController.js';

// Mock request/response objects for testing
function createMockReq(body = {}, query = {}) {
  return { body, query };
}

function createMockRes() {
  const res = {
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      this.responseData = data;
      return this;
    }
  };
  return res;
}

async function testControllerFunction(func, funcName, expectedKeys, reqData = {}) {
  console.log(`Testing ${funcName}...`);
  try {
    const mockReq = createMockReq(reqData.body, reqData.query);
    const mockRes = createMockRes();

    await func(mockReq, mockRes);

    if (mockRes.responseData) {
      console.log(`✅ ${funcName}: Status ${mockRes.statusCode || 200}`);

      // Check expected keys if specified
      if (expectedKeys && Array.isArray(expectedKeys)) {
        const hasAllKeys = expectedKeys.every(key => mockRes.responseData.hasOwnProperty(key));
        console.log(`   Structure check: ${hasAllKeys ? '✅ PASS' : '❌ FAIL - Missing keys'}`);
        if (!hasAllKeys) {
          console.log(`   Expected keys: ${expectedKeys.join(', ')}`);
          console.log(`   Actual keys: ${Object.keys(mockRes.responseData).join(', ')}`);
          return false;
        }
      }

      console.log(`   Response preview: ${JSON.stringify(mockRes.responseData).substring(0, 100)}...\n`);
      return true;
    } else {
      console.log(`❌ ${funcName}: No response data\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${funcName}: ${error.message}\n`);
    return false;
  }
}

async function testSecurityAndDarkWeb() {
  console.log('\n🛡️  Testing Security Score and Dark Web Monitor Functions...\n');

  const securityTests = [
    {
      func: getOverallScore,
      name: 'getOverallScore (Security)',
      keys: ['score', 'grade', 'status', 'factors']
    },
    {
      func: getScoreFactors,
      name: 'getScoreFactors (Security)',
      keys: null // Array with factor, value
    },
    {
      func: getScoreHistory,
      name: 'getScoreHistory (Security)',
      keys: null // Array with date, score
    },
    {
      func: getBreachesExact,
      name: 'getBreachesExact (DarkWeb)',
      keys: null // Array with site, leaked, records, date
    },
    {
      func: getExposedCredentials,
      name: 'getExposedCredentials (DarkWeb)',
      keys: null // Array with email, password, source
    },
    {
      func: getWarnings,
      name: 'getWarnings (DarkWeb)',
      keys: null // Array of strings
    }
  ];

  let successCount = 0;
  for (const test of securityTests) {
    const passed = await testControllerFunction(test.func, test.name, test.keys);
    if (passed) successCount++;
  }

  console.log(`📊 Security & Dark Web Test Results: ${successCount}/${securityTests.length} functions working`);
  return successCount === securityTests.length;
}

async function runControllerTests() {
  const tests = [
    // Behavior Analytics Tests
    {
      func: getSummary,
      name: 'getSummary (Behavior)',
      keys: ['unusualLogins', 'riskyDevices', 'locationChanges', 'privilegeEscalations', 'last24hAnomalies']
    },
    {
      func: getTrends,
      name: 'getTrends (Behavior)',
      keys: null // Array of {day, anomalies}
    },
    {
      func: getAnomalies,
      name: 'getAnomalies (Behavior)',
      keys: null // Array with id, type, risk, user, detail, location, timestamp
    },
    {
      func: getRiskScore,
      name: 'getRiskScore (Behavior)',
      keys: ['score', 'level', 'reasoning']
    },
    {
      func: getDevices,
      name: 'getDevices (Behavior)',
      keys: null // Array with device, status, anomalies, owner
    },
    {
      func: getLocations,
      name: 'getLocations (Behavior)',
      keys: null // Array with location, activity, anomalies
    },
    {
      func: getInsights,
      name: 'getInsights (Behavior)',
      keys: null // Array of strings
    },
    // Log Analyzer Tests
    {
      func: logAnalyze,
      name: 'analyzeLogsExact (Log)',
      keys: ['summary', 'totalEvents', 'failedLogins', 'suspiciousIPs', 'severity', 'patterns']
    },
    {
      func: logUpload,
      name: 'uploadLogFileExact (Log)',
      keys: ['message', 'parsedEvents', 'detectedIncidents']
    },
    {
      func: logAnomalies,
      name: 'getAnomaliesExact (Log)',
      keys: null // Array with id, type, severity, ip, username, attempts, timeframe or path, method, userAgent
    },
    {
      func: logEvents,
      name: 'getEventsExact (Log)',
      keys: null // Array with timestamp, level, message, ip
    },
    {
      func: logTimeline,
      name: 'getTimelineExact (Log)',
      keys: null // Array with time, failedLogins, anomalies
    },
    // Security Score Tests
    {
      func: getOverallScore,
      name: 'getOverallScore (Security)',
      keys: ['score', 'grade', 'status', 'factors']
    },
    {
      func: getScoreFactors,
      name: 'getScoreFactors (Security)',
      keys: null // Array with factor, value
    },
    {
      func: getScoreHistory,
      name: 'getScoreHistory (Security)',
      keys: null // Array with date, score
    },
    // Dark Web Monitor Tests
    {
      func: getBreachesExact,
      name: 'getBreachesExact (DarkWeb)',
      keys: null // Array with site, leaked, records, date
    },
    {
      func: getExposedCredentials,
      name: 'getExposedCredentials (DarkWeb)',
      keys: null // Array with email, password, source
    },
    {
      func: getWarnings,
      name: 'getWarnings (DarkWeb)',
      keys: null // Array of strings
    },
    // Zero Trust Tests
    {
      func: getIdentityTrust,
      name: 'getIdentityTrust (ZeroTrust)',
      keys: ['score', 'status', 'weakSignals', 'strongSignals']
    },
    {
      func: getDeviceTrust,
      name: 'getDeviceTrust (ZeroTrust)',
      keys: ['score', 'status', 'issues', 'compliantDevices', 'riskyDevices']
    },
    {
      func: getSessionTrust,
      name: 'getSessionTrust (ZeroTrust)',
      keys: ['score', 'anomalies', 'activeSessions']
    },
    {
      func: getNetworkTrust,
      name: 'getNetworkTrust (ZeroTrust)',
      keys: ['score', 'blockedIPs', 'suspiciousConnections', 'safeConnections']
    },
    {
      func: getRadar,
      name: 'getRadar (ZeroTrust)',
      keys: null // Array with label, value
    },
    {
      func: getZTRecommendations,
      name: 'getZTRecommendations (ZeroTrust)',
      keys: null // Array of strings
    },
    // Incident Response Tests
    {
      func: incidentSummary,
      name: 'getSummary (Incident)',
      keys: ['activeIncidents', 'resolvedIncidents', 'critical', 'medium', 'low', 'lastUpdated']
    },
    {
      func: incidentTimeline,
      name: 'getTimeline (Incident)',
      keys: null // Array with time, event, severity
    },
    {
      func: incidentDetails,
      name: 'getDetails (Incident)',
      keys: ['id', 'rootCause', 'affectedSystems', 'attackerIP', 'severity', 'actionsTaken']
    },
    {
      func: mitreMapping,
      name: 'getMITREMapping (Incident)',
      keys: null // Array with technique, name, detected
    },
    {
      func: incidentPlaybook,
      name: 'getPlaybook (Incident)',
      keys: null // Array of strings
    },
    // Attack Simulation Tests
    {
      func: getScenarios,
      name: 'getScenarios (Simulation)',
      keys: null // Array with id, name, difficulty, description
    },
    {
      func: runSimulation,
      name: 'runSimulation (Simulation)',
      keys: ['scenarioId', 'status', 'successProbability', 'blockedStages', 'successfulStages', 'partiallySuccessfulStages', 'impactAssessment', 'recommendations', 'executedAt'],
      reqData: { body: { scenarioId: 'SIM-PHISH', targetEnv: 'prod', attackVector: 'email', duration: 30, stealth: true } }
    },
    {
      func: getSimulationHistory,
      name: 'getSimulationHistory (Simulation)',
      keys: null // Array with id, scenario, result, date
    },
    // Defense Playbooks Tests
    {
      func: getPlaybookList,
      name: 'getPlaybookList (Playbook)',
      keys: null // Array with id, name, severity, trigger, status
    },
    {
      func: getPlaybookFlow,
      name: 'getPlaybookFlow (Playbook)',
      keys: ['id', 'name', 'steps'],
      reqData: { query: { id: 'PB-001' } }
    },
    {
      func: togglePlaybook,
      name: 'togglePlaybook (Playbook)',
      keys: ['id', 'status', 'message'],
      reqData: { body: { id: 'PB-001', enable: true } }
    },
    {
      func: simulatePlaybook,
      name: 'simulatePlaybook (Playbook)',
      keys: ['id', 'status', 'logs', 'executedAt'],
      reqData: { body: { id: 'PB-001' } }
    },
    {
      func: getPlaybookHistory,
      name: 'getPlaybookHistory (Playbook)',
      keys: null // Array with id, playbook, result, startedAt
    },
    // Prediction Tests
    {
      func: getPredictionSummary,
      name: 'getPredictionSummary',
      keys: ['totalThreatsNext7Days', 'confidence', 'todayRisk', 'lastUpdated']
    },
    {
      func: getPredictionAttackTypes,
      name: 'getPredictionAttackTypes',
      keys: null // Array, no specific keys
    },
    {
      func: getPredictionRisks,
      name: 'getPredictionRisks',
      keys: ['tomorrowProbability', 'highSeverityChance', 'expectedIntrusions', 'trend']
    },
    {
      func: getPredictionInsights,
      name: 'getPredictionInsights',
      keys: null // Array of strings
    },
    {
      func: getPredictionHeatmap,
      name: 'getPredictionHeatmap',
      keys: null // Array of objects
    },
    {
      func: getPredictionExplanation,
      name: 'getPredictionExplanation',
      keys: ['modelType', 'factors', 'narrative']
    }
  ];

  let successCount = 0;

  for (const test of tests) {
    const passed = await testControllerFunction(test.func, test.name, test.keys);
    if (passed) successCount++;
  }

  console.log(`\n📊 Controller Test Results: ${successCount}/${tests.length} functions working`);

  if (successCount === tests.length) {
    console.log('🎉 All prediction controller functions are working correctly!');
    console.log('✅ Ready for integration with Express routes.');
    process.exit(0);
  } else {
    console.log('⚠️  Some controller functions need attention.');
    process.exit(1);
  }
}

runControllerTests().catch(error => {
  console.error('Test runner error:', error.message);
  process.exit(1);
});
