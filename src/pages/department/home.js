import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";

/**
 * Header Department Table
 * Custom In Table Component
 */
const tblDepartmentHeaders = [
    {
        id: 'index', label: 'No.', 
    },
    {
        id: 'name', label: 'Name', 
    },
    {
        id: 'description', label: 'Description',
    }
];

const HomeBusinessUnit = () => {

    return (
        <>
            <TableComponent 
                headerColumns={tblDepartmentHeaders}
                requestToEndPoint={API_URL.department.get}
                buttonActions={SCREEN_URL.settings.department}
            />
        </>
    )
}

export default HomeBusinessUnit;