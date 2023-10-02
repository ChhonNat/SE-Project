import React, { useState } from "react";

import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertSubCateFormModel from "./form-upsert-sub-cate.modal";

const HomeSubCategory = () => {
    const [isReload, setIsReload] = useState(false);
    const [openUpsertSubCateModal, setOpenUpsertSubCateModal] = useState(false);
    const [editSubCate, setEditSubCate] = useState({});

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

            {/* old AsyncDataTable */}
            <AsyncDatatable
                asyncURL={API_URL.subCategory.get}
                headers={TABLE_CONFIG.tbSubCategory}
                // filter = {
                //     {
                //       "searchParams":{
                //         "searchValue":""
                //     }
                //     }
                // }
                bannerText="Sub Categories"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true, refresh: true }}
                onHandleAddNewEvent={() => setOpenUpsertSubCateModal(true)}
                handleEditEvent={(data) => {
                    setEditSubCate(data);
                    setOpenUpsertSubCateModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />



            {openUpsertSubCateModal && (
                <UpsertSubCateFormModel
                    title={editSubCate?.id ? "Edit Sub Category" : "Add Sub Category"}
                    openModal={openUpsertSubCateModal}
                    editData={editSubCate}
                    onCloseModal={() => {
                        setEditSubCate({});
                        setOpenUpsertSubCateModal(false);
                    }}
                    handleEventSucceed={() => setIsReload(!isReload)}
                />
            )}
        </>
    );
};

export default HomeSubCategory;