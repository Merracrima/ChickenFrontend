import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigationmenu} from './Components/Navigationmenu';
import {Kalender} from "./Components/Kalender";
import {Home} from "./Components/Home";
import {MeineHuehner} from "./Components/MeineHuehner";
import keycloak from "./Helpers/Keycloak";
import PrivateRoute from "./Helpers/PrivateRoute";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import useLocalStorage from 'use-local-storage'

function App() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? 'rgba(37, 37, 37)' : 'rgba(255, 187, 44, 0.5)';
        document.body.style.color = theme === 'dark' ? 'white' : 'black';
    }, [theme]);
    const switchThemes = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    }
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <div className="content" data-theme={theme}>
                <Navigationmenu/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path="/kalender" element={
                            <PrivateRoute><Kalender/> </PrivateRoute>}/>
                        <Route path={"/meineHuehner"} element={
                            <PrivateRoute><MeineHuehner/></PrivateRoute>
                        } />
                        <Route path="/einstellungen" element={
                        <PrivateRoute><div className={"content"}>
                            <h1>Einstellungen</h1>
                            <select value={theme} onChange={event =>setTheme(event.target.value)}>
                                <option value={"light"}>Hell</option>
                                <option value={"dark"}>Dunkel</option>
                            </select>
                        </div> </PrivateRoute>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ReactKeycloakProvider>
    );
}

export default App;
