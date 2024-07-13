import React from 'react';
import info from '../icons/info-circle.svg'
import calendar from '../icons/calendar.svg'
import sale from '../icons/money-square.svg'
import account from '../icons/profile-circle.svg'
import settings from '../icons/settings.svg'
export function Navigationmenu() {
    return (
        <table className="navigationMenu">
            <tbody>
        <tr>
            <td className="left"><input type="image" src={info} alt="Info" /></td>
            <td className="banner">EIERAPP</td>
            <td>
                <table className="right">
                    <tbody>
                    <tr>
                        <td>
                          <a href={"/kalender"}>  <input type="image" src={calendar} alt="Verlauf" /></a>
                        </td>
                        <td>
                            <div className="dropdown">
                                <input type="image" src={sale} alt="Sale" />
                                    <div className="dropdown-content">
                                        <a href="#">Kunden</a>
                                        <a href="#">Einnahmen</a>
                                        <a href="#">Ausgaben</a>
                                        <a href="#">Eingegangene Bestellungen</a>
                                    </div>
                            </div>
                        </td>
                        <td>
                            <div className="dropdown">
                                <input type="image" src={account} alt="Account"/>
                                <div className="dropdown-content">
                                    <a href="#">Profil</a>
                                    <a href="#">Hühner</a>
                                    <a href="#">Eierbestand</a>
                                    <a href="#">
                                            Einstellungen</a>
                                    <a href={"#"}>Abmelden</a>
                                    <a href={"#"}>Anmelden</a>
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