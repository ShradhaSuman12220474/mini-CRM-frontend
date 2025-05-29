

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import GoogleLogin from "./components/GoogleLogin"
import Dashboard from "./components/Dashboard"
import PageNotFound from "./components/PageNotFound"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Navbar from "./components/Navbar"
import Routing from "./components/Routing/Routing"
function App() {
 

  return (
    <>
      
        <Routing/>
      
    </>
  )
}

export default App
