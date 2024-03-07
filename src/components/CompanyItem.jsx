import React, { useEffect, useState } from "react";
import { db } from "./firebase.jsx";
import Company from "./Company.jsx"; // Company コンポーネントをインポート

export const CompanyItem = () => {
    const [companies, setCompanies] = useState([]);

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

    return (
        <>
            {companies.map((company) => (
                <Company key={company.id} {...company} />
            ))}
        </>
    );
};