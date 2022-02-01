import React from "react"
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './routes/HomePage'
import { Header } from './components/Header/index'

export const App = () => {
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path={'/*'} element={<HomePage/>}/>
      </Routes>
    </div>
  );
}
