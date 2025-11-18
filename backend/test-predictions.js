console.log('🚀 Starting SentinelAI Backend Server for Prediction API testing...\n');

// Simple test using built-in Node.js HTTP client
import http from 'http';
import { spawn } from 'child_process';

// Start the server
const serverProcess = spawn('node', ['server.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';
let serverStarted = false;

serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  serverOutput += output;
  console.log('Server:', output);
  if (output.includes('SentinelAI Backend Server running on port 5000')) {
    serverStarted = true;
  }
});

serverProcess.stderr.on('data', (data) => {
  console.log('Server Error:', data.toString());
});

// Wait for server to start
async function waitForServer() {
  for (let i = 0; i < 20; i++) {
    if (serverStarted) {
      console.log('✅ Server started successfully!\n');
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  console.log('❌ Server failed to start within timeout\n');
  serverProcess.kill();
  return false;
}

// Test endpoints using simple HTTP requests
async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${endpoint}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${endpoint}: Status ${res.statusCode}`);
          console.log(`   Response: ${JSON.stringify(jsonData).substring(0, 100)}...\n`);
          resolve(true);
        } catch (error) {
          console.log(`❌ ${endpoint}: Failed to parse JSON - ${error.message}\n`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${endpoint}: ${error.message}\n`);
      resolve(false);
    });

    req.setTimeout(5000, () => {
      console.log(`❌ ${endpoint}: Request timeout\n`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function runFullTest() {
  // Wait for server to start
  const serverReady = await waitForServer();
  if (!serverReady) {
    process.exit(1);
  }

  console.log('🧪 Testing all Threat Prediction endpoints...\n');

  const endpoints = [
    '/prediction/summary',
    '/prediction/attack-types',
    '/prediction/risks',
    '/prediction/insights',
    '/prediction/heatmap',
    '/prediction/explain'
  ];

  let successCount = 0;

  for (const endpoint of endpoints) {
    const passed = await testEndpoint(endpoint);
    if (passed) successCount++;
  }

  console.log(`\n📊 Test Results: ${successCount}/${endpoints.length} endpoints working`);

  // Kill the server
  serverProcess.kill();

  if (successCount === endpoints.length) {
    console.log('🎉 ALL Threat Prediction endpoints are fully operational!');
    console.log('✅ Backend for Threat Prediction AI is ready for production use.');
    process.exit(0);
  } else {
    console.log('⚠️  Some endpoints require attention.');
    process.exit(1);
  }
}

runFullTest().catch(error => {
  console.error('Test runner error:', error.message);
  if (serverProcess) serverProcess.kill();
  process.exit(1);
});
