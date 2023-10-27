import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertSubCateFormModel from "./form-upsert-sub-cate.modal";


import Swal from 'sweetalert2';
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { subCategoryService } from "../../../services/sub-cate.service";

const HomeSubCategory = () => {
    const [isReload, setIsReload] = useState(false);
    const [openUpsertSubCateModal, setOpenUpsertSubCateModal] = useState(false);
    const [editSubCate, setEditSubCate] = useState({});

    const handleMoreEvent = async (eName, data) => {
        let postStatus = null;

        Object.keys(data).forEach((key) => {

            if (key.toLocaleLowerCase() === 'id') {
                if (eName.toLowerCase() === 'active') {
                    postStatus = data[key];

                } else {
                    postStatus = data[key];
                }
            }
        });
        try {
            let tempData;
            if (eName.toLowerCase() === 'active') {
                tempData = await subCategoryService.restore(postStatus);
            } else {
                tempData = await subCategoryService.softDelete(postStatus);
            }

            const { data, status } = tempData;

            if (status === HTTP_STATUS.success) {

                if (status === DATA_STATUS.success)
                    setIsReload(!isReload)

                /**
                 * Alert after request responses
                 */
                Swal.fire({
                    title: data.success ? "Success" : "Error",
                    text: data?.message,
                    icon: data.success ? "success" : "error",
                    confirmButtonText: "OK",
                    size: 200,
                });
            }

        } catch (error) {
            console.log('post error', error);
        }
    }

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
                bannerText="All Sub Categories"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    create: true, edit: true,
                    refresh: true,
                    // enable more options
                    moreOption: {
                        buttons: [
                            {
                                name: "Active",
                                eventName: "active",
                                icon: <ToggleOnIcon color="success" />,
                                hidden: false,
                                enable: [
                                    {
                                        field: 'inactive',
                                        values: ['Inactive']
                                    }
                                ],
                            },
                            {
                                name: "Inactive",
                                eventName: "inactive",
                                icon: <ToggleOffIcon color="error" />,
                                hidden: false,
                                enable: [
                                    {
                                        field: 'inactive',
                                        values: ['Active']
                                    }
                                ],
                            }
                        ]
                    },
                }}
                onHandleAddNewEvent={() => setOpenUpsertSubCateModal(true)}
                handleEditEvent={(data) => {
                    setEditSubCate(data);
                    setOpenUpsertSubCateModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleMoreEvent={(eName, data) => handleMoreEvent(eName, data)}
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