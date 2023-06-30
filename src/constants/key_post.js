const update_candidate = [
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
    'cvFile',
];

const view_candidate = [
    ...update_candidate,
    "headDepartmentName",
]

const invite_candidate = [
    "appliedPositionId",
    "departmentId",
    "businessDivisionId",
    "headDepartmentId",
    "appliedLocationId",
    "interviewDate"
];

const feedback_candidate = [
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
    "businessDivisions",
    "departmentId"
];

const department = [
    "name",
    "description",
    "businessDivisions",
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

const headDepartment = [
    "staffId",
    "firstName",
    "lastName",
    "phoneNumber",
    "businessDivisionId",
    "positionId",
    "departmentId",
    "description",
    "status",
];

const user = [
    "staffId",
    "firstName",
    "secondName",
    "gender",
    "birthDate",
    "email",
    "phoneNumber",
    "username",
    "password",
    "confirmPassword",
    "status"
]

export const KEY_POST = {
    view_candidate,
    update_candidate,
    invite_candidate,
    feedback_candidate,
    make_assessment_candidate,
    offer_assessment_candidate,
    hire_candidate,
    position,
    department,
    business,
    location,
    headDepartment,
    user
};