import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes,Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Dashboard from "../Dashboard";
import PageNotFound from "../PageNotFound";
import GoogleLogin from "../GoogleLogin";
import { useState } from "react";
import RefreshHandler from "../RefreshHandler";
import Orders from "../../pages/Orders";
import Customers from "../../pages/Customers";
import SegmentRule from "../../pages/SegmentRule";

import Campaign from "../../pages/Campaign";
import CreateCampaigns from "../../pages/CreateCampaings";


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

        <Route path="/orders" element={<Orders/>}/>

        <Route path="/customers" element={<Customers/>}/>
         
         <Route path ="segments" element={<SegmentRule/>}/>

         <Route path = "campaigns-history" element={<Campaign/>}/>

        <Route path = "create-campaigns" element={<CreateCampaigns/>}/>

        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>

    </>
}

export default Routing;