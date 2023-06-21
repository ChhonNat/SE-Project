const update_candidate = [
    'applicationCode',
    'firstName',
    'lastName',
    'gender',
    'phoneNumber',
    'email',
    'departmentId',
    'headDepartmentId',
    'businessDivisionId',
    'appliedPositionId',
    'appliedLocationId',
    'appliedDate',
    'shortlistResult',
    'shortListedDate',
    'receivedChannel',
    'status',
    'file',
    'cvFile'
];

const invite_candidate = [
    "appliedPositionId",
    "departmentId",
    "businessDivisionId",
    "headDepartmentId",
    "appliedLocationId",
    "interviewDate"
];

const edit_result_candidate = [
    "interviewDate",
    "interviewResult",
    "feedBackDate",
    "feedBackChannel",
    "remark",
    "status"
];

const make_assessment_candidate = [
    "appliedPositionId",
    "departmentId",
    "businessDivisionId",
    "headDepartmentId",
    "appliedLocationId",
    "offerDate"
];

const offer_assessment_candidate = [
    "offerSalary",
    "offerDate",
    "submitOPSOfficeDate",
    "submitCEOOfficeDate",
    "receivedOPSOfficeDate",
    "receivedCEOOfficeDate",
    "signedOfferDate",
    "signedContractDate",
    "remark",
    "status"
];

const hire_candidate = [
    "offerPositionId",
    "departmentId",
    "businessDivisionId",
    "headDepartmentId",
    "offerLocationId",
    "hireDate",
    "joinDate"
];

const position = [
    "name",
    "description",
    "status",
];

const department = [
    "name",
    "description",
    "status",
];

const business = [
    "name",
    "description",
    "status",
];

const location = [
    "name",
    "description",
    "status",
];


export const KEY_POST = {
    update_candidate,
    invite_candidate,
    edit_result_candidate,
    make_assessment_candidate,
    offer_assessment_candidate,
    hire_candidate,
    position,
    department,
    business,
    location
};