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
        statusColor: { 'Pending': 'orange', 'ACTIVE': 'green' },
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
        id: 'fullName', label: 'Name', sqlField: 'can.first_name'
    },
    {
        id: 'gender', label: 'Gender', sqlField: 'can.gender'
    },
    {
        id: 'phoneNumber', label: 'Phone', sqlField: 'can.phone_number'
    },
    {
        id: 'email', label: 'Email', sqlField: 'can.email'
    },
    {
        id: 'appliedPositionName', label: 'Position', sqlField: 'pos.name'
    },
    {
        id: 'shortListDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Shortlist Date', sqlField: 'can.short_list_date'
    },
    // ...proof,
    {
        id: 'shortListResult', type: 'status', statusColor:{Passed: 'green', Failed: 'red'}, label: 'Shortlist Result'
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
    },
    {
        id: 'candidateName', label: 'Name'
    },
    {
        id: 'appliedPositionName', label: 'Apply Position'
    },
    {
        id: 'headDepartmentName', label: 'Head Department'
    },
    {
        id: 'interviewDate', type: 'date', dateFormat: 'MMM DD, YYYY', label: 'Interview Date'
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
 * Accessment Table
 */
const tblAccessment = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'candidateName', label: 'Name'
    },
    {
        id: 'offerPositionName', label: 'Offer Position'
    },
    {
        id: 'offerSalary', label: 'Offer Salary ($)'
    },
    {
        id: 'headDepartmentName', label: 'Head Department'
    },
    ...proof,
    {
        id: 'createdBy', label: 'Created By'
    }
];

/**
 * Hire Table
 */
const tblHire = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'candidateName', label: 'Name'
    },
    ...proof,
    {
        id: 'action', label: 'Actions'
    }
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
    ...proof,
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
    ...proof,
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
    ...proof,
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
    ...proof,
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
    ...proof,
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
    ...proof,
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
    ...proof,
    {
        id: 'action', label: 'Actions'
    }
];




export const TABLE_CONFIG = {
    tblCandidate,
    tblInterview,
    tblAccessment,
    tblHire,
    tblBusiness,
    tblDepartment,
    tblHeadDepartment,
    tblPosition,
    tblReceivingCategory,
    tblRecruiter,
    tblLocation
};