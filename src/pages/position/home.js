import React from "react";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";
import { TABLE_CONFIG } from "../../utils/table-config";

const HomePosition = () => {

    return (
        <>
            <TableComponent 
                headerColumns={TABLE_CONFIG.tblPosition}
                requestToEndPoint={API_URL.position.get}
                buttonActions={SCREEN_URL.settings.position}
            />
        </>
    )
}

export default HomePosition;