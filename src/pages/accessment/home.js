import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";

const HomeAccessment = () => {

    const [isReload, setIsReload] = useState(false);

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.accessment.get}
                headers={TABLE_CONFIG.tblAccessment}
                bannerText="List Accessment"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true }}
                custom
            />

        </>
    )
};

export default HomeAccessment;