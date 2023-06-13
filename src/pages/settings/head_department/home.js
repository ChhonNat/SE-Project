import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncTableAction from "../../../components/AsyncDataTable/async-table-action";

const HomeHeadDepartment = () => {

    const [isReload, setIsReload] = useState(false);
    const [openHeadDepartmentModal, setOpenHeadDepartmentModal] = useState(false);

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
                asyncURL={API_URL.headDepartment.get}
                headers={TABLE_CONFIG.tblHeadDepartment}
                bannerText="All Head Departments"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true }}
                onHandleAddNewEvent={() => setOpenHeadDepartmentModal(true)}
                customActions={
                    <AsyncTableAction
                        useActions={{ edit: true, delete: true }}
                    />
                }
            />
        </>
    )
};

export default HomeHeadDepartment;