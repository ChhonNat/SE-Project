import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertSubBusinessUnitForm from "./form-upsert-sub-business-unit";
import SubBusinessUnitModel from "../../../models/business/sub-business-unit.model";


const HomeSubBusiness = () => {

    const [isReload, setIsReload] = useState(false);
    const [openBusinessModal, setOpenBusinessModal] = useState(false);
    const [editSubBusiness, setEditSubBusiness] = useState({});

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
                asyncURL={API_URL.subBusinessUnit.get}
                headers={TABLE_CONFIG.tblSubBusinessUnit}
                bannerText="All Secondary Businesses"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenBusinessModal(true)}
                handleEditEvent={(data) => {
                    setEditSubBusiness(data);
                    setOpenBusinessModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertSubBusinessUnitForm
                title={editSubBusiness?.id ? "Edit Secondary Business" : "Add Secondary Business"}
                openModal={openBusinessModal}
                editData={editSubBusiness}
                onCloseModal={() => {
                    setEditSubBusiness(SubBusinessUnitModel);
                    setOpenBusinessModal(false);
                }}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
}

export default HomeSubBusiness;