import request from 'supertest'
import express from 'express'
import { validateEmail, validatePassword, handleValidationErrors } from '../../middleware/validation.js'

const app = express()
app.use(express.json())

// Test route with validation
app.post('/api/test-email', validateEmail, (req, res) => {
  res.json({ success: true, email: req.body.email })
})

app.post('/api/test-password', validatePassword, (req, res) => {
  res.json({ success: true })
})

describe('Validation Middleware', () => {
  describe('Email Validation', () => {
    test('should accept valid email', async () => {
      const response = await request(app)
        .post('/api/test-email')
        .send({ email: 'test@example.com' })
        .expect(200)
      
      expect(response.body).toHaveProperty('success', true)
    })

    test('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/test-email')
        .send({ email: 'invalid-email' })
        .expect(400)
      
      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('errors')
    })
  })

  describe('Password Validation', () => {
    test('should accept valid password', async () => {
      const response = await request(app)
        .post('/api/test-password')
        .send({ password: 'TestPassword123' })
        .expect(200)
      
      expect(response.body).toHaveProperty('success', true)
    })

    test('should reject weak password', async () => {
      const response = await request(app)
        .post('/api/test-password')
        .send({ password: 'weak' })
        .expect(400)
      
      expect(response.body).toHaveProperty('success', false)
    })
  })
})
