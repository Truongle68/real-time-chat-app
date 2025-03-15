import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'

function App() {

  const {authUser} = useAuthStore()

  return (
    <div data-theme={'dark'}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={'/login'}/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={'/'}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={'/'}/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
