import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import ReferenceResultFormModal from "./reference-result-form.modal";
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";

import { DoneAll, Print } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";

const HomeAssessment = () => {

    const user = useSelector((state) => state?.userAuthendicated);

    const [editCandidate, setEditCandidate] = useState({});
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [openReferenceResultModal, setOpenReferenceResultModal] = useState(false);
    const [isReload, setIsReload] = useState(false);

    const mapMoreButtonEventName = {
        "checkCandidateReference": {
            handleAction: () => setOpenReferenceResultModal(true)
        },
        "printReferenceForm": {
            handleAction: () => window.print()
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
                asyncURL={API_URL.interview.get}
                headers={TABLE_CONFIG.tblReferenceCheck}
                bannerText="All Reference Checks"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    moreOption: {
                        buttons: [
                            {
                                name: 'Background Check',
                                eventName: 'checkCandidateReference',
                                icon: <HowToRegIcon />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_TEAM) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Print Form',
                                eventName: 'printReferenceForm',
                                icon: <Print />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE?.ROLE_TA_TEAM) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Verify',
                                eventName: 'verifyJobOffer',
                                icon: <DoneAll />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_HR_MANAGER) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Approve',
                                eventName: 'approveJobOffer',
                                icon: <DoneAll />,
                                hidden: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                enable: true
                            }
                        ]
                    }
                }}

                handleMoreEvent={(eName, data) => {
                    if (!eName)
                        return false;

                    setEditCandidate(data);
                    mapMoreButtonEventName[eName].handleAction();
                }}
                handleLinkEvent={
                    (data) => {
                        setEditCandidate(data);
                        setOpenReviewCVModal(true);
                    }
                }
            />

            {/* Reference result form */}
            <ReferenceResultFormModal
                candidate={editCandidate}
                open={openReferenceResultModal}
                onCloseModal={() => setOpenReferenceResultModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <ViewFileModal
                modalTitle="Review CV"
                id={editCandidate?.candidateId}
                openModal={openReviewCVModal}
                onCloseModal={() => setOpenReviewCVModal(false)}
            />

        </>
    )
};

export default HomeAssessment;