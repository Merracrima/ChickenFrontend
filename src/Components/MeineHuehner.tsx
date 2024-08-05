import edit from "../icons/edit-pencil.svg";
import deleteIcon from "../icons/delete.svg";
import React from "react";
export function MeineHuehner() {
  return (
      <>
    <div className={"content"}>
        <h1>Meine Hühner
            <button className={"right"}>Huhn hinzufügen</button>
        </h1>
    </div>
          <div className="content">
              <label>
                  <input type="search" placeholder="Huhn suchen"/>
              </label>
              <table className="filter-box">
            <tr>
                <td>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark">Tote Hühner ausblenden</span>
                    </label>
                </td>
                <td>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark">lebende Hühner ausblenden</span>
                    </label>
                </td>
                <td>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark">Rasse 1 ausblenden</span>
                    </label>
                </td>
                <td>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark">Rasse 2 ausblenden</span>
                    </label>
                </td>
            </tr>
        </table>
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
                                    <input type="image" src={edit} alt="Edit"/>
                                    <input type="image" src={deleteIcon} alt="Edit"/>
                                </h1>
                                <p>Name: Constantinopel </p>
                                <p>Geburtsdatum: 1.1.2000 </p>
                                <p>Kein Kaufdatum </p>
                            </td>
                            <td>
                                <img src="images/chicken.jpg" width="960" height="649" alt="Chicken"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1>
                                    Huhn Steckbrief
                                    <input type="image" src={edit}  alt="Edit" />
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