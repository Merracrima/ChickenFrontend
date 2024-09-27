import {useKeycloak} from "@react-keycloak/web";
import React, {useEffect, useState} from "react";
import warning from "../icons/red-circle.svg";
import close from "../icons/close.svg";
import calendar from "../icons/calendar.svg";
import plus from "../icons/plus.svg";
export function Home(){
    const {keycloak} = useKeycloak();
    const [username, setUsername] =useState("");


        if (keycloak.authenticated) {
            keycloak.loadUserProfile().then(userInfo => {
              if(!!userInfo.attributes && !!userInfo.attributes.name) setUsername(userInfo.attributes.name +"");
            });
        }

  return (
    <div className={"content"}>
        {keycloak.authenticated ? (
            <>
                <h1>Herzlich Willkommen, {username}!
                    <label className="right"><input type="image" src={plus} title="Eier hinzufügen"
                                                    alt="Eier hinzufügen"/></label></h1>
                <br/> <br/>
                <div className={"warning"}>Keine Benachrichtigungen vorhanden.</div>
                <div className={"warning"}>
                    <label><input type={"image"} src={close} alt={"schließen"} title={"Schließen"}/></label>
                    <span>Eierbestellung!</span>
                <br/>
                    Aufgegeben am: 12.12.2023
                    <br/>
                    Kunde: Theodorus
                </div>
            <div className={"presentationgrid"}>
                    <div>
                        <h1>Anstehende Ereignisse</h1>
                        Es stehen keine Ereignisse in den nächsten 20 Tagen an.
                    </div>
                <div><h1>Unbeantwortete Kaufanträge</h1>
                    Es liegen keine unbeantworteten Kaufanträge vor.</div>
                <div>
         <h1>Meine Hühner</h1></div>
                <div>
               <h1>Mitglieder meiner Ställe</h1>
                    <b>Farm 1:</b>
                    <ul>
                        <li>Mitglied Theodorus</li>
                        <li>Mitglied Zwackelmännchen</li>
                    </ul>
                    <div className={"farmListElement"}>
                    <b>Farm 2:</b>
                    <ul>
                        <li>Mitglied Till</li>
                        <li>Mitglied Esel</li>
                    </ul>
                    </div>
                </div>
            </div>
            </>) : (
            <>
                <h1>Neu hier?</h1>
                <p>Diese Seite bietet dir Überblick über deine Hühner, deine Farmen, deine Mitglieder,
            deine Ver- und Einkäufe, sowie vieles mehr. <br/>
            Das beste am Ganzen: Es ist kostenlos! </p>
                <p> Hier geht es ganz einfach und schnell zum Erstellen deines Accounts! <br/>
                Wenn du schon ein Google-Konto o.ä. hast, gehts direkt zum Login :)</p>
            </>
        )}

    </div>
);
}