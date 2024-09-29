import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Stuido from './pages/stuido.jsx'
import Academy from './pages/academy.jsx'
import Squad from './pages/squad.jsx'
import LoginSection from './pages/login.jsx'
import Register from './pages/register.jsx'
import AcademyUser from './pages/academyUser.jsx'
import DetailPackage from './pages/detailPackage.jsx'
import AcademyLevel from './pages/academyLevel.jsx'
import AcademyCourse from './pages/academyCourse.jsx'
import HomeSection from './pages/AdminStudio/HomeSection.jsx'
import Pesanan from './pages/AdminStudio/pesanan.jsx'
import Promo from './pages/AdminStudio/promo.jsx'

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
  {
    path: '/loginsection',
    element: <LoginSection />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/academyuser',
    element: <AcademyUser />,
  },
  {
    path: '/detailpackage/:id',
    element: <DetailPackage />,
  },
  {
    path: '/academylevel/:id',
    element: <AcademyLevel />,
  },
  {
    path: '/academycourse/:id_level/:id_paket',
    element: <AcademyCourse />,
  },
  {
    path: '/homeadminstudio',
    element: <HomeSection />,
  },
  {
    path: '/pesanan',
    element: <Pesanan />,
  },
  {
    path: '/promo',
    element: <Promo />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
