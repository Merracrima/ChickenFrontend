import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useLocalStorage  from 'use-local-storage';
import today from "../icons/home-simple.svg";
import leftArrow from "../icons/arrow-left-circle.svg";
import rightArrow from "../icons/arrow-right-circle.svg";
import calenderWeek from "../icons/calendar-week.svg";
import calenderMonth from "../icons/calendar-month.svg";
import calendarYear from "../icons/calendar-year.svg";
import plus from "../icons/plus.svg";
import table from "../icons/table-rows.svg";
import search from "../icons/search.svg";

export function Finanzstatistiken(){
    const [theme] = useLocalStorage('theme', 'light');
    return(
        <>
            <div className={"content"}>
                <h1>Einnahmen & Ausgaben
                    <label><input type={"image"} src={calendarYear} className={"right"} alt={"Jahresansicht"}
                                  title={"Jahresansicht"}/></label>
                    <label><input type={"image"} src={calenderMonth} className={"right"} alt={"Monatsansicht"}
                                  title={"Monatsansicht"}/></label>
                    <label><input type={"image"} src={calenderWeek} className={"right"} alt={"Wochenansicht"}
                                  title={"Wochenansicht"}/></label>
                </h1>
                <div className={"presentationgrid"}>
                    <div><h1>106€ </h1>in dieser Woche verdient</div>
                    <div><h1>106€ </h1>in dieser Woche ausgegeben</div>
                    <div><h1>0€</h1> Gewinn / Verlust</div>
                </div>
            </div>
            <div className={"content"}>
                <div className="kalenderleiste">
                    <div style={{flexGrow: 0}}>
                        <label><input type="image" src={today} alt="Today" title="Heute"/></label>
                    </div>
                    <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <label><input type="image" src={leftArrow} alt="Previous"
                                      title="Voriger Monat"/></label>
                        <div style={{
                            textAlign: "center",
                            minWidth: "20vw",
                        }}><b>1.1.2024 - 7.1.2024</b></div>
                        <label className="center"><input type="image" src={rightArrow} alt="Next"
                                                         title="Nächster Monat"/></label>
                    </div>
                </div>
                <br/><br/><br/>
                <BarChart
                    sx={{
                        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                            strokeWidth: "0.4",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                            fontFamily: "Roboto",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                            strokeWidth: "0.5",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                            stroke: theme === "dark" ? "#FFFFFF" : "#000000",
                            strokeWidth: 0.4
                        },
                        "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                            stroke: theme === "dark" ? "#FFFFFF" : "#000000",
                            strokeWidth: 0.4
                        }
                    }}
                    slotProps={{
                        noDataOverlay: {message: 'Keine Daten verfügbar' },
                    }}
                series={[
                    { color:"forestgreen", data: [35, 44, 24, 34]},
                    { color:"coral", data: [51, 6, 49, 30] },
                    {color:"CornflowerBlue", data: [-10, 100, 20, 25]}

                    //Thorges Tipp der Woche: Gewinn bzw. verlust abhängig rot bzw. grün
                ]}
                height={290}
                xAxis={[{ data: ['Mo, 1.1.', 'Di, 2.1', 'Mi, 3.1', 'Do, 4.1'], scaleType: 'band' }]}
                    yAxis={[{label: 'Betrag in €'}]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />

                <center style={{color:"white", fontSize:"15px"}}>
                    <span style={{backgroundColor: "forestgreen", borderRadius: "5px", padding:"5px" }}>Einnahmen</span>
                    <span style={{backgroundColor: "coral", borderRadius: "5px", padding:"5px", margin: "10px" }}>Ausgaben</span>
                    <span style={{
                        backgroundColor: "CornflowerBlue",
                        borderRadius: "5px", padding:"5px" }}>Gewinn/Verlust</span></center>

                <br/><br/>
                <table className={"datatable"}>
                    <tr>
                        <th>Datum</th>
                    <th>Betrag</th>
                    <th>Ereignis</th></tr>
                    <tr>
                        <td>1.1.2024</td>
                        <td style={{color:theme==="dark"?"lightgreen" : "green", fontWeight:"bold"}}>10€</td>
                        <td>Verkauf von 5 Eiern</td>
                    </tr>
                    <tr>
                        <td>2.1.2024</td>
                        <td style={{color:theme==="dark"?"lightgreen" : "green", fontWeight:"bold"}}>5€</td>
                        <td>Verkauf von 2 Eiern</td>
                    </tr>
                    <tr>
                        <td>3.1.2024</td>
                        <td style={{color:theme==="dark"?"lightgreen" : "green", fontWeight:"bold"}}>15€</td>
                        <td>Verkauf von 7 Eiern</td>
                    </tr>
                    <tr>
                        <td>4.1.2024</td>
                        <td style={{color:"red", fontWeight:"bold"}}>-5€</td>
                        <td>Impfung</td>
                    </tr></table>
            </div>
    </>);
}