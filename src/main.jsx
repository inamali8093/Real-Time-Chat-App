import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import ChatRoom from './components/ChatRoom.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'



const router = createBrowserRouter([
 {
  path: '/login',
  element: (
    <ProtectedRoute authentication={false}>
      <Login />
    </ProtectedRoute>
  )
 },
 {
  path: 'signup',
  element: (
    <ProtectedRoute authentication={false}>
      <Signup />
    </ProtectedRoute>
  )
 },
 {
  path: '/',
  element: (
    <ProtectedRoute authentication>
      <ChatRoom />
    </ProtectedRoute>
  )
 }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
