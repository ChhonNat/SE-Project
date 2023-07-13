import { STATUS } from "../constants/status";

/** proof of user working on data
 */
const proof = [
    {
        id: 'createdAt', type: 'date', dateFormat: 'MMM DD, YYYY hh:mm:ss A', label: 'Created At',
    },
    {
        id: 'createdBy', label: 'Created By',
    },
    {
        id: 'updatedAt', type: 'date', dateFormat: 'MMM DD, YYYY hh:mm:ss A', label: 'Updated At',
    },
    {
        id: 'updatedBy', label: 'Updated By'
    },
    {
        id: 'status', type: 'status',
        statusColor: { ACTIVE: 'green' },
        label: 'Status'
    }
];
/***
 * Candidate Table
 */
const tblCandidate = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'applicantCode', type: 'link', statusColor: {}, label: "Applicant Code", sqlField: 'can.application_number'
    },
    {
        id: 'fullName', label: "Candidate's Name", sqlField: 'can.first_name'
    },
    {
        id: 'phoneNumber', label: 'Phone', sqlField: 'can.phone_number'
    },
    {
        id: 'appliedPositionName', label: 'Apply Position', sqlField: 'pos.name'
    },
    {
        id: 'shortlistResult', 
        textColor: { 
            [STATUS.SHORTLIST_RESULT.PASSED]: 'Green',
            [STATUS.SHORTLIST_RESULT.FAILED]: 'Red',
            [STATUS.SHORTLIST_RESULT.WAITING]: 'Orange'
        }, 
        label: 'Shortlist Result'
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
        },
    },
    {
        id: 'status', type: 'status',
        statusColor: { Hired: 'Green', In_Assessment: 'MediumBlue', CV_Reviewed: 'DarkOrange', In_Interview: 'Maroon' },
        label: 'Status'
    },
    {
        id: 'action', label: 'Actions',
    },
    // {
    //     id: 'gender', label: 'Gender', sqlField: 'can.gender'
    // },
    // {
    //     id: 'departmentName', label: 'Department'
    // },
    // {
    //     id: 'businessUnitName', label: 'Primary Business', sqlField: 'pos.name'
    // },
    // {
    //     id: 'shortlistDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Shortlist Date', sqlField: 'can.short_list_date'
    // },
];

/***
 * Candidate Table
 */
const tblInterview = [
    {
        id: 'index', label: 'No.'
    }, {
        id: 'applicantCode', type: 'link', statusColor: {}, label: 'Applicant Code'

    },
    {
        id: 'candidateName', label: 'Name'
    },
    {
        id: 'appliedPositionName', label: 'Apply Position'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'headDepartmentName', label: 'Head Department'
    },
    {
        id: 'businessDivisionName', label: 'Primary Business',
    },
    {
        id: 'interviewDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Interview Date'
    },
    {
        id: 'interviewResult', type: 'status', statusColor: { Passed: 'green', Failed: 'red' }, label: 'Result'
    },
    {
        id: 'status', type: 'status', statusColor: {}, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    },
];


/***
 * Assessment Table
 */
const tblAssessment = [
    {
        id: 'index', label: 'No.'
    },
    , {
        id: 'applicantCode', type: 'link', statusColor: {}, label: 'Applicant Code'

    },
    {
        id: 'candidateName', label: 'Name'
    },
    {
        id: 'offerPositionName', label: 'Offer Position'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'businessDivisionName', label: 'Primary Business'
    },
    {
        id: 'offerSalary', label: 'Offer Salary ($)'
    },
    {
        id: 'status', type: 'status', statusColor: { Offered: 'Green', Suspended: 'Orange', Cancel: 'Red' }, label: 'Status'
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
        id: 'index', label: 'No.'
    },
    , {
        id: 'applicantCode',
        type: 'link',
        statusColor: {},
        label: 'Applicant Code'
    },
    {
        id: 'candidateName', label: 'Name'
    },
    {
        id: 'hirePositionName', label: 'Hire Position'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'businessDivisionName', label: 'Primary Business'
    },
    {
        id: 'hireDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Hire Date'
    },
    {
        id: 'joinDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Join Date'
    },
    {
        id: 'status', type: 'status', statusColor: { Hired: 'Green' }, label: 'Status'
    }
    // ...proof,
    // {
    //     id: 'action', label: 'Actions'
    // }
];

/**
 * Position Table
 */
