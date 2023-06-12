import React, { useState } from "react";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import AsyncTableAction from "../../components/AsyncDataTable/async-table-action";

const HomeHire = () => {

    const [isReload, setIsReload] = useState(false)

    return (
        <>
            <AsyncDatatable
                asyncURL={API_URL.hire.get}
                headers={TABLE_CONFIG.tblHire}
                bannerText="List Hire"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{ search: true }}
                customActions={
                    <AsyncTableAction
                        useActions={{ approveCandidate: true, edit: true, delete: true }}
                        // onHandleEditEvent={() => setOpenEditCandidateModal(true)}
                        // onHandleApproveCandidateEvent={() => setOpenApproveCandidateModal(true)}
                    />
                }
            />
        </>
    )
};

export default HomeHire;