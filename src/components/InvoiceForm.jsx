import React, { useState } from "react";
import { useLocation } from "react-router-dom"
import {db} from "./firebase.jsx"


export const InvoiceForm = () => {
    const { state } = useLocation()

    // const [projectName, setProjectName] = useState(state.project_name);
    // const [productName, setproductName] = useState(state.product_name);
    // const [unitVolume, setunitVolume] = useState(state.unit_volume);
    // const [unit, setUnit] = useState(state.unit);
    // const [unitPrice, setUnitPrice] = useState(state.unit_price);


    // const [id, setId] = useState(state.id);
    // const [companyId, setCompanyId] = useState(state.company_id);

    db.collection('project').doc(state.id).update({
        project_name:projectName,
        product_name:productName,
        unit_volume:unitVolume,
        unit:unit,
        unit_price:unitPrice,
    })

    return (
        <div className="invoice_form">
            <div className="contentWidth spacer-section">
                請求書
                <p>ID:{state.id}</p>
                <p>companyID:{state.company_id}</p>
                <p>案件:{projectName}</p>
                <p>品名:{productName}</p>
                <p>数量:{unitVolume}</p>
                <p>単位:{unit}</p>
                <p>金額:{unitPrice}</p>
            </div>
        </div>
    )
}
