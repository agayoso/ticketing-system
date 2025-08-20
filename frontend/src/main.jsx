import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Login from './pages/Login.jsx'


const router = createBrowserRouter([
  { path: '/', element: <Events/> },
  { path: '/events/:id', element: <EventDetail/> },
  { path: '/login', element: <Login/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
