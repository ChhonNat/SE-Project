import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";

/**
 * Header Receiving Category Table
 * Custom In Table Component
 */
const tblReceivingCategoryHeaders = [
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

const HomeReceivingCategory = () => {

    return (
        <>
            <TableComponent 
                headerColumns={tblReceivingCategoryHeaders}
                requestToEndPoint={API_URL.receiveCategory.get}
                buttonActions={SCREEN_URL.settings.receivingCategory}
            />
        </>
    )
}

export default HomeReceivingCategory;