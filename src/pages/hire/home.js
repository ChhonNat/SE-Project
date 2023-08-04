import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import ViewFileModal from "../../components/Modal/view-file.modal";

const HomeHire = () => {

    const [isReload, setIsReload] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editHire, setEditHire] = useState({});
    const [openFileModal, setOpenFileModal] = useState(false);

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
                    refresh: true
                }}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleLinkEvent={
                    (data) => {
                        setModalType('viewCVFile');
                        setEditHire(data);
                        setOpenFileModal(true);
                    }
                }
            />


            {/* View File */}
            {
                openFileModal &&
                <ViewFileModal
                    modalTitle={'View CV'}
                    id={editHire?.candidate?.id}
                    downloadFileUrl={API_URL.hire.downloadCVFile}
                    openModal={openFileModal}
                    onCloseModal={() => setOpenFileModal(false)}
                />
            }

        </>
    )
};

export default HomeHire;