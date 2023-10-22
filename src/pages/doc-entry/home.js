import React, { useEffect, useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertDocEntryForm from "./form-upsert-doc-entry.modal";
import { docEntryService } from "../../services/doc-entry.service";
import Swal from "sweetalert2";
import { appConfig } from "../../constants/app_cont";

const HomeDocEntry = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editDocEntry, setEditDocEntry] = useState({});

    const currentYear = new Date().getFullYear();
    const earliestYear = 1970;
    const years = Array.from({ length: currentYear - earliestYear + 1 }, (_, index) => currentYear - index);

    const [fName, setFName] = useState("");
    const [fNameKh, setFNameKh] = useState("");
    const [fDepId, setFDepId] = useState("");
    const [fCamId, setFCamId] = useState("");
    const [fTypeId, setFTypeId] = useState("");
    const [fMainId, setFMainId] = useState("");
    const [fSubId, setFSubId] = useState("");
    const [fIssueDate, setFIssueDate] = useState("");
    const [fYear, setFYear] = useState(0);

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
                isFilterChanged={filterChanged}
                filter={
                    {
                        columnOrder: "document_code",
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
                    view: true,
                    delete: true,
                    edit: true,
                    viewFile: true,
                    filter: true,
                    filterOption: {
                        filters: [
                            {
                                grid: 2.9,
                                label: "Name",
                                filterName: "name",
                                type: "text",
                                value: fName ? fName : "",
                            },
                            {
                                grid: 0.1,
                            },
                            {
                                grid: 2.9,
                                label: "Name (Kh)",
                                filterName: "nameKh",
                                type: "text",
                                value: fNameKh ? fNameKh : "",
                            },
                            {
                                grid: 0.1
                            },
                            {
                                grid: 2.9,
                                label: "Department",
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
                                label: "Type Document",
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
                                label: "Main Category",
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
                                label: "Sub Category",
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
                                label: "Issued Datae",
                                filterName: "issuedDate",
                                type: "date",
                                selectOption: {
                                    value: fIssueDate ? fIssueDate : ""
                                }
                            },
                            {
                                grid: 2.9,
                                label: "Year",
                                filterName: "year",
                                type: "select",
                                selectOption: {
                                    customDatas: years,
                                    value: fYear ? fYear : ""
                                }
                            },
                        ]
                    },
                }}

                onHandleAddNewEvent={() => setOpenModal(true)}
                handleEditEvent={(data) => {
                    setEditDocEntry(data);
                    setOpenModal(true)
                }}
                isReloadData={isReload ? true : false}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
                handleViewFileEvent={async (data) => {
                    if (!data.id)
                        return;

                    window.open(`${appConfig.apiLink}${API_URL.docEntry.downloadAllFile}${data.id}`, '_blank')
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
                handleFilterEvent={(fName, value) => {
                    mapFilterEvent[fName].action(value?.id ? value.id : value);
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