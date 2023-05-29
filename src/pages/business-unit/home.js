import React, { useCallback, useEffect, useState } from "react";
import { businessService } from "../../services/business.service";
import { filter } from "../../constants/api_filter";
import { API_URL } from "../../constants/api_url";
import TableComponent from "../../components/Table/table";
import { SCREEN_URL } from "../../constants/screen_url";

/**
 * Header Business Table
 * Custom In Table Component
 */
const tblBusinessHeaders = [
    {
        id: 'index', label: 'No.', 
    },
    {
        id: 'name', label: 'Name', 
    },
    {
        id: 'description', label: 'Description',
    }
];

const HomeBusinessUnit = () => {

    return (
        <>
            <TableComponent 
                headerColumns={tblBusinessHeaders}
                requestToEndPoint={API_URL.business.get}
                buttonActions={SCREEN_URL.settings.business}
            />
        </>
    )
}

export default HomeBusinessUnit;