const RECORD = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
};

const SUBMIT_STATUS = {
    WAITING: "Pending",
    SUBMITTED_DHR: "Submitted_DHR",
    DHR_VERIFIED: "DHR_Verified",
    DHR_REJECTED: "DHR_Rejected",
    OFCCEO_APPROVED: "OFCCEO_Approved",
    OFCCEO_REJECTED: "OFCCEO_Rejected",
    SUBMITTED_HOD: "Submitted_HOD",
};

const CANDIDATE = {
    PENDING: 'Pending',
    SHORTLISTED: 'Shortlisted',
    IN_INTERVIEW: 'In_Interview',
    IN_EVALUATION: 'In_Evaluation',
    IN_REFERENCE_CHECK: 'In_Reference_Check',
    IN_JOB_OFFER: 'In_Job_Offer',
    HIRED: 'Hired'
};

const SHORTLIST_RESULT = {
    WAITING: 'Waiting',
    KEEP_IN_POOL: "Keep_In_Pool",
    FAILED: 'Failed',
    PASSED: 'Passed',
    BLACKLIST: 'Blacklist'
};


const INTERVIEW_PROCESS = {
    FIRST_INTERVIEW: "First_Interview",
    SECOND_INTERVIEW: "Second_Interview"
};

const INTERVIEW_STATUS = {
    INVITED: "Invited",
    INTERVIEWED: "Interviewed",
    EVALUATED: "Evaluated",
    CANCELLED: 'Cancel',
};

const INTERVIEW_RESULT = {
    WAITING: 'Waiting',
    FAILED: 'Failed',
    KEEP_IN_REVIEW: 'Keep_In_Review',
    PASSED: 'Passed',
    CANCELLED: 'Cancel'
};

const REFERENCE_RESULT = {
    WAITING: 'Waiting',
    NEGATIVE: 'Negative',
    POSITIVE: 'Positive'
};

const REFERENCE_STATUS = {
    GIVEN_RESULT: 'Given_Result',
    PENDING: 'Pending'
};

const OFFER_PROCESS = {
    PENDING: "Pending",
    HOD_APPROVED:"HOD_Approved",
    DHR_VERIFIED:"DHR_Verified",
    OFFCEO_APPROVED:"OFCCEO_Approved"
};

const OFFER_STATUS = {
    PENDING: "pending",
    OFFERED: "Offered",
    HIRED: "Hired",
    REJECTED: "Rejected"
};

export const STATUS = {
    RECORD,
    CANDIDATE,
    SUBMIT_STATUS,
    SHORTLIST_RESULT,
    INTERVIEW_RESULT,
    INTERVIEW_STATUS,
    INTERVIEW_PROCESS,
    REFERENCE_RESULT,
    REFERENCE_STATUS,
    OFFER_PROCESS,
    OFFER_STATUS
};
