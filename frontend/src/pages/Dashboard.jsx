//4

// What is this file?
// This is the main page after login. It shows who is logged in and displays the list of vehicles coming from your backend. This is exactly what VMMS will look like — a protected page that only logged in users can see.

// What this code does simply:

// useAuth - gets the logged in user, their token, and logout function from AuthContext
// useEffect - when page loads, immediately calls your backend to get vehicles
// Authorization: Bearer token - sends the token with the request so backend knows you are logged in
// user?.email - shows the logged in user's email. The question mark means if user exists show email, if not show nothing
// vehicles.map - loops through all vehicles and makes a table row for each one
// logout button - clears everything and sends back to login page

import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/vehicles', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setVehicles(res.data))
  }, [token])

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>
      <h2>Vehicles</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Registration</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.reg}</td>
              <td>{v.type}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}