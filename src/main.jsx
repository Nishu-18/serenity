import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/costum/Header'
import Home from './route-pages/Home'
import Chatbot from './route-pages/Chatbot'
import Muse from './route-pages/Muse'
import Echo from './route-pages/Echo'
import Sage from './route-pages/Sage'
import SearchCounselor from './route-pages/SearchCounselor'
import SearchMentor from './components/ui/SearchMentor'
import Archive from './components/ui/Archive'
import Dashboard from './database/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Home />
    </>
  },
  {
    path: '/chatbot',
    element: <>
      <Header />
      <Chatbot />
    </>
  },
  {
    path: '/chatbot/echo',
    element: <>
      <Header />
      <Echo />
    </>
  },
  {
    path: '/chatbot/sage',
    element: <>
      <Header />
      <Sage />
    </>
  },
  {
    path: '/chatbot/muse',
    element: <>
      <Header />
      <Muse />
    </>
  },
  {
    path: '/counselor-chat',
    element: <>
      <Header />
      <SearchCounselor />
    </>
  },
  {
    path: '/mentor-chat',
    element: <>
      <Header />
      <SearchMentor />
    </>
  },
  {
    path: '/archives',
    element: <>
      <Header />
      <Archive />
    </>
  },
  {
    path: '/dashboard',
    element: <>
      <Header />
      <Dashboard />
    </>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
