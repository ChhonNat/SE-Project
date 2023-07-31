import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import ReferenceResultFormModal from "./reference-result-form.modal";
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";

import { DoneAll, NextPlan, Print } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import ReferenceFormDetailModal from "./detail-reference-form.modal";
import { STATUS } from "../../constants/status";
import OfferJobFormModalFormModal from "./offer-job-form.modal";

const HomeAssessment = () => {

    const user = useSelector((state) => state?.userAuthendicated);

    const [editReference, setEditReferencce] = useState({});
    const [openFileFormModal, setOpenFileFormModal] = useState(false);
    const [openReferenceResultModal, setOpenReferenceResultModal] = useState(false);
    const [openReferenceDetailModal, setOpenReferenceDetailModal] = useState(false);
    const [openOfferJobModal, setOpenOfferJobModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');

    const [isReload, setIsReload] = useState(false);

    const mapMoreButtonEventName = {
        "checkReferenceCandidate": {
            handleAction: () => setOpenReferenceResultModal(true)
        },
        "offerCandidateJob": {
            handleAction: () => setOpenOfferJobModal(true)
        }
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
                asyncURL={API_URL.referenceCheck.get}
                headers={TABLE_CONFIG.tblReferenceCheck}
                bannerText="All Reference Checks"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    view: true,
                    viewEvaluateFile: true,
                    viewEvaluateFile: [
                        {
                            field: 'checkResult',
                            values: [
                                STATUS.REFERENCE_RESULT.POSITIVE,
                                STATUS.REFERENCE_RESULT.NEGATIVE
                            ]
                        }
                    ],
                    moreOption: {
                        buttons: [
                            {
                                name: 'Check Background Result',
                                eventName: 'checkReferenceCandidate',
                                icon: <HowToRegIcon />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_TEAM) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Offer Job',
                                eventName: 'offerCandidateJob',
                                icon: <NextPlan />,
                                hidden: !user?.roles ? false : [ROLE.ROLE_TA_TEAM, ROLE.ROLE_TA_ADMIN].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: [
                                    {
                                        field: 'checkResult',
                                        values: [STATUS.REFERENCE_RESULT.POSITIVE]
                                    }
                                ]
                            },
                            {
                                name: 'Verify',
                                eventName: 'verifyJobOffer',
                                icon: <DoneAll />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_HR_MANAGER) ? false : true,
                                enable: false
                            },
                            {
                                name: 'Approve',
                                eventName: 'approveJobOffer',
                                icon: <DoneAll />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                enable: false
                            },
                            // {
                            //     name: 'Print Form',
                            //     eventName: 'printReferenceForm',
                            //     icon: <Print />,
                            //     hidden: !user?.roles ? false : user?.roles?.includes(ROLE?.ROLE_TA_TEAM) ? false : true,
                            //     enable: true
                            // },
                        ]
                    }
                }}
                handleMoreEvent={(eName, data) => {
                    if (!eName)
                        return false;

                    setEditReferencce(data);
                    mapMoreButtonEventName[eName].handleAction();
                }}
                handleLinkEvent={
                    (data) => {
                        setTypeModal('viewCVFile');
                        setEditReferencce(data);
                        setOpenFileFormModal(true);
                    }
                }
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleViewEvent={(data) => {
                    setEditReferencce(data);
                    setOpenReferenceDetailModal(true);
                }}
                handleViewFileEvent={(data) => {
                    setTypeModal('viewRefForm');
                    setEditReferencce(data);
                    setOpenFileFormModal(true)
                }}
            />

            {/* Reference result form modal */}
            <ReferenceResultFormModal
                reference={editReference}
                open={openReferenceResultModal}
                onCloseModal={() => setOpenReferenceResultModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form modal*/}
            <ViewFileModal
                modalTitle={typeModal === 'viewCVFile' ? '' : 'Review Reference Form'}
                id={typeModal === 'viewCVFile' ? editReference?.candidate?.id : editReference?.id}
                downloadFileUrl={typeModal === 'viewCVFile' ? null : API_URL.referenceCheck.downloadRefForm}
                openModal={openFileFormModal}
                onCloseModal={() => setOpenFileFormModal(false)}
            />

            {/* Detail reference form modal*/}
            <ReferenceFormDetailModal
                reference={editReference}
                openReferenceDetailModal={openReferenceDetailModal}
                onCloseReferenceDetailModal={() => setOpenReferenceDetailModal(false)}
            />

            {/* Offer Job form modal*/}
            <OfferJobFormModalFormModal 
                reference={editReference}
                openOfferJobModal={openOfferJobModal}
                onCloseOfferJobModal={() => setOpenOfferJobModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
};

export default HomeAssessment;