import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { TABLE_CONFIG } from "../../utils/table-config";
import UpsertUserForm from "./form-upsert-user.modal";

const HomeUser = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <AsyncDatatable
                headers={TABLE_CONFIG.tblUser}
                bannerText="All Users"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                useTableActions={
                    {
                        search: true,
                        create: true
                    }
                }
                onHandleAddNewEvent={() => setOpenModal(true)}
            />

            {/* Create and Update form */}

            <UpsertUserForm 
                open={openModal}
                onCloseModal={() => setOpenModal(false)}
            />
        </>
    )
}

export default HomeUser;