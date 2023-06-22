import React, { useState } from "react";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import CandidateFormModal from "./form-candidate.modal";
import CandidateInviteFormModal from "./form-invite-candidate.modal";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";
import { STATUS } from "../../constants/status";


const HomeCandidate = () => {

    const [selectedData, setSelectedData] = useState({ open: false, row: {} });
    const [isReload, setIsReload] = useState(false);
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [openEditCandidateModal, setOpenEditCandidateModal] = useState(false);
    const [openApproveCandidateModal, setOpenApproveCandidateModal] = useState(false);
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [editCandidate, setEditCandidate] = useState({});

    // Handle click each candidate to update the info
    const handleEditCandidate = (candidate) => {
        setEditCandidate(candidate);
        setOpenEditCandidateModal(true);
    };

    // handle click each candidate to update shortlist
    const handleShortlistCandidate = (candidate) => {

        setEditCandidate(candidate);
        setOpenApproveCandidateModal(true);
    };

    //handle review candidate before shortlist
    const handleReviewCandidate = (candidate) => {
        setEditCandidate(candidate);
        setOpenReviewCVModal(true);
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
                setSelectedData={setSelectedData}
                asyncURL={API_URL.candidate.get}
                headers={TABLE_CONFIG.tblCandidate}
                bannerText="All Candidates"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={
                    {
                        search: true,
                        create: true,
                        delete: false,
                        edit: true,
                        approveCandidate: [
                            {
                                field: 'shortlistResult',
                                values: [STATUS.SHORTLIST_RESULT.PASSED]
                            },
                            {
                                field: 'status',
                                values: [STATUS.CANDIDATE.CV_REVIEWED]
                            }
                        ],
                        // reviewCandidate: [
                        //     {
                        //         field: 'status',
                        //         values: [STATUS.CANDIDATE.PENDING]
                        //     }
                        // ]
                    }
                }
                onHandleAddNewEvent={() => setOpenAddCandidateModal(true)}
                handleApproveEvent={(data) => handleShortlistCandidate(data)}
                handleEditEvent={(data) => handleEditCandidate(data)}
                handleReviewEvent={(data) => handleEditCandidate(data)}
                handleLinkEvent={(data) => handleReviewCandidate(data)}
            />

            {/* Create new candidate form */}
            <CandidateFormModal
                modalTitle="New Candidate"
                openCandidateModal={openAddCandidateModal}
                onCloseCandidateModal={() => setOpenAddCandidateModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Edit candidate form */}
            <CandidateFormModal
                modalTitle="Edit Candidate"
                candidate={editCandidate}
                openCandidateModal={openEditCandidateModal}
                onCloseCandidateModal={() => setOpenEditCandidateModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Approve candidate form */}
            <CandidateInviteFormModal
                candidate={editCandidate}
                openApproveCandidateModal={openApproveCandidateModal}
                onCloseApproveCandidateModal={() => setOpenApproveCandidateModal(false)}
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

export default HomeCandidate;