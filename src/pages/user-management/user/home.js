import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertUserForm from "./form-upsert-user.modal";

const HomeUser = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editUser, setEditUser] = useState({});

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.user.get}
                headers={TABLE_CONFIG.tblUser}
                bannerText="All Users"
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
                    setEditUser(data);
                    setOpenModal(true)
                }}
                isReloadData={isReload ? true : false}
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

        </>
    )
}

export default HomeUser;