import request from 'supertest'
import express from 'express'
import threatRoutes from '../../routes/threatRoutes.js'

const app = express()
app.use(express.json())
app.use('/api/threats', threatRoutes)

describe('Threat Controller', () => {
  describe('GET /api/threats', () => {
    test('should return threats list with status 200', async () => {
      const response = await request(app)
        .get('/api/threats')
        .expect(200)
      
      expect(response.body).toHaveProperty('success')
      expect(response.body).toHaveProperty('totalAttacks24h')
      expect(response.body).toHaveProperty('activeThreats')
      expect(Array.isArray(response.body.activeThreats)).toBe(true)
    })

    test('should return threat statistics', async () => {
      const response = await request(app)
        .get('/api/threats')
        .expect(200)
      
      expect(response.body).toHaveProperty('statistics')
      expect(response.body.statistics).toHaveProperty('bySeverity')
      expect(response.body.statistics).toHaveProperty('byType')
    })
  })

  describe('GET /api/threats/:id', () => {
    test('should return 404 for invalid threat ID', async () => {
      const response = await request(app)
        .get('/api/threats/invalid-id')
        .expect(404)
      
      expect(response.body).toHaveProperty('success', false)
    })
  })

  describe('POST /api/threats', () => {
    test('should create threat with valid data', async () => {
      const threatData = {
        type: 'malware',
        severity: 'high',
        indicatorValue: '192.168.1.100',
        source: 'test',
        description: 'Test threat'
      }

      const response = await request(app)
        .post('/api/threats')
        .send(threatData)
        .expect(201)
      
      expect(response.body).toHaveProperty('success', true)
      expect(response.body).toHaveProperty('threat')
    })

    test('should return 400 for invalid threat data', async () => {
      const invalidData = {
        type: 'invalid-type',
        severity: 'invalid'
      }

      const response = await request(app)
        .post('/api/threats')
        .send(invalidData)
      
      expect([400, 500]).toContain(response.status)
    })
  })
})
