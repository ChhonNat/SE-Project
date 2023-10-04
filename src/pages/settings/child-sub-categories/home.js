import React, { useState } from "react";

import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertCateFormModel from "./form-upsert-cate.modal";
// import UpsertSubCateFormModel from "./form-upsert-sub-cate.modal";

const HomeCategory = () => {
    const [isReload, setIsReload] = useState(false);
    const [openUpsertCateModal, setOpenUpsertSubSubCateModal] = useState(false);
    const [editCate, setEditCate] = useState({});

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
                asyncURL={API_URL.childSubCategory.get}
                headers={TABLE_CONFIG.tbSubSubCategory}
                // filter = {
                //     {
                //       "searchParams":{
                //         "searchValue":""
                //     }
                //     }
                // }
                bannerText="Categories"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true, refresh: true }}
                onHandleAddNewEvent={() => setOpenUpsertSubSubCateModal(true)}
                handleEditEvent={(data) => {
                    setEditCate(data);
                    setOpenUpsertSubSubCateModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />



            {openUpsertCateModal && (
                <UpsertCateFormModel
                    title={editCate?.id ? "Edit Child Sub-Category" : "Add Child Sub-Category"}
                    openModal={openUpsertCateModal}
                    editData={editCate}
                    onCloseModal={() => {
                        setEditCate({});
                        setOpenUpsertSubSubCateModal(false);
                    }}
                    handleEventSucceed={() => setIsReload(!isReload)}
                />
            )}
        </>
    );
};

export default HomeCategory;