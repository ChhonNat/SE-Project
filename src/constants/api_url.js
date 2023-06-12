const API_VERSION = '/api/v1';


export const API_URL = {
    auth: {
        login: API_VERSION + '/login'
    },
    position: {
        get: API_VERSION + '/candidate/list-positions'
    },
    department: {
        get: API_VERSION + '/departments/search'
    },
    accessment: {
        get: API_VERSION + '/assessments/search'
    },
    hire: {
        get: API_VERSION + '/hires/search'
    },
    business: {
        get: API_VERSION + '/candidate/list-business-units'
    },
    receiveCategory: {
        get: API_VERSION + '/candidate/list-receiving-categories'
    },
    recruiter: {
        get: API_VERSION + '/candidate/list-recruiters'
    },
    candidate: {
        get: API_VERSION + '/candidates/search',
        create: API_VERSION + '/candidate'
    },
    interview: {
        get: API_VERSION + '/interviews/search'
    }
};
