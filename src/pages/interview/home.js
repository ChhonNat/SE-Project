import React from "react";
import TableComponent from "../../components/Table/table";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";

const test = [
    {
        "id": "d3ab8574-139b-43e9-abf8-e61f689cc132",
        "firstName": "Di",
        "lastName": "f",
        "hodId": 12,
        "hodName": "Taing Sameing",
        "interviewDate": "2022-01-22",
        "interviewWeek": "week 4",
        "interviewResultId": 1,
        "interviewResultName": "Passed",
        "officeOperationSubmitDate": "2022-01-22",
        "officeOperationRecievedDate": "2022-01-22",
        "offcceoSubmitDate": "2022-01-23",
        "offcceoReceivedDate": "2022-01-23",
        "hiringDate": "2022-01-23",
        "positionId": 526,
        "positionName": "Nurse",
        "signOfferContract": "2022-01-25",
        "salaryOffer": "800",
        "offerWeek": "week 4",
        "joinDate": "2022-01-28",
        "feedBackDate": "2022-01-23",
        "feedBackBy": "Telegram",
        "remark": null,
        "createdAt": 1684342800000,
        "createdBy": "developer",
        "updatedAt": null,
        "updatedBy": null,
        "state": 1
    },
];

const HomeInterview = () => {
    return (
        <>
            <TableComponent 
                headerColumns={TABLE_CONFIG.tblInterview}
                // requestToEndPoint={API_URL.interview.get}
                useColumns={test}
            />
        </>
    )
};

export default HomeInterview;