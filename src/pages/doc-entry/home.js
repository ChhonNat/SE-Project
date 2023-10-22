import React, { useState } from "react";
import Swal from "sweetalert2";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import { API_URL } from "../../constants/api_url";
import { appConfig } from "../../constants/app_cont";
import { docEntryService } from "../../services/doc-entry.service";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertDocEntryForm from "./form-upsert-doc-entry.modal";

const HomeDocEntry = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editDocEntry, setEditDocEntry] = useState({});

    const handleDelete = async (id) => {
        try {

            const reqDeleteDoc = await docEntryService.deleteDocEntry(id);

            const { data } = reqDeleteDoc;
            const { success, message } = data;

            Swal.fire({
                title: success ? "Success" : "Warning",
                text: message,
                icon: success ? "success" : "warning",
                confirmButtonText: "OK",
                size: 200,
            });


        } catch (error) {
            console.log(error);
        }
    };

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
                    view: true,
                    delete: true,
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
                handleViewFileEvent={async (data) => {
                    if(!data.id)
                    return;

                    window.open(`${appConfig.apiLink}${API_URL.docEntry.downloadAllFile}${data.id}`,'_blank')
                }}
                handleLinkEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}
                handleViewEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}
                handleDeleteEvent={(data) => handleDelete(data.id)}
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