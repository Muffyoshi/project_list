import React, { useState } from "react";
import {db} from "./firebase.jsx"

const Company = ({ id, company_name, company_address, company_name_desc }) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setCompanyName(company_name);
        setCompanyAddress(company_address);
        setCompanyNameDesc(company_name_desc);
        setIsEditing(!isEditing);
    };

    const [companyName, setCompanyName] = useState(company_name);
    const [companyAddress, setCompanyAddress] = useState(company_address);
    const [companyNameDesc, setCompanyNameDesc] = useState(company_name_desc);
    function sendCompanyData(e) {
        e.preventDefault();

        console.log(companyName,companyAddress,companyNameDesc);
        db.collection('company').doc(id).update({
            company_name: companyName,
            company_address: companyAddress,
            company_name_desc: companyNameDesc
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        toggleEdit()
    }
    function sendCompanyDelete(e) {
        e.preventDefault();

        // ユーザーに削除の確認を求める
        const isConfirmed = window.confirm("この会社を削除してもよろしいですか？");

        // ユーザーがOKを選択した場合のみ削除を実行
        if (isConfirmed) {
            db.collection('company').doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        

        <>
            {isEditing ? (
                <form onSubmit={sendCompanyData}>
                    <table className="tbl">                    
                        <tbody>
                            <tr>
                                <td style={{width:'22%'}}>{id}</td>
                                <td style={{width:'22%'}}><input  type="text" onChange={(e) => setCompanyName(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_name}/></td>
                                <td style={{width:'22%'}}><input  type="text" onChange={(e) => setCompanyAddress(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_address}/></td>
                                <td style={{width:'22%'}}><input  type="text" onChange={(e) => setCompanyNameDesc(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_name_desc}/></td>
                                <td style={{width:'12%'}}><button type="submit">保存</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            ) : (
                <table className="tbl">                    
                    <tbody>
                        <tr>
                            <td style={{width:'22%'}}>{id}</td>
                            <td style={{width:'22%'}}>{company_name}</td>
                            <td style={{width:'22%'}}>{company_address}</td>
                            <td style={{width:'22%'}}>{company_name_desc}</td>
                            <td style={{width:'12%'}}><button onClick={toggleEdit}>会社を編集</button><button onClick={sendCompanyDelete}>会社を削除</button></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Company;