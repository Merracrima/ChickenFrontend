import * as React from "react";
import today from "../icons/home-simple.svg";
import leftArrow from "../icons/arrow-left-circle.svg";
import rightArrow from "../icons/arrow-right-circle.svg";
import {BarChart} from "@mui/x-charts/BarChart";
import table from "../icons/table-rows.svg";
import useLocalStorage from "use-local-storage";

export function Eierbestand(){
    const [theme] = useLocalStorage('theme', 'light');
    return(<>
        <div className={"content"}>
            <h1>Eierbestand</h1>
            <div className={"presentationgrid"}>
                <div><h1>60 Eier</h1>verfügbar</div>
                <div><h1>10 Eier </h1>in dieser Woche gelegt</div>
                <div><h1>50 Eier</h1> in dieser Woche verkauft</div>
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
                        ".${barElementClasses.root}": {
                            fontFamily: "Roboto !important",
                            color: theme === "dark" ? "#FFFFFF" : "#000000" },
                        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                            strokeWidth: "0.4",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                            fontFamily: "Roboto !important",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                            strokeWidth: "0.5",
                            fill: theme === "dark" ? "#FFFFFF" : "#000000"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                            stroke: theme === "dark" ? "#FFFFFF" : "#000000",
                            strokeWidth: 1
                        },
                        "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                            stroke: theme === "dark" ? "#FFFFFF" : "#000000",
                            strokeWidth: 1
                        }
                    }}
                    slotProps={{
                        noDataOverlay: {message: 'Keine Daten verfügbar' },
                    }}
                    series={[
                        { color:"forestgreen", data: [35, 44, 24, 34]},
                        { color:"goldenrod", data: [51, 6, 49, 30] },
                        {color:"CornflowerBlue", data: [10, 100, 20, 25]}

                        //Thorges Tipp der Woche: Gewinn bzw. verlust abhängig rot bzw. grün
                    ]}
                    height={290}
                    xAxis={[{ data: ['Mo, 1.1.', 'Di, 2.1', 'Mi, 3.1', 'Do, 4.1'], scaleType: 'band' }]}
                    yAxis={[{label: 'Betrag in €'}]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />

                <center style={{color:"white", fontSize:"15px"}}>
                    <span style={{backgroundColor: "forestgreen", borderRadius: "5px", padding:"5px" }}>Gelegte Eier</span>
                    <span style={{backgroundColor: "goldenrod", borderRadius: "5px", padding:"5px", margin: "10px" }}>Verkaufte Eier</span>
                    <span style={{
                        backgroundColor: "CornflowerBlue",
                        borderRadius: "5px", padding:"5px" }}>Eierbestand</span></center>

                <br/><br/>
                <table className={"datatable"}>
                    <tr>
                        <th>Datum</th>
                        <th>Ereignis</th></tr>
                    <tr>
                        <td>1.1.2024</td>
                        <td>Verkauf von 5 Eiern</td>
                    </tr>
                    <tr>
                        <td>2.1.2024</td>
                        <td>Verkauf von 2 Eiern</td>
                    </tr>
                    <tr>
                        <td>3.1.2024</td>
                        <td>Verkauf von 7 Eiern</td>
                    </tr>
                    <tr>
                        <td>4.1.2024</td>
                        <td>2 Eier gelegt</td>
                    </tr></table>
        </div>
        </>
    );
}