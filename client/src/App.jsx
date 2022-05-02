import React, { useRef, useEffect } from "react";
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
import { SocketContext } from "./context"


let SERVER_URL = "ws://localhost:3001";

export const App = () => {
  const user = useSelector((state) => state.user);
  const userIsLoged = user.loged
  const user_id = user.profile_id

  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket(SERVER_URL)

    socket.current.onopen = () => {
        const message = {
            type: 'zero',
            event: 'connection',
            user_id
        }
        socket.current.send(JSON.stringify(message))
    }
    socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message)
    }
    socket.current.onclose= () => {
    }
    socket.current.onerror = () => {
    }

    return () => {
        socket.current.send(JSON.stringify({
            type: 'zero',
            event: 'disconnect'
        }));
        
        socket.current.close()
        socket.current = null;
    }
  }, [user_id])

  const sendMessage = async (message) => {
    socket.current.send(JSON.stringify(message));
  }

  return (
    <SocketContext.Provider value={{
      socket, sendMessage
    }}>
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
    </SocketContext.Provider>
  );
}
