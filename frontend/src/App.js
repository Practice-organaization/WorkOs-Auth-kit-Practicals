//5

// What is this file?
// This is the main file that connects everything together. Think of it like a map of your app. It says:

// If you go to "/" show the Login page
// If you go to "/callback" show the Callback page
// If you go to "/dashboard" show the Dashboard page

// What this code does simply:

// BrowserRouter - enables navigation between pages
// Routes and Route - defines which page shows at which URL
// ProtectedRoute - this is the security guard. It checks if user is logged in. If yes show the dashboard. If no send them back to login page. This is how you protect pages in VMMS
// AuthProvider - wraps everything so all pages share the same user memory

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Callback from './pages/Callback'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
