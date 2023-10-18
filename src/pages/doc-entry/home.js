import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertDocEntryForm from "./form-upsert-doc-entry.modal";

const HomeDocEntry = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editDocEntry, setEditDocEntry] = useState({});

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.docEntry.get}
                headers={TABLE_CONFIG.tblDocEntry}
                bannerText="All Documents"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                useTableActions={{
                    search: true,
                    refresh: true,
                    create: true,
                    edit: true,
                    viewFile: true
                }}
                filter={
                    {
                        columnOrder: "document_code",
                    }
                }
                onHandleAddNewEvent={() => setOpenModal(true)}
                handleEditEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenModal(true)
                }}
                isReloadData={isReload ? true : false}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleViewFileEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}
                handleLinkEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}
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

            {/* View file entry modal */}
            {
                openFileModal &&
                <ViewFileModal
                    openModal={openFileModal}
                    onCloseModal={() => setOpenFileModal(false)}
                    id={editDocEntry?.id}
                />
            }

        </>
    )
}

export default HomeDocEntry;