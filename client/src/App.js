import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './routes/HomePage'
import { Header } from './components/Header/index'
import { PrivateRoute } from "./hocks/PrivateRoute"
import { useSelector } from 'react-redux'
import { LoginPage } from "./routes/LoginPage"
import { SignUpPage } from "./routes/SignUpPage"
import { ProfilePage } from "./routes/ProfilePage"
import Axios from 'axios'

export const App = () => {
  const userIsLoged = useSelector((state) => state.user.loged)

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        
        <Route path="/signup" element={<SignUpPage />} />
        <Route  path="/profile" element={<ProfilePage/>} />
        <Route path="/*" element={
          <PrivateRoute authed={userIsLoged}>
            <HomePage />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}
