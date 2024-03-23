import React, { useEffect,　useState } from "react";
import {db} from "./firebase.jsx"

const Company = ({ id, company_num, company_name, company_address, company_name_desc, company_payment_day}) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setCompanyNum(company_num);
        setCompanyName(company_name);
        setCompanyAddress(company_address);
        setCompanyNameDesc(company_name_desc);
        setCompanyPaymentDay(company_payment_day);
        setIsEditing(!isEditing);
    };

    const [companyNum, setCompanyNum] = useState(company_num);
    const [companyName, setCompanyName] = useState(company_name);
    const [companyAddress, setCompanyAddress] = useState(company_address);
    const [companyNameDesc, setCompanyNameDesc] = useState(company_name_desc);
    const [companyPaymentDay, setCompanyPaymentDay] = useState(company_payment_day);
    function sendCompanyData(e) {
        e.preventDefault();

        console.log(companyName,companyAddress,companyNameDesc);
        db.collection('company').doc(id).update({
            company_num: companyNum,
            company_name: companyName,
            company_address: companyAddress,
            company_name_desc: companyNameDesc,
            company_payment_day: companyPaymentDay
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

    function handleCompanyPaymentDayChange(e) {
        setCompanyPaymentDay(e.target.value); // 選択されたフェーズをstateにセット
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    useEffect(() => {
        if (companyPaymentDay) {
            setCompanyPaymentDay(companyPaymentDay);
        } else {
            setCompanyPaymentDay("翌月末");
        }
    }, [companyPaymentDay]);

    return (
        

        <>
            {isEditing ? (
                <form onSubmit={sendCompanyData}>
                    <table className="tbl">                    
                        <tbody>
                            <tr>
                                <td style={{width:'20%'}}>{id}</td>
                                <td style={{width:'8%'}}><input  type="text" onChange={(e) => setCompanyNum(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_num}/></td>
                                <td style={{width:'18%'}}><input  type="text" onChange={(e) => setCompanyName(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_name}/></td>
                                <td style={{width:'18%'}}><input  type="text" onChange={(e) => setCompanyAddress(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_address}/></td>
                                <td style={{width:'14%'}}>
                                    <select defaultValue={companyPaymentDay} onChange={handleCompanyPaymentDayChange}>
                                        <option value="翌月末">翌月末</option>
                                        <option value="翌々月15日">翌々月15日</option>
                                    </select>
                                </td>
                                <td style={{width:'10%'}}><input  type="text" onChange={(e) => setCompanyNameDesc(e.target.value)} onKeyDown={handleKeyDown} defaultValue={company_name_desc}/></td>
                                <td style={{width:'12%'}}><button type="submit">保存</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            ) : (
                <table className="tbl">                    
                    <tbody>
                        <tr>
                            <td style={{width:'20%'}}>{id}</td>
                            <td style={{width:'8%'}}>{company_num}</td>
                            <td style={{width:'18%'}}>{company_name}</td>
                            <td style={{width:'18%'}}>{company_address}</td>
                            <td style={{width:'14%'}}>{company_payment_day}</td>
                            <td style={{width:'10%'}}>{company_name_desc}</td>
                            <td style={{width:'12%'}}><button onClick={toggleEdit}>会社を編集</button><button onClick={sendCompanyDelete}>会社を削除</button></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Company;