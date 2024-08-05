import React, {ReactElement, useEffect, useRef, useState} from "react";
import leftArrow from "../icons/arrow-left-circle.svg";
import rightArrow from "../icons/arrow-right-circle.svg";
import today from "../icons/home-simple.svg";
import calendar from "../icons/calendar.svg";
import table from "../icons/table-rows.svg";
import plus from "../icons/plus.svg";
import {Filtersuche} from "./Filtersuche";
import foo from "../connection/Connector";
import {useKeycloak} from "@react-keycloak/web";
const EventTypes = [
    {id:-1, name:"Sonstiges", content:(<></>)},
    {id:-2, name:"Impfung", content:(<><td><label htmlFor='impfstoff'>Impfstoff:</label></td><td><input type='text' id='impstoff'/></td>
            <tr><td><label  htmlFor={"betroffen"}>Geimpfte Hühner:</label> </td><td><textarea id={"betroffen"}/></td></tr></>)},
    {id:-3, name:"Hühnerkauf", content: (<></>)}
]
const Monate = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];
interface Event {
    chicken_Farm: Object;
    date: Date;
    type: EventType;
    cost: number;
    description: string;
    id: number;
}
interface EventType {
    chicken_Farm: Object;
    default_cost: number;
    description: string;
    id: number;
    name: string;
}
export function Kalender() {
    //Variablen
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ansicht, setCurrentAnsicht] = useState(0); //0 ist Kalender, 1 ist Tabelle
    const [prevState, setPrevState] = useState({currentDate: new Date(), ansicht: 0});
    const Wochentage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const [currentEvent, setCurrentEvent] = useState({date: new Date(), type: "", cost: 0, new: true});
    const [dialogDate, setDialogDate] = useState(new Date());
    const [monthEvents, setMonthEvents] = useState<Event[]>([]);
    const [options, setOptions] = useState<ReactElement[]>([]);

    const dialogRef = useRef<HTMLDialogElement>(null);
    const {keycloak} = useKeycloak();
    let currentAnsicht;

    //initalize Events
    function getMonthEvents() {
        foo("GET", "/event/" + formatDateToISO(currentDate).substring(0, 7), "", keycloak.token).then(value => {
            setMonthEvents(value);
            console.log(monthEvents);
            return value;
        });
    }

    useEffect(() => {
        getMonthEvents();
        getOptions();
    }, [currentDate]);

    //Dialog
    const clickedEvent = (i: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let date = numberToDate(i);
        let ev = event.currentTarget.getAttribute("data-type");
        /*getEvent von diesem Tag zu diesem Event, damit dieses bearbeitet werden kann, nach allem event nullen*/
        if (ev) setCurrentEvent({date: date, type: ev, cost: 0, new:false});
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

    function toggleDialog() {
        if (!dialogRef.current) {
            return;
        }
        if (dialogRef.current.hasAttribute("open")) {
            dialogRef.current.close();
            restoreState();
        } else {
            saveState();
            dialogRef.current.showModal();
        }
    }

    function saveState() {
        setPrevState({currentDate, ansicht});
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
    function getEvents(date: Date) {
        let events: Event[] = [];
        for (let event of monthEvents) {
            if (event.date.toString() === formatDateToISO(date)) {
                events.push(event);
            }
        }
        return events;
    }

    let list = [];
    if (ansicht === 0) {
        for (let i = 1; i < month + 1; i++) {
            let date = numberToDate(i);
            let compDate = new Date();
            if (date.getMonth() === compDate.getMonth() && date.getDate() === compDate.getDate() && date.getFullYear() === compDate.getFullYear()) {
                list.push(<div className="calender-day-today" key={i} data-key={i} onClick={() => {
                    setDialogDate(numberToDate(i))
                }}>Heute <br/> {Wochentage[date.getDay()]}, {i}</div>)
            } else {
                let eventsInDay= [];

                {for (let ev of getEvents(date)) {
                eventsInDay.push(<div className={"event"} data-type={ev.type.name} onClick={(event) => {
                    clickedEvent(i, event) //pass id
                }}>{ev.type.name}
                </div>)}}

                list.push(<div className="calender-day" key={i} data-key={i}
                               onClick={() => setDialogDate(numberToDate(i))}>
                    {Wochentage[date.getDay()]}, {i}
                    {eventsInDay}
                </div>)
            }
        }
    }
    if (ansicht === 1) {
        for (let i = 1; i < month + 1; i++) {
            let date = numberToDate(i);
            let compDate = new Date();
            if (date.getMonth() === compDate.getMonth() && date.getDate() === compDate.getDate() && date.getFullYear() === compDate.getFullYear()) {
                list.push(<div className="table-day-today" data-key={i}
                               onClick={() => setDialogDate(numberToDate(i))}>{Wochentage[date.getDay()]}, {i}</div>);
            } else {
                /* if() events in day, show events like this*/
                list.push(<div className="table-day" data-key={i}
                               onClick={() => setDialogDate(numberToDate(i))}>{Wochentage[date.getDay()]}, {i}
                    <div className={"event"} onClick={(event) => {
                        clickedEvent(i, event)
                    }}>Hühnerkauf
                    </div>
                </div>)
            }
        }
    }

    let type = [];
    if (ansicht === 0) {
        type.push(<div className="calendar-container">{list}</div>)
    }
    if (ansicht === 1) {
        type.push(<div>{list}</div>)
    }

    currentAnsicht = (<>{type}</>);

    //Event-types
    function getEventType(name:string){
        for(let i = 0; i<EventTypes.length; i++){
            if(EventTypes[i].name === name){
                return EventTypes[i];
            }
        }
        return null;
    }
    let eventType = getEventType(currentEvent.type);
    if(eventType === null) eventType = EventTypes[0];


    //Options
    function getOptions() {
        let opt: ReactElement[] = [];
        foo("GET", "/event_type", "", keycloak.token).then(value => {
            console.log(value);
            for (let evType of value) {
                opt.push(<option id={evType.id} value={evType.name}>{evType.name}</option>);
            }
        });
        for (let i = 0; i < EventTypes.length; i++) {
            opt.push(<option id={EventTypes[i].id.toString()} value={EventTypes[i].name}>{EventTypes[i].name}</option>)
        }
        setOptions(opt);
    }

    //Return (Leiste und Dialog)
    return (
        <>
            <div className="content">
                <h1>Kalender
                    <label className="right"><input type="image" src={calendar} title="Kalenderansicht"
                                                    alt="Kalenderansicht" onClick={calendarAnsicht}/></label>
                    <label className="right"><input type="image" src={table} title="Tabellenansicht"
                                                    alt="Tabellenansicht"
                                                    onClick={tableAnsicht}/></label>
                </h1>
                <Filtersuche filter={["filter1", "filter2"]}/>
            </div>
            <div className="content">
                <div className="kalenderleiste">
                    <div style={{flexGrow: 0}}>
                        <label><input type="image" src={today} alt="Today" onClick={thisMonth} title="Heute"/></label>
                    </div>
                    <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <label><input type="image" src={leftArrow} alt="Previous" onClick={previousMonth}
                                      title="Voriger Monat"/></label>
                        <div style={{
                            textAlign: "center",
                            minWidth: "20vw",
                        }}><b>{Monate[currentDate.getMonth()]} {currentDate.getFullYear()}</b></div>
                        <label className="center"><input type="image" src={rightArrow} alt="Next" onClick={nextMonth}
                                                         title="Nächster Monat"/></label>
                    </div>
                    <div style={{flexGrow: 0}}>
                        <label><input type="image" src={plus} alt={"Neues Ereignis"} title={"Neues Ereignis"}
                                      onClick={() => setDialogDate(new Date())}/></label>
                    </div>
                </div>

                <dialog ref={dialogRef} id={"dialog"}>
                    <form className="content">
                        {currentEvent.type === "" ? (<h1>Ereignis hinzufügen</h1>) : (
                            <h1>{currentEvent.type} bearbeiten</h1>)}
                        <table>
                            <tbody>
                            <tr>
                                <td><label htmlFor="eventSelect">Ereignis:</label></td>
                                <td><select id="eventSelect" value={currentEvent.type}
                                            onChange={(e) => setCurrentEvent({...currentEvent, type: e.target.value})}>
                                    {options}
                                </select></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="date">Datum:</label></td>
                                <td><input id="date" type="date" value={formatDateToISO(dialogDate)}
                                           onChange={handleDateChange}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="cost">Kosten:</label></td>
                                <td><input id="cost" type="number" value={currentEvent.cost} onChange={(ev)=>setCurrentEvent({date:currentEvent.date, type:currentEvent.type, cost: parseInt(ev.currentTarget.value), new:false})}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="description">Beschreibung:</label></td>
                                <td><textarea id="description"/></td>
                            </tr>
                            {eventType? eventType.content : null}
                            <tr>
                                <td>
                                    <button type="button" onClick={() => {
                                        toggleDialog();
                                        if(currentEvent.new){foo("POST", "/event",
                                            JSON.stringify({
                                                "type": 1, //event type id
                                                "date": formatDateToISO(dialogDate),//"2023-11-02",
                                                "description": "description",
                                            }),  keycloak.token).then(()=>getMonthEvents())}
                                        else{/** update**/}
                                        setCurrentEvent({date: new Date(), type: "", cost: 0, new:true})

                                    }}>Speichern
                                    </button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => {
                                        toggleDialog();
                                        setCurrentEvent({date: new Date(), type: "", cost: 0, new:true})
                                    }}>Abbrechen
                                    </button>
                                </td>
                                {!currentEvent.new && <td>
                                    <button type={"button"} onClick={() => {
                                        toggleDialog();
                                        setCurrentEvent({date: new Date(), type: "", cost: 0, new:true})
                                    }}>Löschen
                                    </button>
                                </td>}
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
