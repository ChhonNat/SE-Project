import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import CandidateHireFormModal from "./form-hire-candidate.modal";
import { STATUS } from "../../constants/status";
import CandidateOfferFormModal from "./form-offer-candidate.modal";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";

const HomeAssessment = () => {

    const [openAssessmentModal, setOpenAssessmentModal] = useState(false);
    const [openOfferModal, setOpenOfferModal] = useState(false);

    const [editCandidate, setEditCandidate] = useState({});
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [isReload, setIsReload] = useState(false);

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
                asyncURL={API_URL.assessment.get}
                headers={TABLE_CONFIG.tblAssessment}
                bannerText="All Assessments"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    approveCandidate: [
                        {
                            field: 'status',
                            values: [STATUS.ASSESSMENT_RESULT.OFFERED]
                        }
                    ],
                    edit: [
                        {
                            field: 'status',
                            values: [STATUS.ASSESSMENT_RESULT.OFFERED, STATUS.ASSESSMENT_RESULT.SUSPENDED, STATUS.ASSESSMENT_RESULT.CANCELlED]
                        }
                    ]
                }}
                handleApproveEvent={
                    (data) => {
                        setEditCandidate(data);
                        setOpenAssessmentModal(true);
                    }
                }
                handleEditEvent={
                    (data) => {
                        setEditCandidate(data);
                        setOpenOfferModal(true);
                    }
                }
                handleLinkEvent={
                    (data) => {
                        setEditCandidate(data);
                        setOpenReviewCVModal(true);
                    }
                }
            />

            {/* Accesment modal to update the candidate to hire */}
            <CandidateHireFormModal
                openHireCandidateModal={openAssessmentModal}
                onCloseHireCandidateModal={() => setOpenAssessmentModal(false)}
                assessment={editCandidate}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Offer candidate form */}
            <CandidateOfferFormModal
                openOfferCandidateModal={openOfferModal}
                onCloseOfferCandidateModal={() => setOpenOfferModal(false)}
                assessment={editCandidate}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <CandidateReviewCVModal
                modalTitle="Review CV"
                candidate={editCandidate}
                openReviewCVModal={openReviewCVModal}
                onCloseReviewCVModal={() => setOpenReviewCVModal(false)}
            />

        </>
    )
};

export default HomeAssessment;