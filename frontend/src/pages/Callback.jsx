//3

// What is this file?
// Remember when the user logs in on the WorkOS page, WorkOS sends them back to your app. They land on this page first. This page is invisible to the user — they never actually see it. It just does one job silently in the background.
// That job is: take the code WorkOS sent back, send it to your backend, get the user info and token back, save them, then send the user to the dashboard.
// Think of it like a middleman that handles the handshake between WorkOS and your app.


// What this code does simply:

// code - WorkOS puts a secret code in the URL when it sends user back. This line grabs that code
// axios.post - sends that code to your backend
// setUser and setToken - saves the user info and token into your AuthContext memory
// navigate('/dashboard') - sends user to dashboard page once done
// The text "Logging you in please wait" is the only thing user sees for a split second

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'


export default function Callback() {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      axios.post('http://localhost:4000/auth/callback', { code })
        .then(res => {
          setUser(res.data.user)
          setToken(res.data.accessToken)
          navigate('/dashboard')
        })
    }
  }, [])

  return <p>Logging you in please wait...</p>
}