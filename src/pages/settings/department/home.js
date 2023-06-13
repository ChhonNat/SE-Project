import React, { useState } from "react";
import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../../components/AsyncDataTable/async-table-action";
import DepartmentFormModal from "./form-department.modal";


const HomeBusinessUnit = () => {

    const [ openAddDepartmentModal ,setOpenAddDepartmentModal ] = useState(false);
    const [isReload, setIsReload] = useState(false);

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.department.get}
                headers={TABLE_CONFIG.tblDepartment}
                bannerText="List Department"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true, create: true }}
                onHandleAddNewEvent={() => setOpenAddDepartmentModal(true)}
                customActions={
                    <AsyncTableAction
                        useActions={{ edit: true, delete: true }}
                    />
                }
            />

            {/* Add new partment modal */}
            <DepartmentFormModal 
                openDepartmentModal={openAddDepartmentModal} 
                onCloseDepartmentModal={()=>setOpenAddDepartmentModal(false)}
            />
        </>
    )
}

export default HomeBusinessUnit;