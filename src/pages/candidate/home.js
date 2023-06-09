import React, { useState } from "react";
import TableComponent from "../../components/Table/table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import { filter } from "../../constants/api_filter";

import AsyncDatatable from "../../components/AsyncDataTable/async-datatable";

const HomeCandidate = () => {

    const [selectedData, setSelectedData] = useState({ open: false, row: {} });
    const [isReload, setIsReload] = useState(false);

    return (
        <>
            <AsyncDatatable
                setSelectedData={setSelectedData}
                asyncURL={API_URL.candidate.get}
                headers={TABLE_CONFIG.tblCandidate}
                bannerText="List Candidates"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
            />
            {/* <TableComponent
                headerColumns={TABLE_CONFIG.tblCandidate}
                requestToEndPoint={API_URL.candidate.get}
                postData={filter.candidate}
                useTableActions={{create: true}}
            /> */}
        </>
    )
};

export default HomeCandidate;