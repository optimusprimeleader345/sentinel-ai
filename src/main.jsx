import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Add a simple test to verify React is working
console.log('Main.jsx loaded')

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="color: white; padding: 20px; background: red;">ERROR: Root element not found!</div>'
} else {
  console.log('Root element found, creating React root...')
  
  try {
    const root = ReactDOM.createRoot(rootElement)

    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Error rendering app:', error)
    const errorHtml = `
      <div style="color: white; padding: 20px; background: #1e293b; min-height: 100vh;">
        <h1 style="color: #ef4444;">Error Rendering App</h1>
        <p style="color: #cbd5e1;">An error occurred while rendering the application.</p>
        <p style="color: #cbd5e1;">Details: ${error.message}</p>
        <pre style="background: #0f172a; padding: 10px; border-radius: 5px; overflow: auto;">${error.stack}</pre>
      </div>
    `
    rootElement.innerHTML = errorHtml
  }
}
