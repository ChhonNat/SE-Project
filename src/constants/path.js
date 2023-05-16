export const DASHBOARD_URL = '/';


export const AUTH = {
    children: {
        login_url: '/login'
    }
}

export const CANDIDATE = {
    path: '/candidate',
    children: {
        info_url: 'info',
        from_url: 'form'
    }
};

export const INTERVIEW = {
    path: '/interview',
    children: {
        record_url: 'record',
        form_url: 'form'
    }
};

