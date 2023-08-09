import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertFormModal from "../global-upsert-form/upsert.modal";
import MainBusinessModel from "../../../models/main-business.model";
import { KEY_POST } from "../../../constants/key_post";


const HomeMainBusiness = () => {

    const [isReload, setIsReload] = useState(false);
    const [openMainBusinessModal, setOpenMainBusinessModal] = useState(false);
    const [editMainBusiness, setEditMainBusiness] = useState({});

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
                asyncURL={API_URL.mainBuiness.get}
                headers={TABLE_CONFIG.tblMainBusiness}
                bannerText="All Main Businesses"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ 
                    search: true, 
                    create: false, 
                    edit: false 
                }}
                onHandleAddNewEvent={() => setOpenMainBusinessModal(true)}
                handleEditEvent={(data) => {
                    setEditMainBusiness(data);
                    setOpenMainBusinessModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertFormModal
                title={editMainBusiness?.id ? "Edit main business" : "Add main business"}
                openModal={openMainBusinessModal}
                editData={editMainBusiness}
                onCloseModal={() => {
                    setEditMainBusiness(MainBusinessModel);
                    setOpenMainBusinessModal(false);
                }}
                model={MainBusinessModel}
                keyPosts={KEY_POST.mainBusiness}
                postUrl={API_URL.mainBuiness.create}
                putUrl={API_URL.mainBuiness.edit}
                dataType={'/business_division'}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
}

export default HomeMainBusiness;