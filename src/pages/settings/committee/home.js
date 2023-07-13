import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertCommitteeForm from "./form-upsert-committee.modal";

const HomeCommittee = () => {

    const [isReload, setIsReload] = useState(false);
    const [openCommitteeModal, setOpenCommitteeModal] = useState(false);
    const [editCommittee, setEditCommittee] = useState({});

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
                asyncURL={API_URL.committeee.get}
                headers={TABLE_CONFIG.tblHeadDepartment}
                bannerText="All Committees"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenCommitteeModal(true)}
                handleEditEvent={(data) => {
                    setEditCommittee(data);
                    setOpenCommitteeModal(true);
                }}
            />

            {/* Form create and update head department */}
            <UpsertCommitteeForm
                title={editCommittee?.id ? "Edit committee" : "Add committee"}
                openModal={openCommitteeModal}
                onCloseModal={() => {
                    setEditCommittee({});
                    setOpenCommitteeModal(false);
                }
                }
                handleEventSuccessed={() => setIsReload(!isReload)}
                editData={editCommittee}
            />
        </>
    )
};

export default HomeCommittee;