import React from "react";
import { HeaderData } from "./HeaderData";

export const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title" onClick={() => { window.location.pathname = "/" }} >マフラー案件管理ツール</h1>
            <nav>
                <ul className="header-data">
                    {HeaderData.map((value, key) => {
                        return (
                            <li 
                                key={key}
                                id={ window.location.pathname === value.link ? "active" : "" }
                                className="col"
                                onClick={() => {
                                    window.location.pathname = value.link;
                                }}
                            >
                                    
                                {value.title}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}