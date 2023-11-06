import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Slide } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ConfirmModal from "../../components/Modal/confirm-delete";
import ViewFileModal from "../../components/Modal/view-file.modal";
import { API_URL } from "../../constants/api_url";
import { appConfig } from "../../constants/app_cont";
import { docEntryService } from "../../services/doc-entry.service";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertDocEntryForm from "./form-upsert-doc-entry.modal";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HomeDocEntry = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editDocEntry, setEditDocEntry] = useState({});

    const [openDelModal, setOpenDelModal] = useState(false);

    const currentYear = new Date().getFullYear();
    const earliestYear = 1970;
    const years = Array.from({ length: currentYear - earliestYear + 1 }, (_, index) => `${currentYear - index}`);


    const [fName, setFName] = useState(null);
    const [fNameKh, setFNameKh] = useState(null);
    const [fDepId, setFDepId] = useState(null);
    const [fCamId, setFCamId] = useState(null);
    const [fTypeId, setFTypeId] = useState(null);
    const [fMainId, setFMainId] = useState(null);
    const [fSubId, setFSubId] = useState(null);
    const [fIssueDate, setFIssueDate] = useState(null);
    const [fYear, setFYear] = useState(null);
    const [filterChanged, setFilterChanged] = useState(false);

    useEffect(() => {
        setFilterChanged(!filterChanged)
    }, [fName, fNameKh, fDepId, fCamId, fTypeId, fMainId, fSubId, fIssueDate, fYear]);

    const mapFilterEvent = {
        name: {
            action: (val) => setFName(val)
        },
        nameKh: {
            action: (val) => setFNameKh(val)
        },
        depId: {
            action: (val) => setFDepId(val)
        },
        camId: {
            action: (val) => setFCamId(val)
        },
        typeId: {
            action: (val) => setFTypeId(val)
        },
        mainCateId: {
            action: (val) => setFMainId(val)
        },
        subCateId: {
            action: (val) => setFSubId(val)
        },
        issuedDate: {
            action: (val) => setFIssueDate(val)
        },
        year: {
            action: (val) => setFYear(val)
        }
    };

    const resetFilter = () => {
        Object.keys(mapFilterEvent).map((key) => {
            mapFilterEvent[key].action(null);
        });
    };

    const enableResetFilter = fName || fNameKh || fDepId || fCamId || fTypeId || fMainId || fSubId || fIssueDate || fYear;

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

            if (success) {
                setOpenDelModal(false);
                setIsReload(!isReload);
            }


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
                isFilterChanged={filterChanged}
                filter={
                    {
                        columnOrder: "created_at",
                        orderBy: "DESC",
                        searchParams: {
                            fName: fName ? fName : "",
                            fNameKh: fNameKh ? fNameKh : "",
                            fDepId: fDepId ? fDepId : "",
                            fCamId: fCamId ? fCamId : "",
                            fTypeId: fTypeId ? fTypeId : "",
                            fMainId: fMainId ? fMainId : "",
                            fSubId: fSubId ? fSubId : "",
                            fIssueDate: fIssueDate ? fIssueDate : "",
                            fYear: fYear ? fYear : "",
                        }
                    }
                }
                useTableActions={{
                    search: true,
                    refresh: true,
                    create: true,
                    // view: true,
                    // delete: true,
                    // edit: true,
                    // viewFile: true,
                    filter: true,
                    filterOption: {
                        filters: [
                            {
                                grid: 2.9,
                                label: "Name (EN)",
                                filterName: "name",
                                type: "text",
                                value: fName ?? "",
                            },
                            {
                                grid: 0.1,
                            },
                            {
                                grid: 2.9,
                                label: "Name (KH)",
                                filterName: "nameKh",
                                type: "text",
                                value: fNameKh ?? "",
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Departments",
                                filterName: "depId",
                                type: "select",
                                selectOption: {
                                    asyncUrl: API_URL.lookup.department.get,
                                    bindField: "nameEn",
                                    value: fDepId ? fDepId : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Campus",
                                filterName: "camId",
                                type: "select",
                                selectOption: {
                                    asyncUrl: API_URL.lookup.campus.get,
                                    bindField: "nameEn",
                                    value: fCamId ? fCamId : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Types of Document",
                                filterName: "typeId",
                                type: "select",
                                selectOption: {
                                    asyncUrl: API_URL.lookup.listGDoc.get,
                                    bindField: "nameEn",
                                    value: fTypeId ? fTypeId : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Main Categories",
                                filterName: "mainCateId",
                                type: "select",
                                selectOption: {
                                    asyncUrl: API_URL.lookup.listMCate.get,
                                    bindField: "nameEn",
                                    value: fMainId ? fMainId : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Sub Categories",
                                filterName: "subCateId",
                                type: "select",
                                selectOption: {
                                    asyncUrl: API_URL.lookup.subCate.get,
                                    bindField: "nameEn",
                                    value: fSubId ? fSubId : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Issued Date",
                                fullFormat: true,
                                size: "small",
                                filterName: "issuedDate",
                                type: "fullDate",
                                value: fIssueDate ?? null,
                                selectOption: {
                                    value: fIssueDate ? fIssueDate : ""
                                }
                            },
                            {
                                grid: 2.9,
                                type: "select",
                                label: "Year",
                                filterName: "year",
                                selectOption: {
                                    customDatas: years,
                                    value: fYear ? fYear : ""
                                }
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                type: "custom",
                                component: <Button
                                    variant="contained"
                                    color="error"
                                    onClick={resetFilter}
                                    disabled={!enableResetFilter}
                                >Reset</Button>
                            },
                        ]
                    },
                    moreOption: {
                        buttons: [
                            {
                                name: "View File",
                                eventName: "viewFile",
                                icon: <VisibilityIcon color="primary" />,
                                enable: true
                            },
                            {
                                name: "Download File",
                                eventName: "downloadFile",
                                icon: <FileDownloadIcon color="info" />,
                                enable: true
                            },
                            {
                                name: "Edit",
                                eventName: "edit",
                                icon: <BorderColorIcon />,
                                enable: true
                            },
                            {
                                name: "Delete",
                                eventName: "delete",
                                icon: <DeleteOutlineIcon color="error" />,
                                enable: true
                            }
                        ]
                    }
                }}

                onHandleAddNewEvent={() => setOpenModal(true)}

                isReloadData={isReload ? true : false}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                // handleEditEvent={(data) => {
                //     setEditDocEntry(data);
                //     setOpenModal(true)
                // }}
                // handleViewFileEvent={async (data) => {
                //     if (!data.id)
                //         return;

                //     window.open(`${appConfig.apiLink}${API_URL.docEntry.downloadAllFile}${data.id}`, '_blank')
                // }}
                // handleViewEvent={(data) => {
                //     setEditDocEntry(data);
                //     setOpenFileModal(true);
                // }}
                // handleDeleteEvent={(data) => handleDelete(data.id)}
                handleLinkEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}
                handleViewEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenFileModal(true);
                }}

                handleFilterEvent={(fName, value) => {
                    mapFilterEvent[fName].action(value?.id ? value.id : value);
                }}
                handleMoreEvent={(eName, data) => {

                    if (!eName)
                        return;

                    if (eName === 'viewFile') {
                        setEditDocEntry(data);
                        setOpenFileModal(true);
                    }

                    if (eName === 'downloadFile') {
                        window.open(`${appConfig.apiLink}${API_URL.docEntry.downloadAllFile}${data.id}`, '_blank')
                    }

                    if (eName === 'edit') {
                        setEditDocEntry(data);
                        setOpenModal(true)
                    }

                    if (eName === 'delete') {
                        setEditDocEntry(data);
                        setOpenDelModal(true);
                    }
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

            {/* Confirm delete modal when click on delete button */}
            <ConfirmModal
                TransitionModal={TransitionModal}
                open={openDelModal}
                onHandleCloseModal={() => setOpenDelModal(false)}
                onHandleDelete={() => handleDelete(editDocEntry?.id)}
            />
        </>
    )
}

export default HomeDocEntry;