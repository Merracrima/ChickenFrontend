import React, {useEffect, useRef, useState} from "react";
import leftArrow from "../icons/arrow-left-circle.svg";
import rightArrow from "../icons/arrow-right-circle.svg";
import today from "../icons/home-simple.svg";
import calendar from "../icons/calendar.svg";
import table from "../icons/table-rows.svg";
import plus from  "../icons/plus.svg";
import {Filtersuche} from "./Filtersuche";
import foo from "../connection/Connector";
import {useKeycloak} from "@react-keycloak/web";

const Monate = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export function Kalender() {
    //Variablen
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ansicht, setCurrentAnsicht] = useState(0); //0 ist Kalender, 1 ist Tabelle
    const [prevState, setPrevState] = useState({ currentDate: new Date(), ansicht: 0 });
    const Wochentage = ["So","Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const [currentEvent, setCurrentEvent] = useState({date: new Date(), type: "", cost: 0});
    const [dialogDate, setDialogDate] = useState(new Date());
    const dialogRef = useRef<HTMLDialogElement>(null);
    const {keycloak} = useKeycloak();
    let currentAnsicht;

    //Connection
    fetch("https://chicken.onlyjosh.de/event_type", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${keycloak.token}`,
            "Farmname": "Mark1"
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    });


    //Dialog
    const clickedEvent = (i: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let date = numberToDate(i);
        let ev = event.currentTarget.getAttribute("data-type");
        /*getEvent von diesem Tag zu diesem Event, damit dieses bearbeitet werden kann, nach allem event nullen*/
        if(ev) setCurrentEvent({date: date, type: ev, cost: 0});
        console.log(ev);
    }
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setDialogDate(newDate);
        toggleDialog();
    };
    useEffect(() => {
        toggleDialog();
        toggleDialog();
    }, [currentEvent]);

    useEffect(() => {
        if (dialogRef.current) {
            toggleDialog();
        }
    }, [dialogDate]);
    useEffect(() => {
        if (dialogRef.current) {
            toggleDialog();
        }
    }, []);

    function toggleDialog(){
        if(!dialogRef.current){
            return;
        }
        if(dialogRef.current.hasAttribute("open")) {
            dialogRef.current.close();
            restoreState();
        } else {
            saveState();
            dialogRef.current.showModal();
        }
    }
    function saveState() {
        setPrevState({ currentDate, ansicht });
    }

    function restoreState() {
        setCurrentDate(prevState.currentDate);
        setCurrentAnsicht(prevState.ansicht);
    }

    //Hilfsfunktionen
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    let month = getDaysInMonth(currentDate);
    function numberToDate(number: number) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), number);
    }
    function formatDateToISO(date: Date) {
        const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const adjustedDate = new Date(date.getTime() - userTimezoneOffset);
        return adjustedDate.toISOString().substring(0, 10);
    }



    //Kalendertage
    let list = [];
    if(ansicht===0){
    for (let i = 1; i < month + 1; i++) {
        let date = numberToDate(i);
        let compDate = new Date();
        if(date.getMonth() === compDate.getMonth() && date.getDate()=== compDate.getDate() && date.getFullYear()=== compDate.getFullYear()){
            list.push(<div className="calender-day-today" key={i} data-key={i} onClick={()=> {setDialogDate(numberToDate(i))}}>Heute <br/> {Wochentage[date.getDay()]}, {i}</div>)
        } else{
            list.push(<div className="calender-day" key={i} data-key={i} onClick={()=>setDialogDate(numberToDate(i))}>
                {Wochentage[date.getDay()]}, {i}
                <div className={"event"} data-type={"Hühnerkauf"} onClick={(event)=>{clickedEvent(i, event)}}>Hühnerkauf</div></div>)
        }}}if(ansicht===1){
        for (let i = 1; i < month + 1; i++) {
            let date = numberToDate(i);
            let compDate = new Date();
            if(date.getMonth() === compDate.getMonth() && date.getDate()=== compDate.getDate() && date.getFullYear()=== compDate.getFullYear()){
                list.push(<div className="table-day-today" data-key={i} onClick={()=>setDialogDate(numberToDate(i))}>{Wochentage[date.getDay()]}, {i}</div>);
            }else{
           /* if() events in day, show events like this*/
                list.push(<div className="table-day" data-key={i} onClick={()=>setDialogDate(numberToDate(i))}>{Wochentage[date.getDay()]}, {i}
                    <div className={"event"} onClick={(event) => {
                        clickedEvent(i, event)
                    }}>Hühnerkauf
                    </div>
                </div>)
        }}
    }

    let type = [];
    if (ansicht === 0) {
        type.push(<div className="calendar-container">{list}</div>)
    }if(ansicht===1){type.push(<div>{list}</div>)}

    currentAnsicht = (<>{type}</>);

    //Dialog drag
    let el=document.getElementById("dialog");
    if(el != null) dragElement(el);
    function dragElement(element: HTMLElement){
        var pos1, pos2, pos3: number, pos4 = 0;

        element.onmousedown = dragMouseDown;

    function dragMouseDown(e : MouseEvent){
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e : MouseEvent){
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
        }
    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }


    //Return (Leiste und Dialog)
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
            <div className="kalenderleiste" >
                <div  style={{flexGrow: 0}}>
                    <label><input type="image" src={today} alt="Today" onClick={thisMonth} title="Heute"/></label>
                </div>
                <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center",}}>
                    <label ><input type="image" src={leftArrow} alt="Previous" onClick={previousMonth} title="Voriger Monat"/></label>
                    <div style={{
                        textAlign: "center",
                        minWidth: "20vw",
                    }}><b>{Monate[currentDate.getMonth()]} {currentDate.getFullYear()}</b></div>
                    <label className="center"><input type="image" src={rightArrow} alt="Next" onClick={nextMonth} title="Nächster Monat"/></label>
                </div>
                <div style={{flexGrow: 0}}>
                    <label><input type="image" src={plus} alt={"Neues Ereignis"} title={"Neues Ereignis"} onClick={()=>setDialogDate(new Date())}/></label>
                </div>
            </div>

                <dialog ref={dialogRef} id={"dialog"}>
                    <div id={"dialogheader"} />
                    <form className="content">
                        {currentEvent.type == ""? (<h1>Ereignis hinzufügen</h1>) :(<h1>{currentEvent.type} bearbeiten</h1>)}
                        <table>
                            <tbody>
                            <tr>
                                <td><label htmlFor="event">Ereignis:</label></td>
                                <td><select id="event" value={currentEvent.type}
                                            onChange={(e) => setCurrentEvent({...currentEvent, type: e.target.value})}>
                                    {}
                                    <option value="Impfung">Impfung</option>
                                    <option value="Hühnerkauf">Hühnerkauf</option>
                                    <option value="Eierverkauf">Eierverkauf</option>
                                    <option value="Hühnergeburtstag">Hühnergeburtstag</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="date">Datum:</label></td>
                                <td><input id="date" type="date" value={formatDateToISO(dialogDate)}
                                           onChange={handleDateChange}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="cost" >Kosten:</label></td>
                                <td><input id="cost" type="text" value={currentEvent.cost}/></td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={()=>{toggleDialog(); setCurrentEvent({date: new Date(), type: "", cost: 0})}}>Speichern</button>
                                </td>
                                <td>
                                    <button type="button" onClick={()=>{toggleDialog(); setCurrentEvent({date: new Date(), type: "", cost: 0})}}>Abbrechen</button>
                                </td>
                                {currentEvent.type != ""&& <td><button type={"button"} onClick={()=>{toggleDialog(); setCurrentEvent({date: new Date(), type: "", cost: 0})}}>Löschen</button> </td>}
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </dialog>
            {currentAnsicht}
        </div>
        </>
    )

    //Ansichten
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
