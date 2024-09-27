import search from "../icons/search.svg";
import table from "../icons/table-rows.svg";
import plus from "../icons/plus.svg";
export function Medikamentebuch(){
    return(
        <>
            <div className={"content"}>
                <h1>Medikamentebuch
                    <label><input type={"image"} src={table} className={"right"} alt={"Tabellenansicht"} title={"Tabellenansicht"}/></label>
                    <label><input type={"image"} src={search} className={"right"} alt={"Detailansicht"} title={"Detailansicht"}/></label>
                </h1>
                <label>
                    <input type="search" placeholder="Medikament suchen"/>
                </label>
            <table className="filter-box">
                <tr>
                    <td>
                        <label className="checkbox-container">
                            <input type="checkbox"/>
                            <span className="checkmark">Medikament 1</span>
                        </label>
                    </td>
                    <td>
                        <label className="checkbox-container">
                            <input type="checkbox"/>
                            <span className="checkmark">Medikament 2</span>
                        </label>
                    </td>
                    <td>
                        <label className="checkbox-container">
                            <input type="checkbox"/>
                            <span className="checkmark">Medikament 3</span>
                        </label>
                    </td>
                    <td>
                        <label className="checkbox-container">
                            <input type="checkbox"/>
                            <span className="checkmark">Medikament 4</span>
                        </label>
                    </td>
                </tr>
            </table>
            </div>

            <div className="content">

                <div className="kalenderleiste">
                    <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <div style={{
                            textAlign: "center",
                            minWidth: "20vw",
                        }}><b>Farm 1</b></div>
                    </div>
                    <div style={{flexGrow: 0}}>
                        <label><input type="image" src={plus} alt={"Neues Medikament"} title={"Neues Medikament"}
                                      onClick={() =>{}}/></label>
                    </div>
                </div>
            </div>
            </>
    );
}