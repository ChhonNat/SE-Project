import React from "react";
import TableComponent from "../../components/Table/table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";

const HomeCandidate = () => {
    return (
        <>
            <TableComponent
                headerColumns={TABLE_CONFIG.tblCandidate}
                requestToEndPoint={API_URL.candidate.get}
            />
        </>
    )
};

export default HomeCandidate;