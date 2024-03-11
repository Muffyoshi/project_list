import React, { useState } from "react";
import {db} from "./firebase.jsx"

export const CompanyInput = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyNameDesc, setCompanyNameDesc] = useState('');
    function sendCompanyData(e) {
        e.preventDefault();

        db.collection('company').add({
            company_name:companyName,
            company_address:companyAddress,
            company_name_desc:companyNameDesc
        })
        setCompanyName("");
        setCompanyAddress("");
        setCompanyNameDesc("");
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <form onSubmit={sendCompanyData}>
            <table className="tbl">                    
                <tbody>
                    <tr>
                        <td style={{width:'22%'}}></td>
                        <td style={{width:'22%'}}><input type="text" onChange={(e) => setCompanyName(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'22%'}}><input type="text" onChange={(e) => setCompanyAddress(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'22%'}}><input type="text" onChange={(e) => setCompanyNameDesc(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'12%'}}><button type="submit">会社を追加</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}