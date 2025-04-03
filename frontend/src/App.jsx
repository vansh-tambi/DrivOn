import "./index.css"
import { Routes, Route } from "react-router-dom"
import React from 'react'
import Start from "./pages/Start"
import Home from './pages/Home';
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path="/"  element={<Start/>} />
        <Route path="/login"  element={<UserLogin/>} />
        <Route path="/signup"  element={<UserSignup/>} />
        <Route path="/captain-login"  element={<CaptainLogin/>} />
        <Route path="/captain-signup"  element={<CaptainSignup/>} />
        <Route path="riding" element={<Riding/>} />
        <Route path="captain-riding" element={<CaptainRiding/>} />
        <Route path="captain-home" element={
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
          } />
          
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>} />
          
          <Route path="/captain/logout" element={
            <CaptainProtectedWrapper>
              <CaptainLogout/>
            </CaptainProtectedWrapper>
          } />

        <Route path="/user/logout" element={
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>}/>

      </Routes>
    </div>
  )
}

export default App