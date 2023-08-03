import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertBusinessUnitForm from "./form-upsert-business-unit";
import BusinessUnitModel from "../../../models/business/business-unit.model";
import { KEY_POST } from "../../../constants/key_post";


const HomeBusiness = () => {

    const [isReload, setIsReload] = useState(false);
    const [openBusinessUnitModal, setOpenBusinessUnitModal] = useState(false);
    const [editBusinessUnit, setEditBusinessUnit] = useState({});

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
                asyncURL={API_URL.businessUnit.get}
                headers={TABLE_CONFIG.tblBusinessUnit}
                bannerText="All Primary Businesses"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ 
                    search: true, 
                    refresh: true,
                    create: true, 
                    edit: true 
                }}
                onHandleAddNewEvent={() => setOpenBusinessUnitModal(true)}
                handleEditEvent={(data) => {
                    setEditBusinessUnit(data);
                    setOpenBusinessUnitModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />

            {/* Modal create and update */}
            <UpsertBusinessUnitForm
                title={editBusinessUnit?.id ? "Edit Primary Business" : "Add Primary Business"}
                openModal={openBusinessUnitModal}
                editData={editBusinessUnit}
                onCloseModal={() => {
                    setEditBusinessUnit({});
                    setOpenBusinessUnitModal(false);
                }}
                model={BusinessUnitModel}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
}

export default HomeBusiness;