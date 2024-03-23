import React, { useEffect, useState } from "react";
import {db} from "./firebase.jsx"

export const CompanyInput = () => {
    const [companyNum, setCompanyNum] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyNameDesc, setCompanyNameDesc] = useState('');
    const [numberOfDocuments, setNumberOfDocuments] = useState('');
    const [companyPaymentDay, setCompanyPaymentDay] = useState('');
    
    function sendCompanyData(e) {
        e.preventDefault();

        db.collection('company').add({
            company_num:companyNum,
            company_name:companyName,
            company_address:companyAddress,
            company_name_desc:companyNameDesc,
            company_payment_day:companyPaymentDay
        })
        setCompanyNum("");
        setCompanyName("");
        setCompanyAddress("");
        setCompanyNameDesc("");
    }

    function getNumberOfDocuments() {        
        db.collection('company').get()
        .then((querySnapshot) => {
            let maxCompanyNum = 0;
            querySnapshot.forEach((doc) => {
                const companyNum = doc.data().company_num;
                if (parseInt(companyNum) > maxCompanyNum) {
                    maxCompanyNum = parseInt(companyNum);
                }
            });
            setNumberOfDocuments((maxCompanyNum + 1).toString().padStart(3, '0'));
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
        });
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    function handleCompanyNameDescChange(e) {
        setCompanyPaymentDay(e.target.value); // 選択されたフェーズをstateにセット
    }

    useEffect(() => {
        getNumberOfDocuments();
    },[]);

    return (
        <form onSubmit={sendCompanyData}>
            <table className="tbl">                    
                <tbody>
                    <tr>
                        <td style={{width:'20%'}}></td>
                        <td style={{width:'8%'}}><input type="text" value={numberOfDocuments} onChange={(e) => setCompanyNum(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'18%'}}><input type="text" onChange={(e) => setCompanyName(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'18%'}}><input type="text" onChange={(e) => setCompanyAddress(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'14%'}}>
                            <select defaultValue={companyNameDesc} onChange={handleCompanyNameDescChange}>
                                <option value="翌月末">翌月末</option>
                                <option value="翌々月15日">翌々月15日</option>
                            </select>
                        </td>
                        <td style={{width:'10%'}}><input type="text" onChange={(e) => setCompanyNameDesc(e.target.value)} onKeyDown={handleKeyDown}/></td>
                        <td style={{width:'12%'}}><button type="submit">会社を追加</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}