import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigationmenu} from './Components/Navigationmenu';
import {Kalender} from "./Components/Kalender";
import keycloak from "./Helpers/Keycloak";
import PrivateRoute from "./Helpers/PrivateRoute";
import {ReactKeycloakProvider} from "@react-keycloak/web";

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <div className="content">
                <Navigationmenu/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/kalender" element={
                            <PrivateRoute><Kalender/> </PrivateRoute>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ReactKeycloakProvider>
    );
}

export default App;
