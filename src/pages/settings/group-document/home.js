import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import React, { useState } from "react";
import Swal from 'sweetalert2';
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { groupDocService } from '../../../services/group-doc.service';
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertGDocFormModal from "./form-upsert-g-doc.modal";

const HomeGroupDocument = () => {

  const [openReviewCVModal, setOpenReviewCVModal] = useState(false);

  const [isReload, setIsReload] = useState(false);
  const [openUpsertGDocModal, setOpenUpsertGDocModal] = useState(false);
  const [editGDoc, setEditGDoc] = useState({});

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
        tempData = await groupDocService.restore(postStatus);
      } else {
        tempData = await groupDocService.softDelete(postStatus);
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

      <AsyncDatatable
        asyncURL={API_URL.groupDocument.get}
        headers={TABLE_CONFIG.tblGroupDocument}
        bannerText="All Type of Documents"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{
          search: true,
          create: true,
          refresh: true,
          edit: true,

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
                    values: 'Inactive'
                  }
                ],
              },
              {
                name: "Inactive",
                eventName: "inactive",
                icon: <ToggleOffIcon color='error' />,
                hidden: false,
                enable: [
                  {
                    field: 'inactive',
                    values: 'Active'
                  }
                ],
              }
            ]
          },
        }}
        onHandleAddNewEvent={() => setOpenUpsertGDocModal(true)}
        handleEditEvent={(data) => {
          setEditGDoc(data);
          setOpenUpsertGDocModal(true);
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
        handleMoreEvent={(eName, data) => handleMoreEvent(eName, data)}
      />

      {/* Modal create and update GROUP DOCUMENT */}
      {openUpsertGDocModal && (
        <UpsertGDocFormModal
          title={editGDoc?.id ? "Edit Type of Document" : "Add Type of Document"}
          openModal={openUpsertGDocModal}
          editData={editGDoc}
          onCloseModal={() => {
            setEditGDoc({});
            setOpenUpsertGDocModal(false);
          }}
          handleEventSucceed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeGroupDocument;
