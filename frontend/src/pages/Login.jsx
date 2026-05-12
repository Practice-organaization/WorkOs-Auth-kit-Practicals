//2

// What is this file?
// This is the first page your user sees.
//  It has one button. 
//  When they click it, it sends them to the WorkOS login page. That is it. Simple.

// useAuth - gets the login function from your AuthContext file we just made
// onClick={login} - when button is clicked it runs the login function
// That login function goes to WorkOS and shows the login page

import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()

  return (
    <div style={{ padding: 40 }}>
      <h1>VMMS Fleet System</h1>
      <p>Please log in to continue</p>
      <button onClick={login} style={{ padding: '10px 20px', fontSize: 16 }}>
        Log in with WorkOS
      </button>
    </div>
  )
}