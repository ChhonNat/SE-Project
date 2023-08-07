const API_VERSION = '/api/v1';


export const API_URL = {

    candidate: {
        get: `${API_VERSION}/candidates/search`,
        create: `${API_VERSION}/candidates`,
        edit: `${API_VERSION}/candidates/`,
        detail: `${API_VERSION}/candidates/`,
        inviteFirstInterView: `${API_VERSION}/candidates/`,
        inviteSecondInterView: `${API_VERSION}/interviews/`,
        editResult: `${API_VERSION}/interviews/`,
        assessment: `${API_VERSION}/interviews/`,
        editAssessment: `${API_VERSION}/assessments/`,
        hire: `${API_VERSION}/assessments/`,
        downloadCVFile: `${API_VERSION}/candidates/download?id=`,
        sumitToOFFCEO: `${API_VERSION}/candidates/`,
        shortlist: `${API_VERSION}/candidates/`,
    },

    interview: {
        get: `${API_VERSION}/interviews/search`,
        detail: `${API_VERSION}/interviews/`,
        evaluate: `${API_VERSION}/interviews/`,
        referenceCheck: `${API_VERSION}/interviews/`,
        downloadEvaluateForm: `${API_VERSION}/interviews/download?id=`,
    },

    referenceCheck: {
        get: `${API_VERSION}/reference-checks/search`,
        detail: `${API_VERSION}/reference-checks/`,
        evaluateResult: `${API_VERSION}/reference-checks/`,
        offerJob: `${API_VERSION}/reference-checks/`,
        downloadRefForm: `${API_VERSION}/reference-checks/download?id=`,
    },

    jobOffer: {
        get: `${API_VERSION}/job-offers/search`,
        detail: `${API_VERSION}/job-offers/`,
        offerSalary: `${API_VERSION}/job-offers/`,
        processJobOffer: `${API_VERSION}/job-offers/`,
        hire: `${API_VERSION}/job-offers/`
    },

    hire: {
        get: `${API_VERSION}/hire-applicants/search`,
        downloadCVFile: `${API_VERSION}/hire-applicants/download?id=`,
    },

    // Setting api url
    mainBuiness: {
        get: `${API_VERSION}/main-business-units/search`,
        create: `${API_VERSION}`,
        edit: `${API_VERSION}`
    },

    businessUnit: {
        get: `${API_VERSION}/business-units/search`,
        create: `${API_VERSION}/business-units`,
        edit: `${API_VERSION}/business-units/`
    },

    subBusinessUnit: {
        get: `${API_VERSION}/sub-business-units/search`,
        create: `${API_VERSION}/sub-business-units`,
        edit: `${API_VERSION}/sub-business-units/`,
    },

    department: {
        get: `${API_VERSION}/departments/search`,
        create: `${API_VERSION}/departments`,
        edit: `${API_VERSION}/departments/`
    },

    campus: {
        get: `${API_VERSION}/campuses/search`,
        create: `${API_VERSION}/campuses`,
        update: `${API_VERSION}/campuses/`
    },

    location: {
        get: `${API_VERSION}/locations/search`,
        create: `${API_VERSION}/settings/location`,
        edit: `${API_VERSION}/settings/`
    },

    positionLevel: {
        get: `${API_VERSION}/position-levels/search`,
        create: `${API_VERSION}/position-levels`,
        edit: `${API_VERSION}/position-levels/`
    },

    position: {
        get: `${API_VERSION}/positions/search`,
        create: `${API_VERSION}/positions`,
        edit: `${API_VERSION}/positions/`
    },

    headDepartment: {
        get: `${API_VERSION}/head-departments/search`,
        create: `${API_VERSION}/head-departments`,
        edit: `${API_VERSION}/head-departments/`
    },

    committeee: {
        get: `${API_VERSION}/committees/search`,
        create: `${API_VERSION}/committees`,
        edit: `${API_VERSION}/committees/`,
    },

    lookup: {
        candidate: {
            get: `${API_VERSION}/candidates/lookup-data`
        },
        interview: {
            get: `${API_VERSION}/interviews/lookup-data`
        },
        referenceCheck: {
            get: `${API_VERSION}/reference-checks/lookup-data`
        },
        mainBusiness: {
            get: `${API_VERSION}/main-business-units`
        },
        businessUnit: {
            get: `${API_VERSION}/business-units`
        },
        department: {
            get: `${API_VERSION}/departments`
        },
        departmentById: {
            get: `${API_VERSION}/departments/business-unit/`
        },
        headDepartment: {
            get: `${API_VERSION}/head-departments/department/`
        },
        subBusinessUnit: {
            get: `${API_VERSION}/sub-business-units/lookup`
        },
        positionLevel: {
            get: `${API_VERSION}/position-levels`
        },
        position: {
            get: `${API_VERSION}/positions`
        },
        positionById: {
            get: `${API_VERSION}/positions/department/`
        },
        location: {
            get: `${API_VERSION}/locations`
        }
    },

    user: {
        get: `${API_VERSION}/users/search`,
        create: `${API_VERSION}/users`,
        edit: `${API_VERSION}/users/`,
    },

    role: {
        get: `${API_VERSION}/users/roles`
    },

    auth: {
        login: `${API_VERSION}/login`,
        refreshAccessToken: `${API_VERSION}/login/renew-token`
    }
};
