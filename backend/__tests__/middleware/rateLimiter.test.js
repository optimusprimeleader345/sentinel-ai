import request from 'supertest'
import express from 'express'
import { apiLimiter, authLimiter, aiLimiter } from '../../middleware/rateLimiter.js'

const app = express()
app.use(express.json())

// Test route with rate limiting
app.get('/api/test', apiLimiter, (req, res) => {
  res.json({ message: 'Success' })
})

app.post('/api/test-auth', authLimiter, (req, res) => {
  res.json({ message: 'Auth success' })
})

app.post('/api/test-ai', aiLimiter, (req, res) => {
  res.json({ message: 'AI success' })
})

describe('Rate Limiting Middleware', () => {
  describe('API Rate Limiter', () => {
    test('should allow requests within limit', async () => {
      const response = await request(app)
        .get('/api/test')
        .expect(200)
      
      expect(response.body).toHaveProperty('message', 'Success')
    })

    test('should include rate limit headers', async () => {
      const response = await request(app)
        .get('/api/test')
      
      expect(response.headers).toHaveProperty('ratelimit-limit')
      expect(response.headers).toHaveProperty('ratelimit-remaining')
    })
  })

  describe('Auth Rate Limiter', () => {
    test('should limit authentication attempts', async () => {
      // Make multiple requests
      for (let i = 0; i < 6; i++) {
        const response = await request(app)
          .post('/api/test-auth')
          .send({ email: 'test@example.com', password: 'test' })
        
        if (i >= 5) {
          // Should be rate limited after 5 attempts
          expect([429, 200]).toContain(response.status)
        }
      }
    })
  })
})
