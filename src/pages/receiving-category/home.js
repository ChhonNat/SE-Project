import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";
import { TABLE_CONFIG } from "../../utils/table-config";

const HomeReceivingCategory = () => {

    return (
        <>
            <TableComponent 
                headerColumns={TABLE_CONFIG.tblReceivingCategory}
                requestToEndPoint={API_URL.receiveCategory.get}
                buttonActions={SCREEN_URL.settings.receivingCategory}
            />
        </>
    )
}

export default HomeReceivingCategory;