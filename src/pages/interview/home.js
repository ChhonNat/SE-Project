import React, { useState } from "react";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import AsyncTableAction from "../../components/AsyncDataTable/async-table-action";

const HomeInterview = () => {

    const [isReload, setIsReload] = useState(false);

    return (
        <>
            <AsyncDatatable 
                asyncURL={API_URL.interview.get}
                headers={TABLE_CONFIG.tblInterview}
                bannerText="List Interview"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={{search: true}}
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

export default HomeInterview;