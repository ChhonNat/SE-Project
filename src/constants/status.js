const RECORD = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
};

const SHORTLIST_RESULT = {
    WAITING: 'Waiting',
    KEEP_IN_POOL: "Keep_In_Pool",
    FAILED: 'Failed',
    PASSED: 'Passed',
    BLACKLIST: 'Blacklist'
};

const SUBMIT_STATUS = {
    WAITING: "Waiting",
    SUBMITTED_STATUS: "Submitted_OFCCEO",
    OFCCEO_VERIFIED: "OFCCEO_Verified",
    OFCCEO_REJECTED: "OFCCEO_Rejected",
    SENT_TA_TEAM: "Sent_TA_Team",
    SUBMITTED_HOD: "Submitted_HOD"
};

const CANDIDATE = {
    PENDING: 'Pending',
    CV_REVIEWED: 'CV_Reviewed',
    IN_INTERVIEW: 'IN_Interview',
    IN_ASSESSMENT: 'In_Assessment',
    HIRED: 'Hired'
};

const INTERVIEW_RESULT = {
    WAITING: 'Waiting',
    FAILED: 'Failed',
    KEEP_IN_REVIEW: 'Keep_In_Review',
    PASSED: 'Passed',
    CANCELLED: 'Cancel'
};

const INTERVIEW_STATUS = {
    INVITED: 'Invited',
    INTERVIEWED: 'Interviewed',
    EVALUATED: 'Evaluated',
    CANCELLED: 'Cancel'
};

const ASSESSMENT_RESULT = {
    SUSPENDED: 'Suspended',
    CANCELLED: 'Cancel',
    OFFERED: 'Offered'
};

export const STATUS = {
    RECORD,
    SHORTLIST_RESULT,
    INTERVIEW_RESULT,
    INTERVIEW_STATUS,
    ASSESSMENT_RESULT,
    CANDIDATE,
    SUBMIT_STATUS
};
