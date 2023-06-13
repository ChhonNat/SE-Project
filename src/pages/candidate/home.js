import React, { useState } from "react";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../components/AsyncDataTable/async-table-action";
import CandidateFormModal from "./form-candidate.modal";
import CandidateApproveFormModal from "./form-approve-candidate.modal";


const HomeCandidate = () => {

    const [selectedData, setSelectedData] = useState({ open: false, row: {} });
    const [isReload, setIsReload] = useState(false);
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [openEditCandidateModal, setOpenEditCandidateModal] = useState(false);
    const [openApproveCandidateModal, setOpenApproveCandidateModal] = useState(false);

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
                onHandleAddNewEvent={() => setOpenAddCandidateModal(true)}
                useTableActions={{ search: true, create: true, delete: true }}
                customActions={
                    <AsyncTableAction
                        useActions={{ approveCandidate: true, edit: true, delete: true }}
                        onHandleEditEvent={() => setOpenEditCandidateModal(true)}
                        onHandleApproveCandidateEvent={() => setOpenApproveCandidateModal(true)}
                    />
                }
            />

            {/* Create new candidate form */}
            <CandidateFormModal
                modalTitle="New Candidate"
                openCandidateModal={openAddCandidateModal}
                onCloseCandidateModal={() => setOpenAddCandidateModal(false)}
            />

            {/* Edit candidate form */}
            <CandidateFormModal
                modalTitle="Edit Candidate"
                openCandidateModal={openEditCandidateModal}
                onCloseCandidateModal={() => setOpenEditCandidateModal(false)}
            />

            {/* Approve candidate form */}
            <CandidateApproveFormModal
                openApproveCandidateModal={openApproveCandidateModal}
                onCloseApproveCandidateModal={() => setOpenApproveCandidateModal(false)}
            />
        </>
    )
};

export default HomeCandidate;