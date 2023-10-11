const API_VERSION = '/api/v1';


export const API_URL = {


    groupDocument: {
        get: `${API_VERSION}/group-document/list`,
        create: `${API_VERSION}/group-document/create`,
        edit: `${API_VERSION}/group-document/update/`,
        softDelete: `${API_VERSION}/group-document/delete/`,
        restore: `${API_VERSION}/group-document/restore/`,
    },
    mainCategory: {
        get: `${API_VERSION}/main-category/list/`,
        create: `${API_VERSION}/main-category/create`,
        edit: `${API_VERSION}/main-category/update/`,
        softDelete: `${API_VERSION}/main-category/delete/`,
        restore: `${API_VERSION}/main-category/restore/`,
    },
    subCategory: {
        get: `${API_VERSION}/sub-category/list/`,
        create: `${API_VERSION}/sub-category/create`,
        edit: `${API_VERSION}/sub-category/update/`,
        softDelete: `${API_VERSION}/sub-category/delete/`,
        restore: `${API_VERSION}/sub-category/restore/`,
    },
    childSubCategory: {
        get: `${API_VERSION}/sub-sub-category/list/`,
        create: `${API_VERSION}/sub-sub-category/create`,
        edit: `${API_VERSION}/sub-sub-category/update/`,
        softDelete: `${API_VERSION}/sub-sub-category/delete/`,
        restore: `${API_VERSION}/sub-sub-category/restore/`,
    },
    /////

    candidate: {
        get: `${API_VERSION}/candidates/search`,
        create: `${API_VERSION}/candidates`,
        edit: `${API_VERSION}/candidates/`,
        detail: `${API_VERSION}/candidates/`,
        suggestScheduleInterview: `${API_VERSION}/candidates/`,
        confirmScheduleInterview: `${API_VERSION}/interviews/`,
        editResult: `${API_VERSION}/interviews/`,
        assessment: `${API_VERSION}/interviews/`,
        editAssessment: `${API_VERSION}/assessments/`,
        hire: `${API_VERSION}/assessments/`,
        downloadCVFile: `${API_VERSION}/candidates/download?id=`,
        submitToOFFCEO: `${API_VERSION}/candidates/`,
        shortlist: `${API_VERSION}/candidates/`,
    },

    interview: {
        get: `${API_VERSION}/interviews/search`,
        detail: `${API_VERSION}/interviews/`,
        suggestSecScheduleInterview: `${API_VERSION}/interviews/`,
        confirmSecScheduleInterview: `${API_VERSION}/interviews/`,
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
    mainBusiness: {
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
        create: `${API_VERSION}/locations`,
        edit: `${API_VERSION}/locations/`
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

    committee: {
        get: `${API_VERSION}/committees/search`,
        create: `${API_VERSION}/committees`,
        edit: `${API_VERSION}/committees/`,
    },

    lookup: {
        listGDoc: {
            get: `${API_VERSION}/group-document/list-group-documents`
        },
        listMCate: {
            get: `${API_VERSION}/main-category/list-main-categories`
        },
        subCate: {
            get: `${API_VERSION}/sub-category/list-sub-categories`
        },
        childSubCate: {
            get: `${API_VERSION}/sub-sub-category/list-sub-sub-categories`
        },
        candidate: {
            get: `${API_VERSION}/candidates/lookup-data`
        },
        interview: {
            get: `${API_VERSION}/interviews/lookup-data`
        },
        committee: {
            get: `${API_VERSION}/interviews/committees`
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
        campus: {
            get: `${API_VERSION}/campuses`
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

    docEntry: {
        // get: `${API_VERSION}/users/search`,
        create: `${API_VERSION}/documents/create`,
        // edit: `${API_VERSION}/users/`,
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
