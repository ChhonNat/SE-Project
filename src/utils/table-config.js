
/***
 * Candidate Table
 */
const tblCandidate = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'fullName', label: 'Candidate Name', sqlField: 'can.first_name'
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
        id: 'shortListDate', type: 'date', label: 'Short List Date', sqlField: 'can.short_list_date'
    },
    {
        id: 'createdAt', type: 'date', label: 'Created At'
    },
    {
        id: 'updatedAt', type: 'date', label: 'Updated At'
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
        id: 'candidateName', label: 'Candidate Name'
    },
    {
        id: 'appliedPositionName', label: 'Apply Position'
    },
    {
        id: 'headDepartmentName', label: 'Head Department'
    },
    {
        id: 'interviewDate', type: 'date', label: 'Interview Date'
    },
    {
        id: 'interviewResult', label: 'Result', badge: true, badgeColor: { Passed: 'green', Failed: 'red' }
    },
    {
        id: 'createdAt', type: 'date', label: 'Created At'
    },
    {
        id: 'updatedAt', type: 'date', label: 'Updated At'
    },
    {
        id: 'createdBy', label: 'Created By'
    },
    {
        id: 'action', label: 'Actions',
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
    {
        id: 'createdAt', type: 'date', label: 'Created At'
    },
    {
        id: 'updatedAt', type: 'date', label: 'Updated At'
    },
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
        id: 'candidateName', label: 'Candidate Name'
    },
    {
        id: 'createdAt', type: 'date', label: 'Created At'
    },
    {
        id: 'updatedAt', type: 'date', label: 'Updated At'
    },
    {
        id: 'createdBy', label: 'Created By'
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
    {
        id: 'createdAt', label: 'Created At',
    },
    {
        id: 'updatedAt', label: 'Updated At',
    },
    {
        id: 'createdBy', label: 'Created By',
    },
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
        id: 'firstName', label: 'First Name',
    },
    {
        id: 'lastName', label: 'Last Name',
    },
    {
        id: 'createdAt', label: 'Created At',
    },
    {
        id: 'updatedAt', label: 'Updated At',
    },
    {
        id: 'createdBy', label: 'Created By',
    },
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
        id: 'name', label: 'Department Name',
    },
    {
        id: 'description', label: 'Description',
    },
    {
        id: 'createdAt', label: 'Created At',
    },
    {
        id: 'updatedAt', label: 'Updated At',
    },
    {
        id: 'createdBy', label: 'Created By',
    },
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
    {
        id: 'createdAt', label: 'Created At'
    },
    {
        id: 'updatedAt', label: 'Updated At'
    },
    {
        id: 'createdBy', label: 'Created By'
    },
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
    {
        id: 'createdAt', label: 'Created At'
    },
    {
        id: 'createdBy', label: 'Created By'
    },
    {
        id: 'updatedAt', label: 'Updated At'
    },
    {
        id: 'updatedBy', label: 'Updated By'
    },
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
    {
        id: 'createdAt', label: 'Created At'
    },
    {
        id: 'createdBy', label: 'Created By'
    },
    {
        id: 'updatedAt', label: 'Updated At'
    },
    {
        id: 'updatedBy', label: 'Updated By'
    },
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