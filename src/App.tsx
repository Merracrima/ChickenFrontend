import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigationmenu} from './Components/Navigationmenu';
import {Kalender} from "./Components/Kalender";
import PrivateRoute from "./Helpers/PrivateRoute";

function App() {
    return (
        <div className="content">
            <Navigationmenu/>
            <BrowserRouter>
                <Routes>
                    <Route path="/kalender" element={
                        <PrivateRoute><Kalender/> </PrivateRoute>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
