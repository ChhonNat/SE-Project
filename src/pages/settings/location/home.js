import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../../components/AsyncDataTable/async-table-action";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";

const HomeLocation = () => {
    const [isReload, setIsReload] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);

    return (
        <>
            {/* 
                properties::
                asyncUrl: 'request data url' 
                headers: 'Table header display in table'
                bannerText: 'Table title'
                searchPlaceHolder: 'Search input place holder'
                ordinal: 'Ordering data in table asc or desc'
                setOrdinalBy: 'Field use to ordering data in table'
                isReloadData: 'Listen table reload'
                useTableActions: 'Enable button actions in table'
                onHandleAddNewEvent: 'Listen button add new event'
                customActions: 'Custom button event in table'
            */}

            <AsyncDatatable
                asyncURL={API_URL.location.get}
                headers={TABLE_CONFIG.tblLocation}
                bannerText="All Locations"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true }}
                onHandleAddNewEvent={() => setOpenLocationModal(true)}
                // customActions={
                //     <AsyncTableAction
                //         useActions={{ edit: true, delete: true }}
                //     />
                // }
            />
        </>
    )
};

export default HomeLocation;