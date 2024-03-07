import { CompanyInput } from "./CompanyInput.jsx";
import { CompanyItem } from "./CompanyItem.jsx";

export const CompanyList = () => {
    return (
        <div className="company_list">
            <div className="contentWidth spacer-section">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th style={{width:'22%'}}>id</th>
                            <th style={{width:'22%'}}>会社名</th>
                            <th style={{width:'22%'}}>住所</th>
                            <th style={{width:'22%'}}>補足</th>
                            <th style={{width:'12%'}}></th>
                        </tr>
                    </thead>
                </table>
                <CompanyItem />
                <CompanyInput />
            </div>
        </div>
    )
}