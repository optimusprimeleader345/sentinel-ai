import request from 'supertest'
import express from 'express'
import authRoutes from '../../routes/authRoutes.js'

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    test('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Test1234',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User'
        })
      
      expect([400, 422]).toContain(response.status)
    })

    test('should return 400 for weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'weak',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User'
        })
      
      expect([400, 422]).toContain(response.status)
    })

    test('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com'
        })
      
      expect([400, 422]).toContain(response.status)
    })
  })

  describe('POST /api/auth/login', () => {
    test('should return 400 for missing credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
      
      expect([400, 401]).toContain(response.status)
    })

    test('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPassword123'
        })
      
      expect([401, 404]).toContain(response.status)
    })
  })
})
