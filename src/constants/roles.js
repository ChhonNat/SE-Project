export const ROLE = {
    ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_COUNTER: 'ROLE_COUNTER',
    ROLE_TA_ADMIN: 'ROLE_TA_ADMIN',
    ROLE_TA_TEAM: 'ROLE_TA',
    ROLE_HIRING_MANAGER: 'ROLE_HIRING_MANAGER',
    ROLE_OFCCEO_ADMIN: 'ROLE_OFCCEO_ADMIN',
    ROLE_HR_MANAGER: 'ROLE_HR_MANAGER'
}

export const MAP_ROLE_NAME = {
    ROLE_TA: 'TA Team',
    ROLE_TA_ADMIN: 'TA Admin',
    ROLE_OFCCEO_ADMIN: 'OFCCEO',
    ROLE_HIRING_MANAGER: 'Head of Department',
    ROLE_SUPER_ADMIN: 'Super Admin',
    ROLE_ADMIN: 'Admin',
    ROLE_HR_MANAGER: 'Director of HR'
};

export const USER_ROLES = {
    admin: ['admin'],
    writingTest: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        ROLE.ROLE_HIRING_MANAGER,
        ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        ROLE.ROLE_FCCEO,
        ROLE.ROLE_PERSONNEL
    ],
    interview: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        ROLE.ROLE_HIRING_MANAGER,
        ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        ROLE.ROLE_FCCEO,
        ROLE.ROLE_PERSONNEL
    ],
    referenceCheck: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        ROLE.ROLE_HIRING_MANAGER,
        ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        ROLE.ROLE_FCCEO,
        ROLE.ROLE_PERSONNEL
    ],
    jobOffer: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        ROLE.ROLE_HIRING_MANAGER,
        ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        ROLE.ROLE_FCCEO,
        ROLE.ROLE_PERSONNEL
    ],
    hireApplicant: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        ROLE.ROLE_HIRING_MANAGER,
        ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        ROLE.ROLE_FCCEO,
        ROLE.ROLE_PERSONNEL
    ],
    setting: {
        parent: [
            ROLE.ROLE_SUPER_ADMIN,
            ROLE.ROLE_ADMIN,
            ROLE.ROLE_TA_ADMIN,
            ROLE.ROLE_TA_TEAM
        ],
        children: {
            mainBusiness: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            businessUnit: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            department: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            departmentUnit: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            campus: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            location: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            positionLevel: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            position: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            headDepartment: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
            receiveChannel: [
                ROLE.ROLE_SUPER_ADMIN,
                ROLE.ROLE_ADMIN,
                ROLE.ROLE_TA_ADMIN,
                ROLE.ROLE_TA_TEAM
            ],
        }
    },
    user: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        // ROLE.ROLE_HIRING_MANAGER,
        // ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        // ROLE.ROLE_FCCEO,
        // ROLE.ROLE_PERSONNEL
    ],
    report: [
        ROLE.ROLE_SUPER_ADMIN,
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_TA_ADMIN,
        ROLE.ROLE_TA_TEAM,
        // ROLE.ROLE_HIRING_MANAGER,
        // ROLE.ROLE_OFCCEO_ADMIN,
        ROLE.ROLE_HR_MANAGER,
        // ROLE.ROLE_FCCEO,
        // ROLE.ROLE_PERSONNEL
    ]
};