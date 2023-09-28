import React, { useState } from "react";

import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";
import UpsertGDocFormModal from "./form-upsert-g-doc.modal";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";


const HomeGroupDocument = () => {
  const [isReload, setIsReload] = useState(false);
  const [openUpsertGDocModal, setOpenUpsertGDocModal] = useState(false);
  const [editGDoc, setEditGDoc] = useState({});

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
        asyncURL={API_URL.groupDocument.get}
        headers={TABLE_CONFIG.tblGroupDocument}
        bannerText="All Campuses"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{ search: true, create: true, edit: true, refresh: true }}
        onHandleAddNewEvent={() => setOpenUpsertGDocModal(true)}
        handleEditEvent={(data) => {
          setEditGDoc(data);
          setOpenUpsertGDocModal(true);
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
      />

      {/* Modal create and update GROUP DOCUMENT */}
      {openUpsertGDocModal && (
        <UpsertGDocFormModal
          title={editGDoc?.id ? "Edit Group Document" : "Add Group Document"}
          openModal={openUpsertGDocModal}
          editData={editGDoc}
          onCloseModal={() => {
            setEditGDoc({});
            setOpenUpsertGDocModal(false);
          }}
          handleEventSucceed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeGroupDocument;
