# WorkOS Basic Authentication - Practical 1

A simple full stack login system built with WorkOS AuthKit. This project demonstrates how to integrate WorkOS authentication into a React and Node.js Express application. Users can log in using their Google, Microsoft, GitHub, or Apple accounts through WorkOS and see a protected dashboard with vehicle data.

---

## What This Project Does

- Login page that redirects to WorkOS hosted login screen
- Supports Google, Microsoft, GitHub, and Apple login out of the box
- Callback handler that exchanges the WorkOS code for a user token
- Protected dashboard that only logged in users can access
- Displays a list of vehicles fetched from the backend
- Logout functionality that clears the session

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js with Express |
| Authentication | WorkOS AuthKit |
| HTTP requests | Axios |
| Routing | React Router DOM |

---

## Project Structure

```
vmms-practical/
  backend/
    index.js        - Express server with auth and vehicles endpoints
    .env            - Environment variables (not committed to git)
    package.json
  frontend/
    src/
      context/
        AuthContext.jsx   - Stores user and token in React state
      pages/
        Login.jsx         - Login button page
        Callback.jsx      - Handles WorkOS redirect and token
        Dashboard.jsx     - Protected page showing vehicles
      App.js              - Routes and protected route logic
    package.json
```

---

## Prerequisites

- Node.js installed on your machine
- A free WorkOS account at workos.com
- A WorkOS environment with a redirect URL configured

---

## WorkOS Setup

1. Go to workos.com and create a free account
2. Create a new environment
3. Go to API Keys on the left sidebar and copy your Secret Key and Client ID
4. Go to Redirects and add `http://localhost:3000/callback`

---

## How to Run

### 1. Clone the repo

```bash
git clone your-repo-url
cd vmms-practical
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
WORKOS_API_KEY=your_secret_key_here
WORKOS_CLIENT_ID=your_client_id_here
PORT=4000
```

Start the backend:

```bash
node index.js
```

You should see: `Backend running on port 4000`

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Browser opens automatically at `http://localhost:3000`

---

## How to See the Output

1. Open `http://localhost:3000` in your browser
2. You will see the VMMS Fleet System login page
3. Click **Log in with WorkOS**
4. You are taken to the WorkOS login screen - sign in with Google or any available option
5. After login you are redirected back to the dashboard automatically
6. Dashboard shows your email and a table of 3 vehicles
7. Click **Logout** to return to the login page

> To test the full login flow again, close the browser tab completely and open a fresh one at `http://localhost:3000`. This clears React state memory.

---

## How the Auth Flow Works

```
Click Login
    → React calls backend GET /auth/login
    → Backend generates WorkOS login URL
    → Browser redirects to WorkOS login page
    → User logs in with their account
    → WorkOS redirects back to /callback with a code
    → Callback sends code to backend POST /auth/callback
    → Backend exchanges code for user info and token
    → Token and user saved in AuthContext
    → User navigated to dashboard
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /auth/login | Returns WorkOS login URL |
| POST | /auth/callback | Exchanges code for user and token |
| GET | /vehicles | Returns vehicle list (requires token) |
