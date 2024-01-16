import React, { useState } from "react";
import Swal from "sweetalert2";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { Service } from "../../../services/service.service";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertServiceForm from "./form-insert";

const HomeService = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [edit, setEdit] = useState({});

    const handleDelete = async (id) => {
        try {

            const resp = await Service.deleteService(id);

            const { data } = resp;
            const { success, message } = data;

            Swal.fire({
                title: success ? "Success" : "Warning",
                text: message,
                icon: success ? "success" : "warning",
                confirmButtonText: "OK",
            });

            if (success) {
                setOpenModal(false);
                setIsReload(!isReload);
            }


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.service.get}
                headers={TABLE_CONFIG.tblService}
                bannerText="Services"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                useTableActions={{
                    search: false,
                    refresh: true,
                    create: true,
                    edit: true,
                    delete: true
                }}
                onHandleAddNewEvent={() => setOpenModal(true)}
                handleEditEvent={(data) => {
                    setEdit(data);
                    setOpenModal(true)
                }}
                handleDeleteEvent={(data) => handleDelete(data.id)}
                isReloadData={isReload ? true : false}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />

            {/* Create and Update form */}

            {
                openModal &&
                <UpsertServiceForm
                    open={openModal}
                    onCloseModal={() => {
                        setEdit({})
                        setOpenModal(false)
                    }
                    }
                    handleEventSucceed={() => setIsReload(!isReload)}
                    service={edit}
                />
            }

        </>
    )
}

export default HomeService;