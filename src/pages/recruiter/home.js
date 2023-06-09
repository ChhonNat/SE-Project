import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";
import { TABLE_CONFIG } from "../../utils/table-config";

const HomeRecruiter = () => {

    return (
        <>
            <TableComponent 
                headerColumns={TABLE_CONFIG.tblRecruiter}
                requestToEndPoint={API_URL.recruiter.get}
                buttonActions={SCREEN_URL.settings.recruiter}
                useTableActions={{create: true, edit: true, delete: true, search: true}}
            />
        </>
    )
}

export default HomeRecruiter;