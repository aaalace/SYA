import React from "react"
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './routes/HomePage'
import { Header } from './components/Header/index'
import { PrivateRoute } from "./hocks/PrivateRoute";
import { useSelector } from 'react-redux';
import { LoginPage } from "./routes/LoginPage";

export const App = () => {
  const userIsLoged = useSelector((state) => state.user.loged)
  
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/*" element={
          <PrivateRoute authed={userIsLoged}>
            <HomePage />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}
