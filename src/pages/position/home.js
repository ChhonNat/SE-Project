import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";

/**
 * Header Position Table
 * Custom In Table Component
 */
const tblPositionHeaders = [
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

const HomePosition = () => {

    return (
        <>
            <TableComponent 
                headerColumns={tblPositionHeaders}
                requestToEndPoint={API_URL.position.get}
                buttonActions={SCREEN_URL.settings.position}
            />
        </>
    )
}

export default HomePosition;