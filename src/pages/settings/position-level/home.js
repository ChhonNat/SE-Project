import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import PositionModel from "../../../models/position.model";
import { KEY_POST } from "../../../constants/key_post";
import UpsertPositionForm from "./form-upsert-position";

const HomePositionLevel = () => {

    const [isReload, setIsReload] = useState(false);
    const [editPositionLevel, setEditPositionLevel] = useState({});
    const [openPositionLevelModal, setOpenPositionLevelModal] = useState(false);

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
                asyncURL={API_URL.positionLevel.get}
                headers={TABLE_CONFIG.tblPositionLevel}
                bannerText="All Position Levels"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenPositionLevelModal(true)}
                handleEditEvent={(data) => {
                    setEditPositionLevel(data);
                    setOpenPositionLevelModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertPositionForm
                title={editPositionLevel?.id ? "Edit Position Level" : "Add Position Level"}
                openModal={openPositionLevelModal}
                editData={editPositionLevel}
                onCloseModal={() => {
                    setEditPositionLevel(PositionModel);
                    setOpenPositionLevelModal(false);
                }}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />
        </>
    )
}

export default HomePositionLevel;