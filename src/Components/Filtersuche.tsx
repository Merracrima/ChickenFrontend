import table from "../icons/table-rows.svg";
import React from "react";

type FiltersucheProps = {
    filter: String[];
};
export function Filtersuche({filter}:FiltersucheProps) {
    //baut Suche auf mit filter und übergibt den jeweiligen, aktuellen filter
    let list= [];
    for(let i=0; i<filter.length;i++){
        list.push(
            <td>
                <label className="checkbox-container">
                    <input type="checkbox"/>
                    <span className="checkmark">{filter[i]}</span>
                </label>
            </td>
        );
    }
    return (
        <div><label><input type="search" placeholder="Ereignis suchen"/></label>
            <table className="filter-box">
                <tbody>
                <tr>
                    {list}
                </tr>
                </tbody>
            </table>
        </div>
    )
}