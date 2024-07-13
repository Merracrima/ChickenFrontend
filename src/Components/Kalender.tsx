import React, {useEffect, useRef, useState} from "react";
import leftArrow from "../icons/arrow-left-circle.svg";
import rightArrow from "../icons/arrow-right-circle.svg";
import today from "../icons/home-simple.svg";
import calendar from "../icons/calendar.svg";
import table from "../icons/table-rows.svg";
import plus from  "../icons/plus.svg";
import {Filtersuche} from "./Filtersuche";

const Monate = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export function Kalender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ansicht, setCurrentAnsicht] = useState(0); //0 ist Kalender, 1 ist Tabelle
    const Wochentage = ["So","Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    let currentAnsicht;

    const [dialogDate, setDialogDate] = useState(new Date());
    const dialogRef = useRef<HTMLDialogElement>(null);
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    let month = getDaysInMonth(currentDate);

    useEffect(() => {
        if (dialogRef.current) {
            toggleDialog();
        }
    }, [dialogDate]);

    function numberToDate(number: number) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), number);
    }
    function formatDateToISO(date: Date) {
        const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const adjustedDate = new Date(date.getTime() - userTimezoneOffset);
        return adjustedDate.toISOString().substring(0, 10);
    }
    function toggleDialog(){
        if(!dialogRef.current){
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    }
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setDialogDate(newDate);
        toggleDialog();
    };

    let list = [];
    for (let i = 1; i < month + 1; i++) {
        let date = numberToDate(i);
        let compDate = new Date();
        if(date.getMonth() === compDate.getMonth() && date.getDate()=== compDate.getDate() && date.getFullYear()=== compDate.getFullYear()){
            list.push(<div className="calender-day-today" key={i} data-key={i} onClick={()=> {setDialogDate(numberToDate(i))}}>Heute <br/> {Wochentage[date.getDay()]}, {i}</div>)
        }
        else{
            list.push(<div className="calender-day" key={i} data-key={i} onClick={()=>setDialogDate(numberToDate(i))}>{Wochentage[date.getDay()]}, {i} </div>)
        }
    }

    if(ansicht === 0){
        currentAnsicht = (<>
            <div className="calendar-container">{list}</div>
            <dialog ref={dialogRef}>
                <form className="content">
                    <h1>Ereignis hinzufügen</h1>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor="event">Ereignis:</label></td>
                            <td><select id="event">
                                <option value="impfung">Impfung</option>
                                <option value="kauf">Hühnerkauf</option>
                                <option value="eierverkauf">Eierverkauf</option>
                                <option value="geburtstag">Hühnergeburtstag</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="date">Datum:</label></td>
                            <td><input id="date" type="date" value={formatDateToISO(dialogDate)}
                                       onChange={handleDateChange}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="cost">Kosten:</label></td>
                            <td><input id="cost" type="text"/></td>
                        </tr>
                        <tr>
                            <td>
                                <button>Speichern</button>
                            </td>
                            <td>
                                <button onClick={toggleDialog}>Abbrechen</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </dialog>
        </>)
        ;
    }
    if (ansicht === 1) {
        currentAnsicht = (<>
            <div className="calendar-container">{list}</div>
            <dialog ref={dialogRef}>
                <form className="content">
                    <h1>Ereignis hinzufügen</h1>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor="event">Ereignis:</label></td>
                            <td><select id="event">
                                <option value="impfung">Impfung</option>
                                <option value="kauf">Hühnerkauf</option>
                                <option value="eierverkauf">Eierverkauf</option>
                                <option value="geburtstag">Hühnergeburtstag</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="date">Datum:</label></td>
                            <td><input id="date" type="date" value={formatDateToISO(dialogDate)}
                                       onChange={handleDateChange}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="cost">Kosten:</label></td>
                            <td><input id="cost" type="text"/></td>
                        </tr>
                        <tr>
                            <td>
                                <button>Speichern</button>
                            </td>
                            <td>
                                <button onClick={toggleDialog}>Abbrechen</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </dialog>
        </>)
        ;
    }

    return (
        <>
            <div className="content">
            <h1>Kalender
                <label className="right"><input type="image" src={calendar} title="Kalenderansicht"
                                                alt="Kalenderansicht" onClick={calendarAnsicht}/></label>
                <label className="right"><input type="image" src={table} title="Tabellenansicht" alt="Tabellenansicht"
                                                onClick={tableAnsicht}/></label>
            </h1>
            <Filtersuche filter={["filter1", "filter2"]}/>
            </div>
            <div className="content">
            <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "5px",
            }}>
                <div  style={{flexGrow: 0}}>
                    <label><input type="image" src={today} alt="Today" onClick={thisMonth} title="Heute"/></label>
                </div>
                <div style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <label ><input type="image" src={leftArrow} alt="Previous" onClick={previousMonth} title="Voriger Monat"/></label>
                    <div style={{
                        color:"rgb(223,157,17)",
                        textAlign: "center",
                        minWidth: "20vw", // Stellen Sie sicher, dass dieser Container eine Mindestbreite hat, um den Inhalt zentriert zu halten
                    }}><b>{Monate[currentDate.getMonth()]} {currentDate.getFullYear()}</b></div>
                    <label className="center"><input type="image" src={rightArrow} alt="Next" onClick={nextMonth} title="Nächster Monat"/></label>
                </div>
                <div style={{flexGrow: 0}}>
                    <label><input type="image" src={plus} alt={"Neues Ereignis"} title={"Neues Ereignis"} onClick={()=>setDialogDate(new Date())}/></label>
                </div>
            </div>
            {currentAnsicht}
        </div>
        </>
    )

    function tableAnsicht() {
        setCurrentAnsicht(1);
    }

    function calendarAnsicht() {
        setCurrentAnsicht(0);
    }

    function thisMonth() {
        setCurrentDate(new Date());
    }

    function nextMonth() {
        let newDate = new Date(currentDate.valueOf());
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    function previousMonth() {
        let newDate = new Date(currentDate.valueOf());
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }
}