import { STATUS } from "../constants/status";

/** proof of user working on data
 */
const proof = [
    {
        id: 'createdAt',
        label: 'Created At',
        type: 'date',
        dateFormat: 'MMM DD, YYYY hh:mm:ss A',
    },
    {
        id: 'createdBy',
        label: 'Created By',
    },
    {
        id: 'updatedAt',
        label: 'Updated At',
        type: 'date',
        dateFormat: 'MMM DD, YYYY hh:mm:ss A',
    },
    {
        id: 'updatedBy',
        label: 'Updated By'
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { ACTIVE: 'green' },
    }
];
/***
 * Candidate Table
 */
const tblCandidate = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'applicantCode',
        label: "Applicant Code",
        type: 'link',
        statusColor: {},
        sqlField: 'can.application_number'
    },
    {
        id: 'fullName',
        label: "Candidate's Name",
        sqlField: 'can.first_name'
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        sqlField: 'can.phone_number'
    },
    {
        id: 'appliedPositionName',
        label: 'Apply Position',
        sqlField: 'pos.name'
    },
    {
        id: 'submitStatus',
        label: "Process Status",
        type: 'status',
        statusColor: {
            [STATUS.SUBMIT_STATUS.WAITING]: 'Orange',
            [STATUS.SUBMIT_STATUS.DHR_VERIFIED]: 'lightGreen',
            [STATUS.SUBMIT_STATUS.DHR_REJECTED]: 'Red',
            [STATUS.SUBMIT_STATUS.OFCCEO_APPROVED]: 'Green',
            [STATUS.SUBMIT_STATUS.OFCCEO_REJECTED]: 'Red',
        }
    },
    {
        id: 'status',
        type: 'status',
        statusColor: {
            Hired: 'Green',
            In_Assessment: 'MediumBlue',
            CV_Reviewed: 'DarkOrange',
            In_Interview: 'Maroon'
        },
        label: 'Status'
    },
    {
        id: 'shortlistResult',
        label: 'Shortlist Result',
        textColor: {
            [STATUS.SHORTLIST_RESULT.PASSED]: 'Green',
            [STATUS.SHORTLIST_RESULT.FAILED]: 'Red',
            [STATUS.SHORTLIST_RESULT.WAITING]: 'Orange',
            [STATUS.SHORTLIST_RESULT.KEEP_IN_POOL]: 'Blue'
        },
    },
    {
        id: 'action', label: 'Actions',
    }
];

/***
 * Candidate Table
 */
const tblInterview = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'candidate',
        label: 'Applicant Code',
        type: 'link',
        obj: { name: 'applicantCode' },
    },
    {
        id: 'candidate',
        label: 'Name',
        obj: { name: 'fullName' },
    },
    {
        id: 'appliedPosition',
        label: 'Apply Position',
        obj: { name: 'nameEn' },
    },
    {
        id: 'interviewDate',
        label: 'Interview At',
        type: 'date',
        dateFormat: 'MMM DD, YYYY hh:mm A',
    },
    {
        id: 'interviewProcess',
        label: 'Interview Process',
        type: 'status',
        statusColor: {
            [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW]: 'black',
            [STATUS.INTERVIEW_PROCESS.SECOND_INTERVIEW]: 'green'
        }
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: {
            [STATUS.INTERVIEW_STATUS.INTERVIEWED]: 'Blue'
        }
    },
    {
        id: 'interviewResult',
        label: 'Result',
        textColor: { Passed: 'green', Failed: 'red', Waiting: 'Orange' },
    },
    {
        id: 'action',
        label: 'Actions'
    },
];

/**Job reference Table */
const tblReferenceCheck = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'candidate',
        label: 'Applicant Code',
        type: 'link',
        obj: { name: 'applicantCode' },
    },
    {
        id: 'candidate',
        label: 'Candidate Name',
        obj: { name: 'fullName' },
    },
    {
        id: 'checkResult',
        label: 'Result',
        textColor: {
            [STATUS.REFERENCE_RESULT.POSITIVE]: 'green',
            [STATUS.REFERENCE_RESULT.NEGATIVE]: 'red',
            [STATUS.REFERENCE_RESULT.WAITING]: 'orange'
        },
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { [STATUS.REFERENCE_STATUS.PENDING]: 'orange' },
    },
    {
        id: 'action',
        label: 'Actions'
    },
];

/**Job Offer table */
const tblJobOffer = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'candidate',
        label: 'Applicant Code',
        type: 'link',
        obj: { name: 'applicantCode' },
    },
    {
        id: 'candidate',
        label: 'Candidate Name',
        obj: { name: 'fullName' }
    },
    {
        id: 'position',
        label: 'Position',
        obj: { name: 'nameEn' }
    },
    {
        id: 'positionLevel',
        label: 'Position Level',
        obj: { name: 'nameEn' }
    },
    {
        id: 'department',
        label: 'Department',
        obj: { name: 'nameEn' }
    },
    {
        id: 'offerSalary',
        label: 'Salary($)',
    },
    {
        id: 'processStatus',
        label: 'Process Status',
        type: 'status',
        statusColor: { OFCCEO_Approved: 'Green', DHR_Verified: 'LightGreen', HOD_Approved: 'Orange' }
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { 'pending': 'orange' }
    },
    {
        id: 'action',
        label: 'Actions'
    }
];

