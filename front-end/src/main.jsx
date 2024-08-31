import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Stuido from './pages/stuido.jsx'
import Academy from './pages/academy.jsx'
import Squad from './pages/squad.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/studio',
    element: <Stuido />,
  },
  {
    path: '/academy',
    element: <Academy />,
  },
  {
    path: '/squad',
    element: <Squad />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
