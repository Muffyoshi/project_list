import { CompanyInput } from "./CompanyInput.jsx";
import { CompanyItem } from "./CompanyItem.jsx";

export const CompanyList = () => {
    return (
        <div className="company_list">
            <div className="contentWidth spacer-section">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th style={{width:'20%'}}>id</th>
                            <th style={{width:'8%'}}>No.</th>
                            <th style={{width:'18%'}}>会社名</th>
                            <th style={{width:'18%'}}>住所</th>
                            <th style={{width:'14%'}}>入金日</th>
                            <th style={{width:'10%'}}>補足</th>
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