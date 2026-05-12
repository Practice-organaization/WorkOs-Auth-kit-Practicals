//1

// What is this file?
// Think of this file as the memory of your app. 
// It remembers who is logged in. 
// Every page in your app can ask this file "hey who is logged in right now?" and it will answer.
// Without this file, when you go from the login page to the dashboard page, the app forgets who you are.
//  This file prevents that.


// const [user, setUser] - stores who is logged in. Starts as null meaning nobody
// const [token, setToken] - stores the proof of login that WorkOS gives us
// login function - sends user to WorkOS login page
// logout function - clears the user and token and sends back to home page
// AuthContext.Provider - wraps around all your pages so every page can access the user info

import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const login = async () => {
    const res = await axios.get('http://localhost:4000/auth/login')
    window.location.href = res.data.url
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}