const express = require('express')
const cors = require('cors')
const { WorkOS } = require('@workos-inc/node')
require('dotenv').config()

const app = express()
const workos = new WorkOS(process.env.WORKOS_API_KEY)

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.get('/auth/login', (req, res) => {
  const authUrl = workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID,
    redirectUri: 'http://localhost:3000/callback',
    provider: 'authkit',
  })
  res.json({ url: authUrl })
})

app.post('/auth/callback', async (req, res) => {
  const { code } = req.body
  try {
    const { user, accessToken } = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID,
      code,
    })
    res.json({ user, accessToken })
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' })
  }
})

app.get('/vehicles', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  res.json([
    { id: 1, reg: 'CAA-1234', type: 'Truck', status: 'Available' },
    { id: 2, reg: 'CAB-5678', type: 'Van', status: 'Under Maintenance' },
    { id: 3, reg: 'CAC-9012', type: 'Car', status: 'Available' },
  ])
})

app.listen(process.env.PORT, () => {
  console.log('Backend running on port 4000')
})