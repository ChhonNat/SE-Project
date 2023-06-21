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
        id: 'applicationCode', type: 'link', statusColor: {}, label: "Application Code", sqlField: 'can.application_number'
    },
    {
        id: 'fullName', label: "Candidate's Name", sqlField: 'can.first_name'
    },
    {
        id: 'gender', label: 'Gender', sqlField: 'can.gender'
    },
    {
        id: 'phoneNumber', label: 'Phone', sqlField: 'can.phone_number'
    },
    // {
    //     id: 'email', label: 'Email', sqlField: 'can.email'
    // },
    {
        id: 'appliedPositionName', label: 'Position Apply for', sqlField: 'pos.name'
    },
    {
        id: 'departmentName', label: 'Department Name'
    },
    {
        id: 'businessDivisionName', label: 'Business Division', sqlField: 'pos.name'
    },
    {
        id: 'shortlistDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Shortlist Date', sqlField: 'can.short_list_date'
    },
    // ...proof,
    {
        id: 'shortlistResult', type: 'status',
        statusColor: { Passed: 'green', Failed: 'red' },
        label: 'Shortlist Result'
    },
    {
        id: 'status', type: 'status', statusColor: { Hired: 'Green', In_Assessment: 'MediumBlue', CV_Reviewed: 'DarkOrange', In_Interview: 'Maroon' }, label: 'Status'
    },
    {
        id: 'action', label: 'Actions',
    },
];

/***
 * Candidate Table
 */
const tblInterview = [
    {
        id: 'index', label: 'No.'
    }, {
        id: 'applicationCode', type: 'link', statusColor: {}, label: 'Application Code'

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
        id: 'businessDivisionName', label: 'Business Division',
    },
    {
        id: 'interviewDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Interview Date'
    },
    {
        id: 'status', type: 'status', statusColor: {}, label: 'Status'
    },
    {
        id: 'interviewResult', type: 'status', statusColor: { Passed: 'green', Failed: 'red' }, label: 'Result'
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
        id: 'applicationCode', type: 'status', statusColor: {}, label: 'Application Code'

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
        id: 'businessDivisionName', label: 'Business Division'
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
        id: 'applicationCode',
        type: 'link',
        statusColor: {},
        label: 'Application Code'
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
        id: 'businessDivisionName', label: 'Business Division'
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
        id: 'name', label: 'Name',
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'status', type: 'status', statusColor: {Active: 'Green', Inactive: 'Red'}, label: 'Status'
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
        id: 'positionName', label: 'Position Name'
    },
    {
        id: 'departmentName', label: 'Department Name'
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
        id: 'name', label: 'Name',
    },
    {
        id: 'description', label: 'Description',
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
        id: 'cardId', label: 'Card ID'
    },
    {
        id: 'firstName', label: 'First Name'
    },
    {
        id: 'lastName', label: 'Last Name'
    },
    {
        id: 'phoneNumber', label: 'Phone Number'
    },
    {
        id: 'positionName', label: 'Position Name'
    },
    {
        id: 'departmentName', label: 'Department Name'
    },
    // ...proof,
    {
        id: 'action', label: 'Actions'
    }
];


/**
 * Business Table
 */
const tblBusiness = [
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


/**Location Table */

const tblLocation = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'name', label: 'Location Name'
    },
    {
        id: 'description', label: 'Description'
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




export const TABLE_CONFIG = {
    tblCandidate,
    tblInterview,
    tblAssessment,
    tblHire,
    tblBusiness,
    tblDepartment,
    tblHeadDepartment,
    tblPosition,
    tblReceivingCategory,
    tblRecruiter,
    tblLocation
};