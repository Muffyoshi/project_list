import React, { useEffect, useState } from "react";
import {db} from "./firebase.jsx"

export const ProjectInput = () => {
    const [projectName, setProjectName] = useState('');
    const [AppointedDayOfDelivery, setAppointedDayOfDelivery] = useState('');

    const [companies, setCompanies] = useState([]);
    const [companyID, setCompanyID] = useState('');

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

    useEffect(() => {
        if (companies.length > 0) {
            setCompanyID(companies[0].id); // 最初の会社のIDをcompanyIDに設定
        }
    }, [companies]);

    function sendProjectData(e) {
        e.preventDefault();

        console.log(projectName, companyID, AppointedDayOfDelivery);
        db.collection('project').add({
            project_name:projectName,
            company_id:companyID,
            appointed_day_of_delivery:AppointedDayOfDelivery,
            phase:'未着手',
        })
        setProjectName("");
        setAppointedDayOfDelivery("");
    }

    function handleCompanyChange(e) {
        setCompanyID(e.target.value); // 選択された会社のIDをstateにセット
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <div className="project_list">
            <div className="contentWidth spacer-section">
                <form onSubmit={sendProjectData}>
                    <table className="tbl">
                        <tbody>
                            <tr>
                                <th>案件名</th>
                                <td><input type="text" onChange={(e) => setProjectName(e.target.value)} onKeyDown={handleKeyDown}/></td>
                            </tr>
                            <tr>
                                <th>会社名</th>
                                <td>
                                    <select onChange={handleCompanyChange}>
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>{company.company_name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>納期</th>
                                <td><input type="text" onChange={(e) => setAppointedDayOfDelivery(e.target.value)} onKeyDown={handleKeyDown}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">プロジェクトの追加</button>
                </form>
            </div>
        </div>
    )
}