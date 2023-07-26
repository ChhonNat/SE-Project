import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import PositionModel from "../../../models/position/position.model";
import UpsertPositionForm from "./form-upsert-position";
import { KEY_POST } from "../../../constants/key_post";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";

const HomePosition = () => {

    const [isReload, setIsReload] = useState(false);
    const [editPosition, setEditPosition] = useState({});
    const [openPositionModal, setOpenPositionModal] = useState(false);

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
                asyncURL={API_URL.position.get}
                headers={TABLE_CONFIG.tblPosition}
                bannerText="All Positions"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenPositionModal(true)}
                handleEditEvent={(data) => {
                    setEditPosition(data);
                    setOpenPositionModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertPositionForm
                title={editPosition?.id ? "Edit Position" : "Add New Position"}
                openModal={openPositionModal}
                editData={editPosition}
                onCloseModal={() => {
                    setEditPosition({});
                    setOpenPositionModal(false);
                }}
                model={PositionModel}
                keyPosts={KEY_POST.position}
                postUrl={API_URL.position.create}
                putUrl={API_URL.position.edit}
                dataType={'/position'}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />
        </>
    )
}

export default HomePosition;