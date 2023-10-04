import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import React, { useState } from "react";
import Swal from 'sweetalert2';
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { childSuCategoryService } from "../../../services/child-sub-category.service";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertCateFormModel from "./form-upsert-cate.modal";



const HomeChildSubCategory = () => {
    const [isReload, setIsReload] = useState(false);
    const [openUpsertChildSubCateModal, setOpenUpsertChildSubCateModal] = useState(false);
    const [editChildSubCate, setEditChildSubCate] = useState({});

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
            tempData = await childSuCategoryService.restore(postStatus);
        } else {
            tempData = await childSuCategoryService.softDelete(postStatus);
        }

        const { data, status } = tempData;

        if (status === HTTP_STATUS.success) {

            if (status === DATA_STATUS.success)
                setIsReload(!isReload)

            /**
             * Alert after request responses
             */
            Swal.fire({
                title: status === DATA_STATUS.success ? "Success" : "Error",
                text: data?.message,
                icon: status === DATA_STATUS.success ? "success" : "error",
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
                                icon: <ToggleOnIcon color="info" />,
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
                                icon: <ToggleOffIcon color="danger" />,
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
                onHandleAddNewEvent={() => setOpenUpsertChildSubCateModal(true)}
                handleEditEvent={(data) => {
                    setEditChildSubCate(data);
                    setOpenUpsertChildSubCateModal(true);
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleMoreEvent={(eName, data) => handleMoreEvent(eName, data)}
            />



            {openUpsertChildSubCateModal && (
                <UpsertCateFormModel
                    title={editChildSubCate?.id ? "Edit Child Sub-Category" : "Add Child Sub-Category"}
                    openModal={openUpsertChildSubCateModal}
                    editData={editChildSubCate}
                    onCloseModal={() => {
                        setEditChildSubCate({});
                        setOpenUpsertChildSubCateModal(false);
                    }}
                    handleEventSucceed={() => setIsReload(!isReload)}
                />
            )}
        </>
    );
};

export default HomeChildSubCategory;