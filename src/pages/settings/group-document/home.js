import SyncIcon from '@mui/icons-material/Sync';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertGDocFormModal from "./form-upsert-g-doc.modal";

import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from '../../../constants/data_status';
import { HTTP_STATUS } from '../../../constants/http_status';
import { groupDocService } from '../../../services/group-doc.service';
import { TABLE_CONFIG } from "../../../utils/table-config";


const HomeGroupDocument = () => {

  const user = useSelector((state) => state?.userAuthendicated);
  const [selectedData, setSelectedData] = useState({ open: false, row: {} });

  const [editCandidate, setEditCandidate] = useState({});
  const [detailCandidate, setDetailCandidate] = useState({});

  const [openUpsertCandidateModal, setOpenUpsertCandidateModal] =
    useState(false);
  const [openCandidateDetailModal, setOpenCandidateDetailModal] =
    useState(false);
  const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openProcessModal, setOpenProcessModal] = useState(false);

  const [verifyTypeModal, setVerifyTypeModal] = useState("");

  // Handle click each candidate to update the info
  const handleEditCandidate = (candidate) => {
    setEditCandidate(candidate);
    setOpenUpsertCandidateModal(true);
  };

  //handle review candidate before shortlist
  const handleReviewCandidate = (candidate) => {
    setEditCandidate(candidate);
    setOpenReviewCVModal(true);
  };

  //   const handleCloseModal = () => {
  //     reset();
  //     clearErrors();
  //     onCloseModal();
  // }


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

      let submitGDoc;
      if (eName.toLowerCase() === 'active') {
        submitGDoc = await groupDocService.restore(postStatus);
      } else {
        submitGDoc = await groupDocService.softDelete(postStatus);
      }

      const { data, status } = submitGDoc;

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

      <AsyncDatatable
        asyncURL={API_URL.groupDocument.get}
        headers={TABLE_CONFIG.tblGroupDocument}
        bannerText="Group Documents"
        // filter={
        //   {
        //     "searchParams":{
        //       "nameEn":"",
        //       "nameKh":"",
        //       "createdBy":""
        //   },
        //   }
        // }
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
                icon: <SyncIcon color="info" />,
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
                icon: <SyncDisabledIcon color="info" />,
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
          title={editGDoc?.id ? "Edit Group Document" : "Add Group Document"}
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
