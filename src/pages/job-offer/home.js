import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import ReferenceResultFormModal from "./reference-result-form.modal";
import ReferenceFormDetailModal from "./detail-reference-form.modal";

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import { useSelector } from "react-redux";

const HomeJobOffer = () => {

    const user = useSelector((state) => state?.userAuthendicated);

    const [editCandidate, setEditCandidate] = useState({});
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [openReferenceResultModal, setOpenReferenceResultModal] = useState(false);
    const [openReferenceDetailModal, setOpenReferenceDetailModal] = useState(false);

    const [isReload, setIsReload] = useState(false);

    const mapMoreButtonEventName = {
        "checkReferenceCandidate": {
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
                asyncURL={API_URL.jobOffer.get}
                headers={TABLE_CONFIG.tblJobOffer}
                bannerText="All Job Offers"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{
                    search: true,
                    view: true,
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
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleViewEvent={(data) => 
                    {
                        setEditCandidate(data);
                        setOpenReferenceDetailModal(true);
                    }
                }
            />

            {/* Reference result form */}
            <ReferenceResultFormModal
                reference={editCandidate}
                open={openReferenceResultModal}
                onCloseModal={() => setOpenReferenceResultModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <ViewFileModal
                modalTitle="Review CV"
                id={editCandidate?.candidate?.id}
                openModal={openReviewCVModal}
                onCloseModal={() => setOpenReviewCVModal(false)}
            />

            {/* Detail reference form */}
            <ReferenceFormDetailModal
                reference={editCandidate}
                openReferenceDetailModal={openReferenceDetailModal}
                onCloseReferenceDetailModal={() => setOpenReferenceDetailModal(false)}
            />
        </>
    )
};

export default HomeJobOffer;