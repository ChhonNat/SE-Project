import React, { useState } from "react";

import AsyncDatatable from "../../../components/AsyncDataTable/async-data-table";

import { API_URL } from "../../../constants/api_url";
import { TABLE_CONFIG } from "../../../utils/table-config";
import UpsertMCateFormModel from "./form-upsert-m-cate.modal";


const HomeGroupDocument = () => {
  const [isReload, setIsReload] = useState(false);
  const [openUpsertMCateModal, setOpenUpsertMCateModal] = useState(false);
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
      
{/* old AsyncDataTable */}
      <AsyncDatatable
        asyncURL={API_URL.mainCategory.get}
        headers={TABLE_CONFIG.tblMainCategory}
        // filter = {
        //     {
        //       "searchParams":{
        //         "searchValue":""
        //     }
        //     }
        // }
        bannerText="Main Categories"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{ search: true, create: true, edit: true, refresh: true }}
        onHandleAddNewEvent={() => setOpenUpsertMCateModal(true)}
        handleEditEvent={(data) => {
          setEditGDoc(data);
          setOpenUpsertMCateModal(true);
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
      />



      {/* Modal create and update GROUP DOCUMENT */}
      {openUpsertMCateModal && (
        <UpsertMCateFormModel
          title={editGDoc?.id ? "Edit Main Category" : "Add Main Category"}
          openModal={openUpsertMCateModal}
          editData={editGDoc}
          onCloseModal={() => {
            setEditGDoc({});
            setOpenUpsertMCateModal(false);
          }}
          handleEventSucceed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeGroupDocument;
