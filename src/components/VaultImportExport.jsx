import React, { useState, useRef } from 'react'
import { Download, Upload, FileText, Shield, AlertTriangle, CheckCircle, X } from 'lucide-react'

const VaultImportExport = ({ vaultItems, onImportComplete }) => {
  const [showModal, setShowModal] = useState(false)
  const [importData, setImportData] = useState('')
  const [importFormat, setImportFormat] = useState('json')
  const [exportFormat, setExportFormat] = useState('json')
  const [loading, setLoading] = useState(false)
  const [importResults, setImportResults] = useState(null)
  const fileInputRef = useRef(null)

  const exportData = (format) => {
    try {
      setLoading(true)

      let exportData = {}
      let filename = 'vault-export'
      let mimeType = 'application/json'

      switch (format) {
        case 'json':
          exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            items: vaultItems.map(item => ({
              type: item.type,
              title: item.title,
              value: '', // Values are encrypted, export only metadata
              tags: item.tags || [],
              createdAt: item.lastUpdated,
              notes: `Exported from SentinelAI SecureVault on ${new Date().toLocaleDateString()}`
            }))
          }
          filename += '.json'
          mimeType = 'application/json'
          break

        case 'csv':
          const headers = ['Type', 'Title', 'Tags', 'Created Date', 'Notes']
          const csvRows = [
            headers.join(','),
            ...vaultItems.map(item => [
              item.type,
              `"${item.title}"`,
              `"${(item.tags || []).join('; ')}"`,
              item.lastUpdated,
              `"Exported from SentinelAI SecureVault"`
            ].join(','))
          ]
          exportData = csvRows.join('\n')
          filename += '.csv'
          mimeType = 'text/csv'
          break

        case 'keepass':
          // Simulate KeePass XML format
          exportData = `<?xml version="1.0" encoding="UTF-8"?>
<KeepassFile>
  <Meta>
    <Generator>SentinelAI SecureVault</Generator>
    <DatabaseName>SentinelAI Export</DatabaseName>
  </Meta>
  <Root>
    <Group>
      <Name>SentinelAI Vault</Name>
      ${vaultItems.map(item => `
      <Entry>
        <String>
          <Key>Title</Key>
          <Value>${item.title}</Value>
        </String>
        <String>
          <Key>UserName</Key>
          <Value></Value>
        </String>
        <String>
          <Key>Password</Key>
          <Value></Value>
        </String>
        <String>
          <Key>URL</Key>
          <Value></Value>
        </String>
        <String>
          <Key>Notes</Key>
          <Value>Exported from SentinelAI - Original type: ${item.type}</Value>
        </String>
        <String>
          <Key>Tags</Key>
          <Value>${(item.tags || []).join('; ')}</Value>
        </String>
      </Entry>`).join('')}
    </Group>
  </Root>
</KeepassFile>`
          filename += '.xml'
          mimeType = 'application/xml'
          break

        default:
          throw new Error('Unsupported export format')
      }

      // Create and download file
      const blob = new Blob([typeof exportData === 'string' ? exportData : JSON.stringify(exportData, null, 2)], {
        type: mimeType
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setLoading(false)

    } catch (error) {
      console.error('Export error:', error)
      setLoading(false)
      alert('Export failed: ' + error.message)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target.result

        if (importFormat === 'json') {
          const data = JSON.parse(content)
          if (data.items && Array.isArray(data.items)) {
            setImportData(JSON.stringify(data, null, 2))
          } else {
            throw new Error('Invalid JSON format - missing items array')
          }
        } else if (importFormat === 'csv') {
          setImportData(content)
        } else if (importFormat === 'keepass') {
          setImportData(content)
        }
      } catch (error) {
        console.error('File read error:', error)
        alert('Failed to read file: ' + error.message)
      }
    }
    reader.readAsText(file)
  }

  const importDataNow = () => {
    try {
      setLoading(true)

      let importedItems = []

      if (importFormat === 'json') {
        const data = JSON.parse(importData)
        if (data.items && Array.isArray(data.items)) {
          importedItems = data.items.map(item => ({
            type: item.type || 'Password',
            title: item.title || 'Imported Item',
            value: item.value || '',
            tags: Array.isArray(item.tags) ? item.tags : [],
            lastUpdated: item.createdAt || new Date().toISOString()
          }))
        }
      } else if (importFormat === 'csv') {
        const lines = importData.split('\n').filter(line => line.trim())
        if (lines.length < 2) throw new Error('CSV must have at least a header row')

        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim())
          if (values.length >= headers.length) {
            importedItems.push({
              type: values[0] || 'Password',
              title: values[1] || 'Imported Item',
              value: '',
              tags: values[2] ? values[2].split(';').map(t => t.trim()).filter(t => t) : [],
              lastUpdated: values[3] || new Date().toISOString()
            })
          }
        }
      } else if (importFormat === 'keepass') {
        // Basic KeePass XML parsing
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(importData, 'text/xml')
        const entries = xmlDoc.getElementsByTagName('Entry')

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          const strings = entry.getElementsByTagName('String')

          let title = 'Imported Item'
          let notes = ''

          for (let j = 0; j < strings.length; j++) {
            const string = strings[j]
            const key = string.getElementsByTagName('Key')[0]?.textContent
            const value = string.getElementsByTagName('Value')[0]?.textContent

            if (key === 'Title' && value) title = value
            if (key === 'Notes' && value) notes = value
          }

          importedItems.push({
            type: 'Password',
            title,
            value: '',
            tags: [],
            lastUpdated: new Date().toISOString()
          })
        }
      }

      // Validate imported items
      const validItems = importedItems.filter(item =>
        item.title && item.title.trim() && item.type
      )

      setImportResults({
        total: importedItems.length,
        valid: validItems.length,
        invalid: importedItems.length - validItems.length,
        items: validItems
      })

      setLoading(false)

    } catch (error) {
      console.error('Import error:', error)
      setLoading(false)
      setImportResults({
        error: error.message,
        total: 0,
        valid: 0,
        invalid: 0,
        items: []
      })
    }
  }

  const confirmImport = () => {
    if (importResults && importResults.items && importResults.items.length > 0) {
      onImportComplete?.(importResults.items)
      setShowModal(false)
      setImportData('')
      setImportResults(null)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Export Section */}
        <div className="flex items-center space-x-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-300">Export:</span>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="bg-slate-800/50 border border-slate-600 rounded px-2 py-1 text-xs text-slate-200"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="keepass">KeePass XML</option>
          </select>
          <button
            onClick={() => exportData(exportFormat)}
            disabled={loading || vaultItems.length === 0}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-3 py-1 rounded text-xs text-white transition-colors"
          >
            {loading ? 'Exporting...' : 'Export'}
          </button>
        </div>

        {/* Import Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm text-slate-200 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>
      </div>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a]/90 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-200 flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Import Vault Data</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Import Format</label>
                <div className="flex space-x-4">
                  {['json', 'csv', 'keepass'].map(format => (
                    <label key={format} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="importFormat"
                        value={format}
                        checked={importFormat === format}
                        onChange={(e) => setImportFormat(e.target.value)}
                        className="text-cyan-600 bg-slate-700 border-slate-600"
                      />
                      <span className="text-sm text-slate-300 capitalize">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Upload File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={importFormat === 'json' ? '.json' : importFormat === 'csv' ? '.csv' : '.xml'}
                  onChange={handleFileUpload}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                />
              </div>

              {/* Or paste data */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Or paste data directly</label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder={`Paste your ${importFormat.toUpperCase()} data here...`}
                  rows={8}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono text-xs"
                />
              </div>

              {/* Import Preview */}
              {importResults && (
                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <div className="flex items-center space-x-2 mb-2">
                    {importResults.error ? (
                      <>
                        <X className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-medium">Import Error</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">Import Preview</span>
                      </>
                    )}
                  </div>

                  {importResults.error ? (
                    <p className="text-red-400 text-sm">{importResults.error}</p>
                  ) : (
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>Total items: {importResults.total}</p>
                      <p>Valid items: {importResults.valid}</p>
                      <p>Invalid items: {importResults.invalid}</p>

                      {importResults.items.length > 0 && (
                        <div className="mt-3">
                          <p className="text-slate-400 mb-2">First few items:</p>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {importResults.items.slice(0, 5).map((item, index) => (
                              <div key={index} className="flex justify-between items-center py-1 px-2 bg-slate-700/30 rounded">
                                <span className="font-medium">{item.title}</span>
                                <span className="text-xs text-slate-400">{item.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700/30">
                <button
                  onClick={() => {
                    setImportData('')
                    setImportResults(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={importDataNow}
                  disabled={loading || !importData.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                >
                  {loading ? 'Processing...' : 'Preview Import'}
                </button>
                {importResults && !importResults.error && importResults.valid > 0 && (
                  <button
                    onClick={confirmImport}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                  >
                    Confirm Import ({importResults.valid} items)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VaultImportExport
