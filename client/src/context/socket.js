import React from "react";
import socketio from "socket.io-client";
let SERVER_URL = "http://localhost:3001";

export const socket = socketio.connect(SERVER_URL);
export const SocketContext = React.createContext();