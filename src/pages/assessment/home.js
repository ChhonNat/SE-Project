import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import CandidateHireFormModal from "./form-hire-candidate.modal";

const HomeAssessment = () => {

    const [openAssessmentModal, setOpenAssessmentModal] = useState(false);
    const [editCandidate, setEditCandidate] = useState({});

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
                            values: ['Offered']
                        }
                    ],
                }}
                handleApproveEvent={
                    (data) => {
                        setEditCandidate(data);
                        setOpenAssessmentModal(true)
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

        </>
    )
};

export default HomeAssessment;