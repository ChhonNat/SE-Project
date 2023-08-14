import React, { useState } from "react";
import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertCampusFormModal from "./form-upsert-campus.modal";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";

const HomeCampus = () => {
  const [isReload, setIsReload] = useState(false);
  const [openUpsertCampusModal, setOpenUpsertCampusModal] = useState(false);
  const [editCampus, setEditCampus] = useState({});

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
        asyncURL={API_URL.campus.get}
        headers={TABLE_CONFIG.tblCampus}
        bannerText="All Campuses"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{ search: true, create: true, edit: true }}
        onHandleAddNewEvent={() => setOpenUpsertCampusModal(true)}
        handleEditEvent={(data) => {
          setEditCampus(data);
          setOpenUpsertCampusModal(true);
        }}
      />

      {/* Modal create and update */}
      {openUpsertCampusModal && (
        <UpsertCampusFormModal
          title={editCampus?.id ? "Edit Campus" : "Add Campus"}
          openModal={openUpsertCampusModal}
          editData={editCampus}
          onCloseModal={() => {
            setEditCampus({});
            setOpenUpsertCampusModal(false);
          }}
          handleEventSuccessed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeCampus;
