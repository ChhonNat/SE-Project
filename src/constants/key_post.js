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

const accessment_candidate = [
    "appliedPositionId",
    "departmentId",
    "businessDivisionId",
    "headDepartmentId",
    "appliedLocationId",
    "offerDate"
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

export const KEY_POST = {
    update_candidate,
    invite_candidate,
    accessment_candidate,
    hire_candidate
};