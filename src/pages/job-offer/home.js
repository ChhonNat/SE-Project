import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import OfferJobFormModal from "./offer-job-setting-form.modal";

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import { useSelector } from "react-redux";
import { AttachMoney, Clear, DoneAll, NextPlan } from "@mui/icons-material";
import { ROLE } from "../../constants/roles";
import { STATUS } from "../../constants/status";
import ViewFileModal from "../../components/Modal/view-file.modal";
import JobOfferFormDetailModal from "./detail-offer-form.modal";

const HomeJobOffer = () => {
  const user = useSelector((state) => state?.userAuthendicated);
  const [isReload, setIsReload] = useState(false);
  const [editJobOffer, setEditJobOffer] = useState({});
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openOfferDetailModal, setOpenOfferDetailModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const mapFileModal = {
    viewCVFile: {
      modalTitle: "View CV",
      viewFileById: editJobOffer?.candidate?.id,
      downloadFileUrl: null,
    },
    viewEvaluateForm: {
      modalTitle: "View Evaluate Form",
      viewFileById: editJobOffer?.interview?.id,
      downloadFileUrl: API_URL.interview.downloadEvaluateForm,
    },
    viewReferenceForm: {
      modalTitle: "View Reference Form",
      viewFileById: editJobOffer?.referenceCheck?.id,
      downloadFileUrl: API_URL.referenceCheck.downloadRefForm,
    },
  };

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
        asyncURL={API_URL.jobOffer.get}
        headers={TABLE_CONFIG.tblJobOffer}
        bannerText="All Job Offers"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{
          search: true,
          refresh: true,
          view: true,
          viewFile: true,
          viewSecFile: true,
          moreOption: {
            buttons: [
              {
                name: "Job Offer",
                eventName: "offer",
                icon: <AttachMoney color="info" />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_TA_TEAM)
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: [
                      STATUS.OFFER_PROCESS.PENDING,
                      STATUS.OFFER_PROCESS.HOD_REJECTED,
                    ],
                  },
                ],
              },
              {
                name: "Submit to HOD",
                eventName: "submitToHOD",
                icon: <NextPlan />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_TA_TEAM)
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: [
                      STATUS.OFFER_PROCESS.PENDING,
                      STATUS.OFFER_PROCESS.HOD_REJECTED,
                      STATUS.OFFER_PROCESS.DHR_REJECTED,
                      STATUS.OFFER_PROCESS.OFCCEO_REJECTED
                    ],
                  },
                  {
                    field: "status",
                    values: [STATUS.OFFER_STATUS.OFFERED],
                  },
                ],
              },
              {
                name: "Verify",
                eventName: "verify",
                icon: <DoneAll color="info" />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_HR_MANAGER)
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: [
                      STATUS.OFFER_PROCESS.HOD_APPROVED,
                      STATUS.OFFER_PROCESS.DHR_REJECTED,
                    ],
                  },
                ],
              },
              {
                name: "Approve",
                eventName: user?.roles?.includes(ROLE?.ROLE_HIRING_MANAGER)
                  ? "approveByHOD"
                  : "approveByOFCCEO",
                icon: <DoneAll color="info" />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER, ROLE.ROLE_OFCCEO_ADMIN].some(
                      (role) => user?.roles?.includes(role)
                    )
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER)
                      ? [
                          STATUS.OFFER_PROCESS.SUBMITTED_HOD,
                          STATUS.OFFER_PROCESS.HOD_REJECTED,
                        ]
                      : [
                          STATUS.OFFER_PROCESS.DHR_VERIFIED,
                          STATUS.OFFER_PROCESS.OFCCEO_REJECTED,
                        ],
                  },
                ],
              },
              {
                name: "Reject",
                eventName: user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER)
                  ? "rejectByHOD"
                  : "rejectByHR",
                icon: <Clear />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER, ROLE.ROLE_HR_MANAGER].some(
                      (role) => user?.roles?.includes(role)
                    )
                  ? false
                  : true,
                enable: user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER)
                  ? [
                      {
                        field: "processStatus",
                        values: [
                          STATUS.OFFER_PROCESS.SUBMITTED_HOD,
                          STATUS.OFFER_PROCESS.HOD_APPROVED,
                        ],
                      },
                    ]
                  : [
                      {
                        field: "processStatus",
                        values: [
                          STATUS.OFFER_PROCESS.HOD_APPROVED,
                          STATUS.OFFER_PROCESS.DHR_VERIFIED,
                        ],
                      },
                    ],
              },
              {
                name: "Reject",
                eventName: "rejectByOFCCEO",
                icon: <Clear />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN)
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: [
                      STATUS.OFFER_PROCESS.DHR_VERIFIED,
                      STATUS.OFFER_PROCESS.OFFCEO_APPROVED,
                    ],
                  },
                ],
              },
              {
                name: "Hire",
                eventName: "hire",
                icon: <DoneAll color="success" />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_TA_ADMIN)
                  ? false
                  : true,
                enable: [
                  {
                    field: "processStatus",
                    values: [STATUS.OFFER_PROCESS.OFFCEO_APPROVED],
                  },
                ],
              },
            ],
          },
        }}
        handleLinkEvent={(data) => {
          setModalType("viewCVFile");
          setEditJobOffer(data);
          setOpenFileModal(true);
        }}
        handleMoreEvent={(eName, data) => {
          if (!eName) return false;

          setModalType(eName);
          setEditJobOffer(data);
          setOpenOfferModal(true);
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
        handleViewFileEvent={(data) => {
          setModalType("viewEvaluateForm");
          setEditJobOffer(data);
          setOpenFileModal(true);
        }}
        handleViewSecFileEvent={(data) => {
          setModalType("viewReferenceForm");
          setEditJobOffer(data);
          setOpenFileModal(true);
        }}
        handleViewEvent={(data) => {
          setEditJobOffer(data);
          setOpenOfferDetailModal(true);
        }}
      />

      {/* Offer salary */}
      {openOfferModal && (
        <OfferJobFormModal
          modalType={modalType}
          open={openOfferModal}
          jobOffer={editJobOffer}
          onCloseModal={() => setOpenOfferModal(false)}
          handleEventSucceed={() => setIsReload(!isReload)}
        />
      )}

      {/* View file*/}
      {openFileModal && (
        <ViewFileModal
          modalTitle={mapFileModal[modalType]?.modalTitle}
          id={mapFileModal[modalType]?.viewFileById}
          downloadFileUrl={mapFileModal[modalType]?.downloadFileUrl}
          openModal={openFileModal}
          onCloseModal={() => setOpenFileModal(false)}
        />
      )}

      {/* Detail Job Offer */}
      {openOfferDetailModal && (
        <JobOfferFormDetailModal
          editJobOffer={editJobOffer}
          openModal={openOfferDetailModal}
          onCloseModal={() => setOpenOfferDetailModal(false)}
        />
      )}
    </>
  );
};

export default HomeJobOffer;