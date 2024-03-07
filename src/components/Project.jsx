import React, { useEffect, useState } from "react";
import { db } from "./firebase.jsx";

const Project = ({ id, company_id, project_name, appointed_day_of_delivery, phase }) => {
    const [company_name, setCompanyName] = useState([]);
    const [company_name_desc, setCompanyNameDesc] = useState('');

    useEffect(() => {
        // コレクション"company"の中のドキュメントIDが"company_id"の物を取得
        // 取得が完了したときにドキュメントIDが"company_id"の"company_name"を
        // useState([])で変数"company_name"に代入
        // .then((doc) => {})のなかでエラーが発生した場合に
        // catch((error) => {})のなかでエラーの内容を表示させる。
        db.collection("company").doc(company_id).get()
            .then((doc) => {
                //doc.existsは、Firestoreのdocメソッドによって取得されたドキュメントが存在するかどうかを示すプロパティ。
                if (doc.exists) {
                    // 指定のIDのデータが存在する場合の処理
                    const data = doc.data();
                    setCompanyName(data.company_name)
                    setCompanyNameDesc(data.company_name_desc)
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }, [company_id]);
    return (
        <>
            <table className="tbl">                    
                <tbody>
                    <tr>
                        <td style={{width:'22%'}}>{project_name}</td>
                        <td style={{width:'22%'}}>{company_name}</td>
                        <td style={{width:'22%'}}>{company_name_desc}</td>
                        <td style={{width:'12%'}}>{appointed_day_of_delivery}</td>
                        <td style={{width:'10%'}}>{phase}</td>
                        <td style={{width:'12%'}}><button>案件を編集</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Project;