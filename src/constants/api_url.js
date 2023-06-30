const API_VERSION = '/api/v1';


export const API_URL = {
    auth: {
        login: API_VERSION + '/login',
        refreshAccessToken: API_VERSION + '/login/renew-token'
    },
    user: {
        get: API_VERSION + '/users/search',
        create: API_VERSION + '/users',
        edit: API_VERSION + '/users/'
    },
    candidate: {
        get: API_VERSION + '/candidates/search',
        create: API_VERSION + '/candidates',
        edit: API_VERSION + '/candidates/',
        invite: API_VERSION + '/candidates/',
        editResult: API_VERSION + '/interviews/',
        assessment: API_VERSION + '/interviews/',
        editAssessment: API_VERSION + '/assessments/',
        hire: API_VERSION + '/assessments/',
        downloadCVFile: API_VERSION + '/candidates/download?id=',

        lookup: {
            get: API_VERSION + '/candidates/lookup-data'
        }
    },
    interview: {
        get: API_VERSION + '/interviews/search',

        lookup: {
            get: API_VERSION + '/interviews/lookup-data'
        }
    },
    assessment: {
        get: API_VERSION + '/assessments/search',

        lookup: {
            get: API_VERSION + '/assessments/lookup-data'
        }
    },
    hire: {
        get: API_VERSION + '/hires/search'
    },
    position: {
        get: API_VERSION + '/positions/search',
        create: API_VERSION + '/positions',
        edit: API_VERSION + '/positions/'
    },
    recruiter: {
        get: API_VERSION + '/recruiters/search'
    },
    department: {
        get: API_VERSION + '/departments/search',
        create: API_VERSION + '/departments',
        edit: API_VERSION + '/departments/'
    },
    headDepartment: {
        get: API_VERSION + '/head-departments/search',
        create: API_VERSION + '/head-departments',
        edit: API_VERSION + '/head-departments/'
    },

    mainBuiness: {
        get: API_VERSION  + '/main-business'
    },

    business: {
        get: API_VERSION + '/business-divisions/search',
        create: API_VERSION + '/settings/business_division',
        edit: API_VERSION + '/settings/'
    },

    location: {
        get: API_VERSION + '/locations/search',
        create: API_VERSION + '/settings/location',
        edit: API_VERSION + '/settings/'
    },

    receiveCategory: {
        get: API_VERSION + '/candidate/list-receiving-categories'
    },

    lookup: {
        position: {
            get: API_VERSION + '/positions'
        },
        positionById: {
            get: API_VERSION + '/positions/department/'
        },
        location: {
            get: API_VERSION + '/locations'
        },
        recruiter: {
            get: API_VERSION + '/recruiters'
        },
        business: {
            get: API_VERSION + '/business-divisions'
        },
        department: {
            get: API_VERSION + '/departments'
        },
        departmentById: {
            get: API_VERSION + '/departments/business-division/'
        },
        headDepartment: {
            get: API_VERSION + '/head-departments/department/'
        }
    }
};
