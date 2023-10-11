import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import React, { useState } from "react";
import Swal from 'sweetalert2';
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { mainCategoryService } from '../../../services/main-cate.service';
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertMCateFormModel from "./form-upsert-m-cate.modal";


const HomeGroupDocument = () => {
  const [isReload, setIsReload] = useState(false);
  const [openUpsertMCateModal, setOpenUpsertMCateModal] = useState(false);
  const [editMCate, setEditMCate] = useState({});

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
        tempData = await mainCategoryService.restore(postStatus);
      } else {
        tempData = await mainCategoryService.softDelete(postStatus);
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
        asyncURL={API_URL.mainCategory.get}
        headers={TABLE_CONFIG.tblMainCategory}
        bannerText="All Main Categories"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{
          search: true,
          create: true,
          edit: true,
          refresh: true,
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
        onHandleAddNewEvent={() => setOpenUpsertMCateModal(true)}
        handleEditEvent={(data) => {
          setEditMCate(data);
          setOpenUpsertMCateModal(true);
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
        handleMoreEvent={(eName, data) => handleMoreEvent(eName, data)}
      />



      {openUpsertMCateModal && (
        <UpsertMCateFormModel
          title={editMCate?.id ? "Edit Main Category" : "Add Main Category"}
          openModal={openUpsertMCateModal}
          editData={editMCate}
          onCloseModal={() => {
            setEditMCate({});
            setOpenUpsertMCateModal(false);
          }}
          handleEventSucceed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeGroupDocument;
