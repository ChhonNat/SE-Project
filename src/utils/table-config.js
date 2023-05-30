/***
 * Candidate Table
 */
const tblCandidate = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'firstName', label: 'First Name', minWidth: 110
    },
    {
        id: 'lastName', label: 'Last Name', minWidth: 110
    },
    {
        id: 'gender', label: 'Gender'
    },
    {
        id: 'phoneNumber', label: 'Phone Number', minWidth: 130
    },
    {
        id: 'positionName', label: 'Position'
    },
    {
        id: 'departmentName', label: 'Department Name',
    },
    {
        id: 'businessName', label: 'Business'
    },
    {
        id: 'location', label: 'Location'
    },
    {
        id: 'shortListDate', label: 'Short List Date', minWidth: 130
    },
    {
        id: 'recruiterName', label: 'Recruiter'
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
    }
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

/**
 * Recruiter Table
 */
const tblRecruiter = [
    {
        id: 'index', label: 'No.', 
    },
    {
        id: 'first_name', label: 'First Name', 
    },
    {
        id: 'last_name', label: 'Last Name',
    }
];


export const TABLE_CONFIG = {
    tblCandidate,
    tblBusiness,
    tblDepartment,
    tblPosition,
    tblReceivingCategory,
    tblRecruiter
};