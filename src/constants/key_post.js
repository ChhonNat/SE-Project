const upsert_candidate = [
    "firstName",
    "lastName",
    "gender",
    "phoneNumber",
    "email",
    "departmentId",
    "headDepartmentId",
    "businessUnitId",
    "campusId",
    "appliedPositionId",
    "appliedPositionLevelId",
    "appliedDate",
    "shortlistResult",
    "shortListedDate",
    "receivedChannel",
    "status",
    "file",
    "cvFile",
];

const view_candidate = [
    ...upsert_candidate,
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
    "nameEn",
    "nameKh",
    "description",
    "status",
    "businessUnitId",
    "departmentId",
    "positionLevelId"
];

const positionLevel = [
    "nameEn",
    "nameKh",
    "businessDivisions",
    "departmentId",
    "description",
    "status"
];

const department = [
    "nameEn",
    "nameKh",
    "code",
    "description",
    "businessDivisions",
    "status",
];

const mainBusiness = [
    "nameEn",
    "nameKh",
    "description"
]

const businessUnit = [
    "mainBusinessUnitId",
    "code",
    "nameEn",
    "nameKh",
    "phone",
    "email",
    "description",
    "addressEn",
    "addressKh",
    "status",
];

const subBusinessUnit = [
    "mainBusinessUnitId",
    "businessUnitId",
    "code",
    "nameEn",
    "nameKh",
    "phone",
    "email",
    "description",
    "addressEn",
    "addressKh",
    "status",
];

const campus = [
    "address",
    "campusCode",
    "description",
    "locationId",
    "nameEn",
    "nameKh",
    "shortName",
    "status"
];

const groupDocument = [
    "nameEn",
    "nameKh",
    "ordering",
    "acronym",
    "status"
];

const mainCategory = [
    "nameEn",
    "nameKh",
    "ordering",
    "groupDocId",
    "status"
];

const subCategory = [
    "nameEn",
    "nameKh",
    "ordering",
    "mainCateId",
    "status"
];

const headDepartment = [
    "staffId",
    "firstName",
    "lastName",
    "phoneNumber",
    "businessUnitId",
    "positionId",
    "positionLevelId",
    "departmentId",
    "description",
    "status",
];

const committee = [
    "staffId",
    "firstName",
    "lastName",
    "phoneNumber",
    "businessUnitId",
    "positionId",
    "positionLevelId",
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
    "status",
    "roles",
    "department"
]

export const KEY_POST = {
    groupDocument,
    mainCategory,
    subCategory,

    view_candidate,
    upsert_candidate,
    invite_candidate,
    feedback_candidate,
    make_assessment_candidate,
    offer_assessment_candidate,
    hire_candidate,
    position,
    positionLevel,
    department,
    mainBusiness,
    businessUnit,
    subBusinessUnit,
    campus,
    headDepartment,
    committee,
    user
};