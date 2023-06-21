import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncTableAction from "../../../components/AsyncDataTable/async-table-action";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertForm from "../form/upsert";
import BusinessModel from "../../../models/business.model";
import { KEY_POST } from "../../../constants/key_post";


const HomeBusiness = () => {

    const [isReload, setIsReload] = useState(false);
    const [openBusinessModal, setOpenBusinessModal] = useState(false);
    const [editBusiness, setEditBusiness] = useState({});

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
                asyncURL={API_URL.business.get}
                headers={TABLE_CONFIG.tblBusiness}
                bannerText="All Businesses"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenBusinessModal(true)}
                handleEditEvent={(data) => {
                    setEditBusiness(data);
                    setOpenBusinessModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertForm
                title={editBusiness?.id ? "Edit business" : "Add new business"}
                openModal={openBusinessModal}
                editData={editBusiness}
                onCloseModal={() => {
                    setEditBusiness(BusinessModel);
                    setOpenBusinessModal(false);
                }}
                model={BusinessModel}
                keyPosts={KEY_POST.business}
                postUrl={API_URL.business.create}
                putUrl={API_URL.business.edit}
                dataType={'/business_division'}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
}

export default HomeBusiness;