/***
 * Candidate Table
 */
const tblCandidate = [
    {
        id: 'index', label: 'No.'
    },
    {
        id: 'firstName', label: 'First Name', sqlField: 'can.first_name'
    },
    {
        id: 'lastName', label: 'Last Name', sqlField: 'can.last_name'
    },
    {
        id: 'gender', label: 'Gender', sqlField: 'can.gender'
    },
    {
        id: 'phoneNumber', label: 'Phone Number', sqlField: 'can.phone_number'
    },
    {
        id: 'email', label: 'Email', sqlField: 'can.email'
    },
    {
        id: 'positionName', label: 'Position', sqlField: 'pos.name'
    },
    {
        id: 'departmentName', label: 'Department', sqlField: 'dep.name'
    },
    {
        id: 'businessName', label: 'Business', sqlField: 'bus.name'
    },
    {
        id: 'appliedLocationName', label: 'Location', sqlField: 'appl.name'
    },
    {
        id: 'shortListDate', label: 'Short List Date', sqlField: 'can.short_list_date'
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
        id: 'email', label: 'Email'
    },
    {
        id: 'departmentName', label: 'Department',
    },
    {
        id: 'interviewDate', label: 'Interview Date'
    },
    {
        id: 'interviewResultName', label: 'Result'
    },
    {
        id: 'positionName', label: 'Position Offer', minWidth: 130
    },
    {
        id: 'salaryOffer', label: 'Salary Offer'
    },
    {
        id: 'joinDate', label: 'Join Date'
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
    tblInterview,
    tblBusiness,
    tblDepartment,
    tblPosition,
    tblReceivingCategory,
    tblRecruiter
};