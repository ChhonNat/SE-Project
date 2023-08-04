import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import ViewFileModal from "../../components/Modal/view-file.modal";
import HireFormDetailModal from "./detail-hire-form.modal";

const HomeHire = () => {

    const [isReload, setIsReload] = useState(false);
    const [editHire, setEditHire] = useState({});
    const [openFileModal, setOpenFileModal] = useState(false);
    const [openHireDetailModal, setOpenHireDetailModal] = useState(false);

    const [modalType, setModalType] = useState('');

    const mapFileModal = {
        'viewCVFile': {
            modalTitle: 'View CV',
            viewFileById: editHire?.candidate?.id,
            downloadFileUrl: null
        },
        'viewJobOfferForm': {
            modalTitle: 'View Job Offer Form',
            viewFileById: editHire?.id,
            downloadFileUrl: API_URL.hire.downloadCVFile
        },
        // 'viewEvaluateForm': {
        //     modalTitle: 'View Evaluate Form',
        //     viewFileById: editHire?.interview?.id,
        //     downloadFileUrl: API_URL.interview.downloadEvaluateForm
        // },
        // 'viewReferenceForm': {
        //     modalTitle: 'View Reference Form',
        //     viewFileById: editHire?.referenceCheck?.id,
        //     downloadFileUrl: API_URL.referenceCheck.downloadRefForm
        // },
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
                asyncURL={API_URL.hire.get}
                headers={TABLE_CONFIG.tblHire}
                bannerText="All Hire Applicants"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    refresh: true,
                    view: true,
                    viewThirdFile: true
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleLinkEvent={
                    (data) => {
                        setModalType('viewCVFile');
                        setEditHire(data);
                        setOpenFileModal(true);
                    }
                }
                handleViewEvent={(data) => {
                    setEditHire(data);
                    setOpenHireDetailModal(true);
                }}
                handleViewThirdFileEvent={(data) => {
                    setModalType('viewJobOfferForm');
                    setEditHire(data);
                    setOpenFileModal(true)
                }}
            />


            {/* View File */}
            {
                openFileModal &&
                <ViewFileModal
                    modalTitle={mapFileModal[modalType]?.modalTitle}
                    id={mapFileModal[modalType]?.viewFileById}
                    downloadFileUrl={mapFileModal[modalType]?.downloadFileUrl}
                    openModal={openFileModal}
                    onCloseModal={() => setOpenFileModal(false)}
                />
            }

            {/* View Hire Detail */}
            {
                openHireDetailModal &&
                <HireFormDetailModal
                    openModal={openHireDetailModal}
                    onCloseModal={() => setOpenHireDetailModal(false)}
                    editHire={editHire}
                />
            }

        </>
    )
};

export default HomeHire;