import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes,Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Dashboard from "../Dashboard";
import PageNotFound from "../PageNotFound";
import GoogleLogin from "../GoogleLogin";
import { useState } from "react";
import RefreshHandler from "../RefreshHandler";

function Routing(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}

    return <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
        
        <Route path="/login" element={
          <GoogleOAuthProvider clientId="538376989914-jsgtqa5t8maqes3gbok12ri0lsmvis1o.apps.googleusercontent.com">
            <GoogleLogin/>
          </GoogleOAuthProvider>
          }></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
            path="/dashboard"
            element={
                <PrivateRoute element={<Dashboard/>}>
                    {/* <Dashboard /> */}
                </PrivateRoute>
            }
        />
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>

    </>
}

export default Routing;