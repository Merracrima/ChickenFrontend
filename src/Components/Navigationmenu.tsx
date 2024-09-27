import React from 'react';
import info from '../icons/info-circle.svg'
import calendar from '../icons/calendar.svg'
import sale from '../icons/money-square.svg'
import account from '../icons/profile-circle.svg'
import home from '../icons/home-simple.svg'
import chicken from '../icons/chicken.svg'
import {useKeycloak} from "@react-keycloak/web";

export function Navigationmenu() {
    let {keycloak} = useKeycloak();

    return (
        <table className="navigationMenu">
            <tbody>
            <tr>
                <td className="left"><input type="image" src={info} alt="Info" title={"Info"}/></td>
                <td className="banner">EIERAPP</td>
                <td>
                    <table className="right">
                        <tbody>
                        <tr>
                            <td><a href={"/"}><input type={"image"} src={home} alt={"Hauptseite"} title={"Startseite"}/></a></td>
                            {!!keycloak.authenticated && (<td>
                                <a href={"/kalender"}> <input type="image" src={calendar} alt="Kalender" title={"Kalender"}/></a>
                            </td>)}
                            {!!keycloak.authenticated && (<td>
                                <div className="dropdown">
                                <input type="image" src={sale} alt="Sale" title={"Finanzen"}/>
                                    <div className="dropdown-content">
                                        <a href="#">Kunden</a>
                                        <a href="/finanzstatistik">Einnahmen & Ausgaben</a>
                                        <a href="#">Eingegangene Bestellungen</a>
                                    </div>
                                </div>
                            </td>)}
                            {!!keycloak.authenticated && (<td>
                                <div className={"dropdown"}>
                                    <input type={"image"} src={chicken} alt={"Hühner"} title={"Hühner"}/>
                                    <div className={"dropdown-content"}>
                                        {!!keycloak.authenticated && <a href="/meineHuehner">Hühner</a>}
                                        <a href="/eierbestand">Eierbestand</a>
                                        <a href="#">Rassen & Eier-Eigenschaften</a>
                                        <a href={"/medikamente"}>Medikamente</a>
                                    </div>
                                </div>
                            </td>)}
                            <td>
                                <div className="dropdown">
                                    <input type="image" src={account} alt="Account" title={"Account"}/>
                                    <div className="dropdown-content">
                                        {!!keycloak.authenticated && (<a href="/einstellungen">
                                            Einstellungen</a>)}
                                        {!keycloak.authenticated && (
                                            <a type="button" className="text-blue-800" onClick={() => keycloak.login()}>Login</a>
                                        )}
                                        {!!keycloak.authenticated && (
                                            <a type="button" className="text-blue-800" onClick={() => keycloak.logout()}>Logout</a>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>

    );
}