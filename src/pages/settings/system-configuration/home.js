import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";


import Swal from 'sweetalert2';
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { subCategoryService } from "../../../services/sub-cate.service";

const HomeSytemConfig = () => {
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
            <AsyncDatatable
                asyncURL={API_URL.subCategory.get}
                headers={TABLE_CONFIG.tbSubCategory}
                bannerText="System Configuration"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: false,
                    create: false,
                    edit: false,
                    refresh: true,
                }}
                onHandleAddNewEvent={() => setOpenUpsertSubCateModal(true)}
                handleEditEvent={(data) => {
                    setEditSubCate(data);
                    setOpenUpsertSubCateModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleMoreEvent={(eName, data) => handleMoreEvent(eName, data)}
            />
        </>
    );
};

export default HomeSytemConfig;