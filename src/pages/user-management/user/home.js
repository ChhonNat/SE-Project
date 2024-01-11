import { Slide } from "@mui/material";
import React, { forwardRef, useState } from "react";
import Swal from "sweetalert2";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import ConfirmModal from "../../../components/Modal/confirm-delete";
import { API_URL } from "../../../constants/api_url";
import { userService } from "../../../services/user.service";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertUserForm from "./form-upsert-user.modal";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HomeUser = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [openDelModal, setOpenDelModal] = useState(false);
    const [editUer, seteditUer] = useState({});


    const handleDelete = async (id) => {
        try {

            const reqDeleteDoc = await userService.deleteUser(id);

            const { data } = reqDeleteDoc;
            const { success, message } = data;

            Swal.fire({
                title: success ? "Success" : "Warning",
                text: message,
                icon: success ? "success" : "warning",
                confirmButtonText: "OK",
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
                asyncURL={API_URL.user.get}
                headers={TABLE_CONFIG.tblUser}
                bannerText="All Users"
                searchPlaceHolder="Search"
                disableTablePagination={true}
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
                    setEditUser(data);
                    setOpenModal(true)
                }}
                isReloadData={isReload ? true : false}
                handleDeleteEvent={(data) => handleDelete(data.id)}
                onHandleRefreshEvent={() => setIsReload(!isReload)}
            />

            {/* Create and Update form */}

            {
                openModal &&
                <UpsertUserForm
                    open={openModal}
                    onCloseModal={() => {
                        setEditUser({})
                        setOpenModal(false)
                    }
                    }
                    handleEventSucceed={() => setIsReload(!isReload)}
                    user={editUser}
                />
            }


            {/* Confirm delete modal when click on delete button */}
            <ConfirmModal
                TransitionModal={TransitionModal}
                open={openDelModal}
                onHandleCloseModal={() => setOpenDelModal(false)}
                onHandleDelete={() => handleDelete(editUer?.id)}
            />

        </>
    )
}

export default HomeUser;