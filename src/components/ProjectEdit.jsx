import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import {db} from "./firebase.jsx"

export const ProjectEdit = () => {

    const { state } = useLocation()

    const [projectName, setProjectName] = useState(state.project_name);
    const [AppointedDayOfDelivery, setAppointedDayOfDelivery] = useState(state.appointed_day_of_delivery);
    const [phaseData, setphaseData] = useState(state.phase);

    const [companies, setCompanies] = useState([]);
    const [companyID, setCompanyID] = useState(state.company_id);

    useEffect(() => {

        db.collection("company")
        .orderBy("company_name","asc")
        .limit(50)
        .onSnapshot((snapShot) => {
            setCompanies(snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
        }, (error) => {
            console.error("Error fetching companies:", error);
        });
    },[]);

    function sendProjectData(e) {

// ここを既存のデータに上書きできるように修正する必要があるまた、ボタンをおしたら一覧に戻るようにする。編集しない場合のために一覧に戻るボタンを作る

        e.preventDefault();

        console.log(projectName, companyID, AppointedDayOfDelivery, phaseData);
        db.collection('project').doc(state.id).update({
            project_name:projectName,
            company_id:companyID,
            appointed_day_of_delivery:AppointedDayOfDelivery,
            phase:phaseData,
        })
        setProjectName("");
        setAppointedDayOfDelivery("");
        window.location.pathname = "/";
    }

    function handleCompanyChange(e) {
        setCompanyID(e.target.value); // 選択された会社のIDをstateにセット
    }

    function handlePhaseChange(e) {
        setphaseData(e.target.value); // 選択されたフェーズをstateにセット
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <div className="project_list">
            {
                console.log(state.project_name)
            }
            <div className="contentWidth spacer-section">
                <form onSubmit={sendProjectData}>
                    <table className="tbl">
                        <tbody>
                            <tr>
                                <th>案件名</th>
                                <td><input type="text" onChange={(e) => setProjectName(e.target.value)} onKeyDown={handleKeyDown} defaultValue={state.project_name}/></td>
                            </tr>
                            <tr>
                                <th>会社名</th>
                                <td>
                                    <select defaultValue={state.company_id} onChange={handleCompanyChange}>
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>{company.company_name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>納期</th>
                                <td><input type="text" onChange={(e) => setAppointedDayOfDelivery(e.target.value)} onKeyDown={handleKeyDown} defaultValue={state.appointed_day_of_delivery}/></td>
                            </tr>
                            <tr>
                                <th>フェーズ</th>
                                <td>
                                    <select defaultValue={state.phase} onChange={handlePhaseChange}>
                                        <option value="未着手">未着手</option>
                                        <option value="制作中">制作中</option>
                                        <option value="納品済み">納品済み</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">プロジェクトの追加</button>
                </form>
            </div>
        </div>
    )
}