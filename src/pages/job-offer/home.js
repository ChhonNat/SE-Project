import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import OfferJobFormModal from "./offer-job-form.modal";

import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import { useSelector } from "react-redux";
import { AttachMoney, DoneAll } from "@mui/icons-material";
import { ROLE } from "../../constants/roles";
import { STATUS } from "../../constants/status";

const HomeJobOffer = () => {

    const user = useSelector((state) => state?.userAuthendicated);
    const [isReload, setIsReload] = useState(false);
    const [editJobOffer, setEditJobOffer] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');

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
                    // view: true,
                    moreOption: {
                        buttons: [
                            {
                                name: 'Job Offer',
                                eventName: 'offer',
                                icon: <AttachMoney color="info" />,
                                hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER) ? false : true,
                                enable: [
                                    {
                                        field: 'processStatus',
                                        values: [STATUS.OFFER_PROCESS.PENDING]
                                    }
                                ]
                            },
                            {
                                name: 'Verify',
                                eventName: 'verify',
                                icon: <DoneAll color="info" />,
                                hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HR_MANAGER) ? false : true,
                                enable: [
                                    {
                                        field: 'processStatus',
                                        values: [STATUS.OFFER_PROCESS.HOD_APPROVED]
                                    }
                                ]
                            },
                            {
                                name: 'Approve',
                                eventName: 'approve',
                                icon: <DoneAll color="info" />,
                                hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                enable: [
                                    {
                                        field: 'processStatus',
                                        values: [STATUS.OFFER_PROCESS.DHR_VERIFIED]
                                    }
                                ]
                            }
                        ]
                    }
                }}
                handleMoreEvent={(eName, data) => {
                    if (!eName)
                        return false;

                    setModalType(eName);
                    setEditJobOffer(data);
                    setOpenModal(true);
                }}
                onHandleRefreshEvent={() =>
                    setIsReload(!isReload)
                }
            />

            {/* Offer salary */}
            <OfferJobFormModal 
                modalType={modalType}
                open={openModal}
                jobOffer={editJobOffer}
                onCloseModal={() => setOpenModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />
        </>
    )
};

export default HomeJobOffer;