/***
 * Assessment Table
 */
const tblAssessment = [
    {
        id: 'index',
        label: 'No.'
    },
    , {
        id: 'applicantCode',
        label: 'Applicant Code',
        type: 'link',
        statusColor: {},
    },
    {
        id: 'candidateName',
        label: 'Name'
    },
    {
        id: 'offerPositionName',
        label: 'Offer Position'
    },
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'businessDivisionName',
        label: 'Primary Business'
    },
    {
        id: 'offerSalary',
        label: 'Offer Salary ($)'
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Offered: 'Green', Suspended: 'Orange', Cancel: 'Red' }
    },
    // {
    //     id: 'headDepartmentName', label: 'Head Department'
    // },
    // ...proof,
    // {
    //     id: 'createdBy', label: 'Created By'
    // },
    {
        id: 'action', label: 'Actions'
    }
];

/**
 * Hire Table
 */
const tblHire = [
    {
        id: 'index',
        label: 'No.'
    },
    , {
        id: 'applicantCode',
        label: 'Applicant Code',
        type: 'link',
        statusColor: {}
    },
    {
        id: 'candidateName',
        label: 'Name'
    },
    {
        id: 'hirePositionName',
        label: 'Hire Position'
    },
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'businessDivisionName',
        label: 'Primary Business'
    },
    {
        id: 'hireDate',
        label: 'Hire Date',
        type: 'date',
        dateFormat: 'MMM DD, YYYY'
    },
    {
        id: 'joinDate',
        label: 'Join Date',
        type: 'date',
        dateFormat: 'MMM DD, YYYY'
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Hired: 'Green' }
    }
];

/**
 * Position Table
 */
const tblPosition = [
    {
        id: 'index',
        label: 'No.',
    },
    {
        id: 'nameEn',
        label: 'Name',
    },
    {
        id: 'nameKh',
        label: 'Name(KH)',
    },
    {
        id: 'positionLevelName',
        label: 'Level'
    },
    {
        id: 'businessUnitName',
        label: 'Primary Business',
        arrayId: 'name',
    },
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'description',
        label: 'Description',
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Active: 'Green', Inactive: 'Red' },
    },
    {
        id: 'action', label: 'Actions'
    },
];

/**
 * Position level table
 */
const tblPositionLevel = [
    {
        id: 'index',
        label: 'No.',
    },
    {
        id: 'nameEn',
        label: 'Name',
    },
    {
        id: 'nameKh',
        label: 'Name(KH)'
    },
    {
        id: 'businessUnitName',
        label: 'Primary Business'
    },
    {
        id: 'departmentName',
        label: 'Department Name',
        arrayId: 'name',
    },
    {
        id: 'description',
        label: 'Description',
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Active: 'Green', Inactive: 'Red' },
    },
    {
        id: 'action',
        label: 'Actions'
    },
];

/**
 * Recruiter Table
 */
const tblRecruiter = [
    {
        id: 'index',
        label: 'No.',
    },
    {
        id: 'cardId',
        label: 'Card ID'
    },
    {
        id: 'firstName',
        label: 'First Name',
    },
    {
        id: 'lastName',
        label: 'Last Name',
    },
    {
        id: 'phoneNumber',
        label: 'Phone Number'
    },
    {
        id: 'positionName',
        label: 'Position'
    },
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'description',
        label: 'Description'
    },
    {
        id: 'action',
        label: 'Actions'
    },
];

/**
 * Department Table
 */
const tblDepartment = [
    {
        id: 'index',
        label: 'No.',
    },
    {
        id: 'nameEn',
        label: 'Name',
    },
    {
        id: 'nameKh',
        label: 'Name(KH)'
    },
    {
        id: 'description',
        label: 'Description',
    },
    {
        id: 'businessUnitName',
        label: 'Primary Business',
        arrayId: 'name',
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Active: 'Green', Inactive: 'Red' }
    },
    {
        id: 'action',
        label: 'Actions'
    },
];

/**
 * Head department table
 */

const tblHeadDepartment = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'staffId',
        label: 'Card ID'
    },
    {
        id: 'fullName',
        label: 'Name'
    },
    {
        id: 'phoneNumber',
        label: 'Phone Number'
    },
    {
        id: 'businessUnitName',
        label: 'Primary Business'
    },
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'positionName',
        label: 'Position'
    },
    {
        id: 'positionLevelName',
        label: 'Level'
    },
    {
        id: 'description',
        label: 'Description'
    },
    {
        id: 'status',
        label: 'Status',
        type: 'status',
        statusColor: { Active: 'Green', Inactive: 'Red' }
    },
    {
        id: 'action', label: 'Actions'
    }
];

