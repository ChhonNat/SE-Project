import React, { useState } from "react";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../components/AsyncDataTable/async-table-action";
import { STATUS } from "../../constants/status";
import CandidateAssessmentFormModal from "./form-accessment-candidate.modal";
import CandidateResultFormModal from "./form-result-candidate.modal";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";

const HomeInterview = () => {

    const [isReload, setIsReload] = useState(false);
    const [openAssessmentModal, setOpenAssessmentModal] = useState(false);
    const [openResultModal, setOpenResultModal] = useState(false);
    const [editCandidate, setEditCandidate] = useState({});
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);

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
                headers={TABLE_CONFIG.tblInterview}
                bannerText="All Interviews"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    editStatus: {
                        interviewResult: true,
                        status: true
                    },
                    approveCandidate: [
                        {
                            field: 'interviewResult',
                            values: [STATUS.INTERVIEW_RESULT.PASSED]
                        },
                        {
                            field: 'status',
                            values: [STATUS.INTERVIEW_STATUS.INVITED]
                        }
                    ],
                    edit: [
                        {
                            field: 'interviewResult',
                            values: [STATUS.INTERVIEW_RESULT.PASSED, STATUS.INTERVIEW_RESULT.FAILED, STATUS.INTERVIEW_RESULT.WAITING]
                        }
                    ]
                }}
                handleApproveEvent={(data) => {
                    setEditCandidate(data);
                    setOpenAssessmentModal(true);
                }}
                handleEditEvent={(data) => {
                    setEditCandidate(data);
                    setOpenResultModal(true)
                }}
                handleLinkEvent={(data) => {
                    setEditCandidate(data);
                    setOpenReviewCVModal(true);
                }}
                handleStatusEvent={
                    (key, data) => {
                       alert(key);
                    }
                }
            />

            {/* /**Make accessment modal */}
            <CandidateAssessmentFormModal
                openAssessmentCandidateModal={openAssessmentModal}
                onCloseAssessmentCandidateModal={() => setOpenAssessmentModal(false)}
                interview={editCandidate}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Update Candidate Result */}
            <CandidateResultFormModal
                openResultCandidateModal={openResultModal}
                onCloseResultCandidateModal={() => setOpenResultModal(false)}
                candidate={editCandidate}
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

export default HomeInterview;