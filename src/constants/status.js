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
    WAITING: "Pending",
    SUBMITTED_DHR: "Submitted_DHR",
    DHR_VERIFIED: "DHR_Verified",
    DHR_REJECTED: "DHR_Rejected",
    OFCCEO_APPROVED: "OFCCEO_Approved",
    OFCCEO_REJECTED: "OFCCEO_Rejected",
    SUBMITTED_HOD: "Submitted_HOD",
    // SUBMITTED_OFCCEO: "Submitted_OFCCEO",
    // SENT_TA_TEAM: "Sent_TA_Team",
};

const CANDIDATE = {
    PENDING: 'Pending',
    CV_REVIEWED: 'Reviewed',
    CV_SHORTLISTED: 'Shortlisted',
    IN_INTERVIEW: 'In_Interview',
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
