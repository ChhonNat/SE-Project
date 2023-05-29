import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";

/**
 * Header Recruiter Table
 * Custom In Table Component
 */
const tblRecruiterHeaders = [
    {
        id: 'index', label: 'No.', 
    },
    {
        id: 'first_name', label: 'First Name', 
    },
    {
        id: 'last_name', label: 'Last Name',
    }
];

const HomeRecruiter = () => {

    return (
        <>
            <TableComponent 
                headerColumns={tblRecruiterHeaders}
                requestToEndPoint={API_URL.recruiter.get}
                buttonActions={SCREEN_URL.settings.recruiter}
            />
        </>
    )
}

export default HomeRecruiter;