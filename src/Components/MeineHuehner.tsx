import edit from "../icons/edit-pencil.svg";
import deleteIcon from "../icons/delete.svg";
import table from "../icons/table-rows.svg";
import search from "../icons/search.svg";
import plus from "../icons/plus.svg";
import React from "react";
export function MeineHuehner() {
  return (
      <>
          <div className={"content"}>
              <h1>Meine Hühner
                  <label><input type={"image"} src={table} className={"right"} alt={"Tabellenansicht"} title={"Tabellenansicht"}/></label>
                  <label><input type={"image"} src={search} className={"right"} alt={"Detailansicht"} title={"Detailansicht"}/></label>
              </h1>
              <label>
                  <input type="search" placeholder="Huhn oder Stall suchen"/>
              </label>
          <table className="filter-box">
              <tr>
                  <td>
                      <label className="checkbox-container">
                          <input type="checkbox"/>
                          <span className="checkmark">Tote Hühner ausblenden</span>
                      </label>
                  </td>
                  <td>
                      <label className="checkbox-container">
                          <input type="checkbox"/>
                          <span className="checkmark">lebende Hühner ausblenden</span>
                      </label>
                  </td>
                  <td>
                      <label className="checkbox-container">
                          <input type="checkbox"/>
                          <span className="checkmark">Rasse 1 ausblenden</span>
                      </label>
                  </td>
                  <td>
                      <label className="checkbox-container">
                          <input type="checkbox"/>
                          <span className="checkmark">Rasse 2 ausblenden</span>
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
                      <label><input type="image" src={plus} alt={"Neues Huhn"} title={"Neues Huhn"}
                                    onClick={() =>{}}/></label>
                  </div>
              </div>

              <table className="chicken-list">
                  <tr>
                      <td>
                      </td>
                      <td>
                          <table className="chicken-list">
                              <tr>
                                  <td>
                                      <h1>
                                          Huhn Steckbrief
                                          <input type="image" src={edit} alt="Edit" title={"Bearbeiten"}/>
                                          <input type="image" src={deleteIcon} alt="Edit" title={"Löschen"}/>
                                      </h1>
                                      <p>Name: Constantinopel </p>
                                      <p>Geburtsdatum: 1.1.2000 </p>
                                      <p>Kein Kaufdatum </p>
                                      <p>Eierfarbe: Braun</p>
                                      <p>Rasse: Sussex</p>
                                  </td>
                                  <td>
                                      <img src="images/chicken.jpg" width="960" height="649" alt="Chicken"/>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <h1>
                                          Huhn Steckbrief
                                          <input type="image" src={edit} alt="Edit"/>
                                      </h1>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                                  </td>
                                  <td>
                                      <img src="images/chicken.jpg" width="960" height="649" alt="Chicken"/>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </div>
      </>
  );
}