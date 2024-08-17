import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Create from './Pages/Create';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/Login';
import SignupForm from './Pages/SignUp';
import { useUserContext } from './Hook/useUserContext.jsx';
function App() {
const {status} = useUserContext()

  return   (
    <BrowserRouter>
    <Routes>
      <>
      <Route path="/" element={<Navbar/>}>
        <Route path="/" element={ status ? <Home /> : <Navigate to="/Login"/> }/>
        <Route path="/create" element={ status ? <Create />: <Navigate to="/Login"/>} />
        <Route path="/Login" element={ status ? <Navigate to="/"/> : <LoginPage/> } />
        <Route path="/SignUp" element={ status ? <Navigate to="/"/> : <SignupForm/> } />
      </Route>
      </>
    </Routes>
 
  </BrowserRouter>
  )
}

export default App
