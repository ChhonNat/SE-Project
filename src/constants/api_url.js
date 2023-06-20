const API_VERSION = '/api/v1';


export const API_URL = {
    auth: {
        login: API_VERSION + '/login'
    },
    candidate: {
        get: API_VERSION + '/candidates/search',
        create: API_VERSION + '/candidates',
        update: API_VERSION + '/candidates/',
        invite: API_VERSION + '/candidates/',
        assessment: API_VERSION + '/interviews/',
        hire: API_VERSION + '/assessments/',

        lookup: {
            get: API_VERSION + '/candidates/lookup-data'
        }
    },
    interview: {
        get: API_VERSION + '/interviews/search'
    },
    assessment: {
        get: API_VERSION + '/assessments/search'
    },
    hire: {
        get: API_VERSION + '/hires/search'
    },
    position: {
        get: API_VERSION + '/positions/search'
    },
    recruiter: {
        get: API_VERSION + '/recruiters/search'
    },
    department: {
        get: API_VERSION + '/departments/search'
    },
    headDepartment: {
        get: API_VERSION + '/head-departments/search'
    },

    business: {
        get: API_VERSION + '/business-divisions/search'
    },

    location: {
        get: API_VERSION + '/locations/search'
    },

    receiveCategory: {
        get: API_VERSION + '/candidate/list-receiving-categories'
    },

    lookup: {
        position: {
            get: API_VERSION + '/positions'
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
        headDepartment: {
            get: API_VERSION + '/head-departments'
        }
    }
};
