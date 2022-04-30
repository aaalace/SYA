import React from "react";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './routes/HomePage';
import { Header } from './components/Header/index';
import { PrivateRoute } from "./hocks/PrivateRoute";
import { useSelector } from 'react-redux';
import { LoginPage } from "./routes/LoginPage";
import { SignUpPage } from "./routes/SignUpPage";
import { ProfilePage } from "./routes/ProfilePage";
import { AllPostsPage } from "./routes/AllPostsPage";
import { ForumPage } from "./routes/Forum";
// import {SocketContext, socket} from './context/socket';

export const App = () => {
  const userIsLoged = useSelector((state) => state.user.loged)

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/all" element={
          <PrivateRoute authed={userIsLoged}>
            <AllPostsPage/>
          </PrivateRoute>
        } />
        <Route path="/forum/*" element={
          <PrivateRoute authed={userIsLoged}>
            <ForumPage/>
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile/*" element={
          <PrivateRoute authed={userIsLoged}>
            <ProfilePage/>
          </PrivateRoute>
        } />
        <Route path="/*" element={
          <HomePage />
        } />
      </Routes>
    </div>
  );
}