/**
 * Committee table
 */
const tblCommittee = [
    {
        id: 'index',
        label: 'No.'
    },
    {
        id: 'staffId',
        label: 'Card ID'
    },
    {
        id: 'fullName',
        label: 'Name'
    },
    {
        id: 'phoneNumber', 
        label: 'Phone Number'
    },
    {
        id: 'businessUnitName', 
        label: 'Primary Business'
    },
    {
        id: 'departmentName', 
        label: 'Department'
    },
    {
        id: 'positionName', 
        label: 'Position'
    },
    {
        id: 'positionLevelName', 
        label: 'Level'
    },
    {
        id: 'description', 
        label: 'Description'
    },
    {
        id: 'status', 
        label: 'Status',
        type: 'status', 
        statusColor: { Active: 'Green', Inactive: 'Red' }
    },
    {
        id: 'action', 
        label: 'Actions'
    }
];
/**
 * Main business table
 */

const tblMainBusiness = [
    {
        id: 'index', 
        label: 'No .'
    },
    {
        id: 'nameEn', 
        label: 'Name'
    },
    {
        id: 'nameKh', 
        label: 'Name(KH)'
    },
    {
        id: 'description', 
        label: 'Description'
    },
];

/**
 * Business Table
 */
const tblBusinessUnit = [
    {
        id: 'index', 
        label: 'No.',
    },
    {
        id: 'nameEn', 
        label: 'Name',
    },
    {
        id: 'nameKh', 
        label: 'Name(KH)'
    },
    {
        id: 'mainBusinessUnitName', 
        label: 'Main Primary Business'
    },
    {
        id: 'description', 
        label: 'Description',
    },
    {
        id: 'status', 
        label: 'Status',
        type: 'status', 
        statusColor: { Active: 'Green', Inactive: 'Red' }, 
    },
    {
        id: 'action', 
        label: 'Actions'
    }
];

// Sub Primary Business
const tblSubBusinessUnit = [
    {
        id: 'index', 
        label: 'No.',
    },
    {
        id: 'nameEn', 
        label: 'Name',
    },
    {
        id: 'nameKh',
        label: 'Name(KH)'
    },
    {
        id: 'mainBusinessUnitName', 
        label: 'Main Primary Business'
    },
    {
        id: 'businessUnitName', 
        label: 'Primary Business'
    },
    {
        id: 'description', 
        label: 'Description',
    },
    {
        id: 'status', 
        type: 'status', 
        statusColor: { Active: 'Green', Inactive: 'Red' }, 
        label: 'Status'
    },
    {
        id: 'action', label: 'Actions'
    }
];

/**Location Table */

const tblLocation = [
    {
        id: 'index', 
        label: 'No.'
    },
    {
        id: 'name', 
        label: 'Name'
    },
    {
        id: 'description', 
        label: 'Description'
    },
    {
        id: 'status', 
        type: 'status', 
        statusColor: { Active: 'Green', Inactive: 'Red' }, 
        label: 'Status'
    },
    {
        id: 'action', 
        label: 'Actions'
    }
];


/**
 * Receiving Category Table
 */
const tblReceivingCategory = [
    {
        id: 'index', 
        label: 'No.',
    },
    {
        id: 'name', 
        label: 'Name',
    },
    {
        id: 'description', 
        label: 'Description',
    },
    {
        id: 'action', 
        label: 'Actions'
    }
];

/**
 * User management
 */
const tblUser = [
    {
        id: "index", 
        label: "No."
    },
    {
        id: 'fullName', 
        label: 'Full Name'
    },
    {
        id: "username", 
        label: "Username"
    },
    {
        id: "phoneNumber", 
        label: "Phone Number"
    },
    {
        id: "email", 
        label: "Email"
    },
    {
        id: "status", 
        label: "Status",
        type: 'status', 
        statusColor: { Active: 'green', Inactive: 'red' }, 
    },
    {
        id: "createdAt", 
        label: "Created At",
        type: "date", 
        dateFormat: 'MMM DD, YYYY'
    },
    {
        id: "roles", 
        label: "Role",
        arrayId: "authority", 
    },
    {
        id: "action", 
        label: "Actions"
    }
];


export const TABLE_CONFIG = {
    tblCandidate,
    tblInterview,
    tblJobOffer,
    tblAssessment,
    tblReferenceCheck,
    tblHire,
    tblMainBusiness,
    tblBusinessUnit,
    tblSubBusinessUnit,
    tblDepartment,
    tblHeadDepartment,
    tblCommittee,
    tblPosition,
    tblPositionLevel,
    tblReceivingCategory,
    tblRecruiter,
    tblLocation,
    tblUser
};