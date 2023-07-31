import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import DepartmentModel from "../../../models/department/department.model";
import { KEY_POST } from "../../../constants/key_post";
import UpsertDepartmentForm from "./form-upsert-department.model";


const HomeDepartment = () => {

    const [openDepartmentModal, setOpenDepartmentModal] = useState(false);
    const [editDepartment, setEditDepartment] = useState({});

    const [isReload, setIsReload] = useState(false);

    return (
        <>
            {/* 
                properties::
                asyncUrl: 'request data url' 
                headers: 'Table header display in table'
                bannerText: 'Table title'
                searchPlaceHolder: 'Search input place holder'
                ordinal: 'Ordering data in table asc or desc'
                setOrdinalBy: 'Field use to ordering data in table'
                isReloadData: 'Listen table reload'
                useTableActions: 'Enable button actions in table'
                onHandleAddNewEvent: 'Listen button add new event'
                customActions: 'Custom button event in table'
            */}

            <AsyncDatatable
                asyncURL={API_URL.department.get}
                headers={TABLE_CONFIG.tblDepartment}
                bannerText="All Departments"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true, edit: true }}
                onHandleAddNewEvent={() => setOpenDepartmentModal(true)}
                handleEditEvent={(data) => {
                    setEditDepartment(data);
                    setOpenDepartmentModal(true);
                }}
            />

            
            {/* Modal create and update */}
            <UpsertDepartmentForm
                title={editDepartment?.id ? "Edit Department" : "Add New Department"}
                openModal={openDepartmentModal}
                editData={editDepartment}
                onCloseModal={() => {
                    setEditDepartment(DepartmentModel);
                    setOpenDepartmentModal(false);
                }}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
}

export default HomeDepartment;