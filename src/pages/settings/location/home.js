import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../../components/AsyncDataTable/async-table-action";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import LocationModel from "../../../models/location.model";
import { KEY_POST } from "../../../constants/key_post";
import UpsertForm from "../form/upsert";

const HomeLocation = () => {
    const [isReload, setIsReload] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [editLocation, setEditLocation] = useState({});

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
                asyncURL={API_URL.location.get}
                headers={TABLE_CONFIG.tblLocation}
                bannerText="All Locations"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenLocationModal(true)}
                handleEditEvent={(data) => {
                    setEditLocation(data);
                    setOpenLocationModal(true);
                }}
            />

            {/* Modal create and update */}
            <UpsertForm
                title={editLocation?.id ? "Edit location" : "Add new location"}
                openModal={openLocationModal}
                editData={editLocation}
                onCloseModal={() => {
                    setEditLocation(LocationModel);
                    setOpenLocationModal(false);
                }}
                model={LocationModel}
                keyPosts={KEY_POST.location}
                postUrl={API_URL.location.create}
                putUrl={API_URL.location.edit}
                dataType={'/location'}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />
        </>
    )
};

export default HomeLocation;