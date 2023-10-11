import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertDocEntryForm from "./form-upsert-doc-entry.modal";

const HomeDocEntry = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editDocEntry, setEditDocEntry] = useState({});

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.docEntry.get}
                headers={TABLE_CONFIG.tblGroupDocument}
                bannerText="Document Entry"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                useTableActions={{
                        search: false,
                        refresh: true,
                        create: true,
                        edit: true
                }}
                onHandleAddNewEvent={() => setOpenModal(true)}
                handleEditEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenModal(true)
                }}
                isReloadData={isReload ? true : false}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />

            {/* Create and Update form */}

            {
                openModal &&
                <UpsertDocEntryForm
                    open={openModal}
                    onCloseModal={() => {
                        setEditDocEntry({})
                        setOpenModal(false)
                    }
                    }
                    handleEventSucceed={() => setIsReload(!isReload)}
                    docEntry={editDocEntry}
                />
            }

        </>
    )
}

export default HomeDocEntry;