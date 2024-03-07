import React from "react";
import { ProjectItem } from "./ProjectItem";

export const ProjectList = () => {
    return (
        <div className="project_list">
            <div className="contentWidth spacer-section">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th style={{width:'22%'}}>案件名</th>
                            <th style={{width:'22%'}}>会社名</th>
                            <th style={{width:'22%'}}>会社名補足</th>
                            <th style={{width:'12%'}}>納期</th>
                            <th style={{width:'10%'}}>状態</th>
                            <th style={{width:'12%'}}></th>
                        </tr>
                    </thead>
                </table>
                <ProjectItem />
                {/* <a href="/project_input">プロジェクトの追加</a> */}
                <button onClick={() => { window.location.pathname = "/project_input"; }}>プロジェクトの追加</button>
            </div>
        </div>
    )
}
