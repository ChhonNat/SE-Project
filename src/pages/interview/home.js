import React, { useState } from "react";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../components/AsyncDataTable/async-table-action";

const HomeInterview = () => {

    const [isReload, setIsReload] = useState(false);

    return (
        <>

            {/* 
                properties::
                asyncUrl: 'request data url' 
                headers: 'Table header display in table'
                bannerText: 'Table title'
                searchPlaceHolder: 'Search input place holder'
                ordinal: 'Ordering data in table asc or desc'
                setOrdinalBy: 'Field use to ordering data in table'
                isReloadData: 'Listen table reload'
                useTableActions: 'Enable button actions in table'
                onHandleAddNewEvent: 'Listen button add new event'
                customActions: 'Custom button event in table'
            */}
            <AsyncDatatable  
                asyncURL={API_URL.interview.get}
                headers={TABLE_CONFIG.tblInterview}
                bannerText="All Interviews"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    passedInterview: {
                        field: 'interviewResult',
                        condition: {
                            Passed: true, Failed: false
                        }
                    }
                }}
            />

        </>
    )
};

export default HomeInterview;