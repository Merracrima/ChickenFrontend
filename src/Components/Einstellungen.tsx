import React, {useEffect, useState} from "react";
const standard = [
    "cornsilk",
    "white",
"rgba(255, 187, 44, 0.5)",
"rgba(223,157,17,0.9)",
"rgba(223,100,17)",
"rgba(223,157,17, 0.5)",
"rgba(223,157,17, 0.8)",
"rgba(223,157,17, 0.6)", //
"0 2px 50px #9E9A9A", //Schatten
"white", //input Backgrund Farbe
"black", //helle/ Standardschriftfarbe
"dimgray", //dunkle Schriftfarbe
    "rgba(223,157,17,0.9)"]; //navbar
const dark =[""]
const light = [""]
export function Einstellungen() {
    const [selectValue, setSelectValue] = useState("standard");
    useEffect(() => {
        let mode: (string | null)[] = [];
        if(selectValue === "standard") mode = standard;
        else if(selectValue=== "dark") mode = dark;
        else if(selectValue=== "light") mode = light;

        document.documentElement.style.setProperty('--helleHauptfarbe', mode[0]);
        document.documentElement.style.setProperty('--hellerAkzent', mode[1]);
        document.documentElement.style.setProperty('--dunklerAkzent', mode[2]);
        document.documentElement.style.setProperty('--intensiverAkzent', mode[3]);
        document.documentElement.style.setProperty('--selectedFokus', mode[4]);
        document.documentElement.style.setProperty('--kalenderHintergrund', mode[5]);
        document.documentElement.style.setProperty('--kalenderToday', mode[6]);
        document.documentElement.style.setProperty('--kalenderSelected', mode[7]);
        document.documentElement.style.setProperty('--schatten', mode[8]);
        document.documentElement.style.setProperty('--inputColor', mode[9]);
        document.documentElement.style.setProperty('--helleSchriftfarbe', mode[10]);
        document.documentElement.style.setProperty('--dunkleSchriftFarbe', mode[11]);
        document.documentElement.style.setProperty('--navbar', mode[12]);
    }, [selectValue]);
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = event.target.value;
        if(value != null) setSelectValue(value);
    }
    return (
        <div className={"content"}>
            <h1>Einstellungen</h1>
            <select onChange={event =>onChange(event)}>
                <option value={"standard"}>standard</option>
                <option value={"dark"}>dark</option>
                <option value={"light"}>light</option>
            </select>
        </div>
    );
}