import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
export function Home(){
    const {keycloak} = useKeycloak();
    const [username, setUsername] =useState("");

    useEffect(() => {
        if (keycloak.authenticated) {
            keycloak.loadUserInfo().then(userInfo => {
              //  setUsername(userInfo.preferred_username); // Adjust the key based on the actual user info structure
            });
        }
    }, [keycloak]);
  return (
    <div className={"content"}>
        {keycloak.authenticated ? <h1>Herzlich Willkommen, {username}</h1> : <h1>Home</h1>}

        <table>
            <tbody>
            <tr>
                <td>Test
                    <div className={"grid"}><h1>Anmeldungen</h1></div>
                </td>
                <td>Test</td>
            </tr>
            <tr>
                <td>Test</td>
                <td>Test</td>
            </tr>
            </tbody>
        </table>



    </div>
);
}