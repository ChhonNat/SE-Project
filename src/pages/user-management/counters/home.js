import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertCounterForm from "./form-upsert-counter.modal";

const HomeCounter = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editUser, setEditUser] = useState({});

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.counter.get}
                headers={TABLE_CONFIG.tbCounter}
                bannerText="Counters"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                useTableActions={{
                        search: true,
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
                <UpsertCounterForm
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

export default HomeCounter;