const tblPosition = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'nameEn', label: 'Name',
    },
    {
        id: 'nameKh', label: 'Name(KH)',
    },
    {
        id: 'positionLevelName', label: 'Level'
    },
    {
        id: 'businessUnitName', arrayId: 'name', label: 'Primary Business'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    },
];

/**
 * Position level table
 */
const tblPositionLevel = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'nameEn', label: 'Name',
    },
    {
        id: 'nameKh', label: 'Name(KH)'
    },
    {
        id: 'businessUnitName', label: 'Primary Business'
    },
    {
        id: 'departmentName', arrayId: 'name', label: 'Department Name'
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    },
];

/**
 * Recruiter Table
 */
const tblRecruiter = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'cardId', label: 'Card ID'
    },
    {
        id: 'firstName', label: 'First Name',
    },
    {
        id: 'lastName', label: 'Last Name',
    },
    {
        id: 'phoneNumber', label: 'Phone Number'
    },
    {
        id: 'positionName', label: 'Position'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'description', label: 'Description'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    },
];

/**
 * Department Table
 */
const tblDepartment = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'nameEn', label: 'Name',
    },
    {
        id: 'nameKh', label: 'Name(KH)'
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'businessUnitName', arrayId: 'name', label: 'Primary Business'
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    },
];

/**
 * Head department table
 */

const tblHeadDepartment = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'staffId', label: 'Card ID'
    },
    {
        id: 'fullName', label: 'Name'
    },
    {
        id: 'phoneNumber', label: 'Phone Number'
    },
    {
        id: 'businessUnitName', label: 'Primary Business'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'positionName', label: 'Position'
    },
    {
        id: 'positionLevelName', label: 'Level'
    },
    {
        id: 'description', label: 'Description'
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];

/**
 * Committee table
 */
const tblCommittee = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'staffId', label: 'Card ID'
    },
    {
        id: 'fullName', label: 'Name'
    },
    {
        id: 'phoneNumber', label: 'Phone Number'
    },
    {
        id: 'businessUnitName', label: 'Primary Business'
    },
    {
        id: 'departmentName', label: 'Department'
    },
    {
        id: 'positionName', label: 'Position'
    },
    {
        id: 'positionLevelName', label: 'Level'
    },
    {
        id: 'description', label: 'Description'
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];
/**
 * Main business table
 */

const tblMainBusiness = [
    {
        id: 'index', label: 'No .'
    },
    {
        id: 'nameEn', label: 'Name'
    },
    {
        id: 'nameKh', label: 'Name(KH)'
    },
    {
        id: 'description', label: 'Description'
    },
    // {
    //     id: 'status', label: 'Status'
    // },
    // {
    //     id: 'action', label: 'Actions'
    // }
];

/**
 * Business Table
 */
const tblBusinessUnit = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'nameEn', label: 'Name',
    },
    {
        id: 'nameKh', label: 'Name(KH)'
    },
    {
        id: 'mainBusinessUnitName', label: 'Main Primary Business'
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];

// Sub Primary Business
const tblSubBusinessUnit = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'nameEn', label: 'Name',
    },
    {
        id: 'nameKh', label: 'Name(KH)'
    },
    {
        id: 'mainBusinessUnitName', label: 'Main Primary Business'
    },
    {
        id: 'businessUnitName', label: 'Primary Business'
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];

/**Location Table */

const tblLocation = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'name', label: 'Name'
    },
    {
        id: 'description', label: 'Description'
    },
    {
        id: 'status', type: 'status', statusColor: { Active: 'Green', Inactive: 'Red' }, label: 'Status'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];



/**
 * Receiving Category Table
 */
const tblReceivingCategory = [
    {
        id: 'index', label: 'No.',
    },
    {
        id: 'name', label: 'Name',
    },
    {
        id: 'description', label: 'Description',
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];

/**
 * User management
 */
const tblUser = [
    {
        id: "index", label: "No."
    },
    {
        id: 'fullName', label: 'Full Name'
    },
    {
        id: "username", label: "Username"
    },
    {
        id: "phoneNumber", label: "Phone Number"
    },
    {
        id: "email", label: "Email"
    },
    {
        id: "status", type: 'status', statusColor: { Active: 'green', Inactive: 'red' }, label: "Status"
    },
    {
        id: "createdAt", type: "date", dateFormat: 'MMM DD, YYYY', label: "Created At"
    },
    {
        id: "roles", arrayId: "authority", label: "Role"
    },
    {
        id: "action", label: "Actions"
    }
];


export const TABLE_CONFIG = {
    tblCandidate,
    tblInterview,
    tblAssessment,
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