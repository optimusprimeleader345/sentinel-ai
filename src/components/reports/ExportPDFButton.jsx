import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Loader2 } from 'lucide-react'
import jsPDF from 'jspdf'

const ExportPDFButton = ({
  auditLogs,
  filters,
  userRole = 'user',
  userName = 'User',
  onExport
}) => {
  const [isExporting, setIsExporting] = useState(false)

  // Filter logs based on current filters
  const getFilteredLogs = () => {
    let filtered = [...auditLogs]

    if (filters.startDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) >= new Date(filters.startDate)
      )
    }

    if (filters.endDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) <= new Date(filters.endDate + 'T23:59:59')
      )
    }

    if (filters.severity !== 'all') {
      filtered = filtered.filter(log => log.severity === filters.severity)
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(log => log.type === filters.type)
    }

    if (filters.outcome !== 'all') {
      filtered = filtered.filter(log => log.outcome === filters.outcome)
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  // Generate professional PDF report
  const generatePDF = async () => {
    setIsExporting(true)

    try {
      const filteredLogs = getFilteredLogs()
      const doc = new jsPDF()

      // Colors
      const primaryColor = [59, 130, 246] // Blue
      const secondaryColor = [16, 185, 129] // Green
      const dangerColor = [239, 68, 68] // Red
      const warningColor = [245, 158, 11] // Orange

      let yPosition = 20

      // Helper functions
      const addHeader = (text, size = 16) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(size)
        doc.text(text, 20, yPosition)
        yPosition += size / 2 + 5
      }

      const addSubHeader = (text, size = 12) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(size)
        doc.text(text, 20, yPosition)
        yPosition += size / 2 + 3
      }

      const addText = (text, size = 10) => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(size)
        const lines = doc.splitTextToSize(text, 170)
        doc.text(lines, 20, yPosition)
        yPosition += (lines.length * size / 2) + 3
      }

      const addLine = () => {
        doc.setDrawColor(200, 200, 200)
        doc.line(20, yPosition, 190, yPosition)
        yPosition += 10
      }

      const checkPageBreak = (neededSpace = 30) => {
        if (yPosition > 270 - neededSpace) {
          doc.addPage()
          yPosition = 20
          return true
        }
        return false
      }

      // COVER PAGE
      addHeader('SentinelAI', 24)
      addSubHeader('Security Compliance & Audit Report', 18)

      yPosition += 20
      addSubHeader('Report Details:', 14)
      addText(`Generated: ${new Date().toLocaleString()}`)
      addText(`Prepared by: ${userName} (${userRole})`)
      addText(`Report Period: ${filters.startDate || 'All time'} to ${filters.endDate || 'Present'}`)
      addText(`Total Events: ${filteredLogs.length}`)

      yPosition += 30

      // EXECUTIVE SUMMARY
      if (checkPageBreak(60)) addHeader('Executive Summary', 16)
      else addHeader('Executive Summary', 16)

      const criticalCount = filteredLogs.filter(log => log.severity === 'CRITICAL').length
      const highCount = filteredLogs.filter(log => log.severity === 'HIGH').length
      const totalImpact = filteredLogs.reduce((sum, log) => sum + (log.scoreImpact || 0), 0)
      const securityScore = Math.max(0, 100 - Math.abs(totalImpact))

      addText(`This report covers ${filteredLogs.length} security audit events from ${filters.startDate || 'the beginning of records'} to ${filters.endDate || 'present'}.`)
      addText(`Critical Alerts: ${criticalCount}`)
      addText(`High Priority Events: ${highCount}`)
      addText(`Overall Security Score: ${securityScore}/100`)
      addText(`Key Risk Areas: ${criticalCount > 0 ? 'Critical threats detected' : highCount > 0 ? 'High-risk activities monitored' : 'Normal security posture maintained'}`)

      // INCIDENT BREAKDOWN
      if (checkPageBreak(80)) addHeader('Incident Breakdown', 14)
      else { yPosition += 20; addHeader('Incident Breakdown', 14) }

      // Severity distribution table
      const severityStats = {
        CRITICAL: filteredLogs.filter(log => log.severity === 'CRITICAL').length,
        HIGH: filteredLogs.filter(log => log.severity === 'HIGH').length,
        MEDIUM: filteredLogs.filter(log => log.severity === 'MEDIUM').length,
        LOW: filteredLogs.filter(log => log.severity === 'LOW').length
      }

      addSubHeader('Severity Distribution:', 12)
      yPosition += 5

      // Table header
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('Severity', 20, yPosition)
      doc.text('Count', 120, yPosition)
      doc.text('Percentage', 150, yPosition)
      yPosition += 8

      // Table rows
      Object.entries(severityStats).forEach(([severity, count]) => {
        const percentage = filteredLogs.length > 0 ? ((count / filteredLogs.length) * 100).toFixed(1) : '0'
        doc.setFont('helvetica', 'normal')
        doc.text(severity, 20, yPosition)
        doc.text(count.toString(), 120, yPosition)
        doc.text(`${percentage}%`, 150, yPosition)
        yPosition += 6
      })

      yPosition += 10

      // Recent incidents table
      addSubHeader('Recent Security Events:', 12)
      yPosition += 5

      // Table headers
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text('Time', 20, yPosition)
      doc.text('Type', 50, yPosition)
      doc.text('Severity', 80, yPosition)
      doc.text('Action', 110, yPosition)
      doc.text('Outcome', 150, yPosition)
      yPosition += 8

      // Table rows (show first 20)
      filteredLogs.slice(0, 20).forEach(log => {
        if (checkPageBreak(8)) {
          // Re-add headers on new page
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          doc.text('Time', 20, yPosition)
          doc.text('Type', 50, yPosition)
          doc.text('Severity', 80, yPosition)
          doc.text('Action', 110, yPosition)
          doc.text('Outcome', 150, yPosition)
          yPosition += 8
        }

        const timeStr = new Date(log.timestamp).toLocaleDateString()
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.text(timeStr, 20, yPosition)
        doc.text(log.type, 50, yPosition)
        doc.text(log.severity, 80, yPosition)
        doc.text(log.action.substring(0, 15), 110, yPosition)
        doc.text(log.outcome, 150, yPosition)
        yPosition += 6
      })

      // COMPLIANCE MAPPING
      if (checkPageBreak(60)) addHeader('Compliance Mapping', 14)
      else { yPosition += 20; addHeader('Compliance Mapping', 14) }

      addSubHeader('ISO 27001 Information Security Management:', 12)
      addText('✓ Incident logging and monitoring implemented')
      addText('✓ Access controls and authentication verified')
      addText('✓ Security event tracking and analysis active')
      addText('✓ Regular security assessments conducted')

      yPosition += 10
      addSubHeader('SOC 2 Trust Services Criteria:', 12)
      addText('✓ Security monitoring and alerting systems operational')
      addText('✓ Incident response procedures documented')
      addText('✓ Access logging and audit trails maintained')
      addText('✓ Security controls regularly tested')

      yPosition += 10
      addSubHeader('GDPR Data Protection:', 12)
      addText('✓ Personal data processing logged and monitored')
      addText('✓ Breach detection mechanisms active')
      addText('✓ Security incident response procedures in place')
      addText('✓ Data protection impact assessments conducted')

      // RECOMMENDATIONS
      if (checkPageBreak(50)) addHeader('Recommendations', 14)
      else { yPosition += 20; addHeader('Recommendations', 14) }

      const recommendations = []

      if (criticalCount > 0) {
        recommendations.push('1. Immediate attention required for critical security alerts - review and mitigate identified threats')
      }

      if (highCount > 5) {
        recommendations.push('2. Implement additional monitoring for high-risk activities and consider enhanced access controls')
      }

      if (securityScore < 80) {
        recommendations.push('3. Conduct comprehensive security assessment to identify areas for improvement')
      }

      recommendations.push('4. Regular security awareness training for all personnel')
      recommendations.push('5. Implement automated security policy enforcement where possible')

      recommendations.forEach(rec => {
        addText(rec, 10)
      })

      // FOOTER
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.text(`SentinelAI Security Report - Page ${i} of ${pageCount}`, 20, 285)
        doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 285)
      }

      // Generate filename
      const startDate = filters.startDate ? new Date(filters.startDate).toISOString().split('T')[0] : 'all'
      const endDate = filters.endDate ? new Date(filters.endDate).toISOString().split('T')[0] : 'present'
      const filename = `sentinelai-security-report-${startDate}-to-${endDate}.pdf`

      // Save the PDF
      doc.save(filename)

      if (onExport) {
        onExport(filename)
      }

    } catch (error) {
      console.error('Error generating PDF:', error)
      // Could show error toast here
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <motion.button
      onClick={generatePDF}
      disabled={isExporting}
      className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isExporting
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
      }`}
      whileHover={!isExporting ? { scale: 1.02 } : {}}
      whileTap={!isExporting ? { scale: 0.98 } : {}}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <FileText className="w-5 h-5" />
          <span>Export PDF Report</span>
          <Download className="w-4 h-4" />
        </>
      )}
    </motion.button>
  )
}

export default ExportPDFButton
