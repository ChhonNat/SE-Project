import { STATUS } from "../constants/status";

/**
 * Document Entry
 */
const tbDocEntry = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "documentCode",
    label: "Code",
  },
  {
    id: "documentNameEn",
    label: "Name(En)",
  },
  {
    id: "documentNameKh",
    label: "Name(Kh)",
  },
  {
    id: "deptName",
    label: "Deportment",
  },
  {
    id: "campusName",
    label: "Campus",
  },
  {
    id: "issueNum",
    label: "Issue Number",
  },
  {
    id: "numOfPage",
    label: "Number of page",
  },
  {
    id: "approvedBy",
    label: "Approved By",
  },
  {
    id: "typeOfDocName",
    label: "Type of Document",
  },
  {
    id: "mainCateName",
    label: "Main Category",
  },
  {
    id: "subCateName",
    label: "Sub Category",
  },
  {
    id: "subSubCateName",
    label: "Child Sub-Category",
  },
  {
    id: "chronoNum",
    label: "Chrono Number",
  },
  {
    id: "issuedDate",
    label: "Issue Date",
  },
  {
    id: "issuedDate",
    label: "Issue Date",
  },
  {
    id: "year",
    label: "Year",
  },
  {
    id: "inactive",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.RECORD.ACTIVE]: "Green", [STATUS.RECORD.INACTIVE]: "Red" }
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "remark",
    label: "Remark",
  },
  {
    id: "action",
    label: "Actions",
  },
];

const tblGroupDocument = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name"
  },
  {
    id: "nameKh",
    label: "Name(Kh)"
  },
  {
    id: "acronym",
    label: "Acronym"
  },
  {
    id: "ordering",
    label: "Ordering"
  },
  {
    id: "inactive",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.RECORD.ACTIVE]: "Green", [STATUS.RECORD.INACTIVE]: "Red" }
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "action",
    label: "Actions"
  }
];

const tblMainCategory = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name"
  },
  {
    id: "nameKh",
    label: "Name(Kh)"
  },
  {
    id: "groupDocumentName",
    label: "Group Document"
  },
  {
    id: "ordering",
    label: "Ordering"
  },
  {
    id: "inactive",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.RECORD.ACTIVE]: "Green", [STATUS.RECORD.INACTIVE]: "Red" }
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "action",
    label: "Actions"
  }
];

const tbSubCategory = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name"
  },
  {
    id: "nameKh",
    label: "Name(Kh)"
  },
  {
    id: "mainCateName",
    label: "Main Category"
  },
  {
    id: "ordering",
    label: "Ordering"
  },
  {
    id: "inactive",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.RECORD.ACTIVE]: "Green", [STATUS.RECORD.INACTIVE]: "Red" }
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "action",
    label: "Actions"
  }
];
const tbSubSubCategory = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name"
  },
  {
    id: "nameKh",
    label: "Name KH"
  },
  {
    id: "subCateName",
    label: "Sub Category"
  },
  {
    id: "ordering",
    label: "Ordering"
  },
  {
    id: "inactive",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.RECORD.ACTIVE]: "Green", [STATUS.RECORD.INACTIVE] : "Red" }
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "action",
    label: "Actions"
  }
];
/***
 * Candidate Table
 */
const tblCandidate = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "applicantCode",
    label: "Applicant Code",
    type: "link",
    statusColor: {},
    sqlField: "can.application_number",
  },
  {
    id: "fullName",
    label: "Candidate's Name",
    sqlField: "can.first_name",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    sqlField: "can.phone_number",
  },
  {
    id: "appliedPositionName",
    label: "Apply Position",
    sqlField: "pos.name",
  },
  {
    id: "submitStatus",
    label: "CV Process Status",
    type: "status",
    statusColor: {
      [STATUS.SUBMIT_STATUS.WAITING]: "Orange",
      [STATUS.SUBMIT_STATUS.DHR_VERIFIED]: "lightGreen",
      [STATUS.SUBMIT_STATUS.DHR_REJECTED]: "Red",
      [STATUS.SUBMIT_STATUS.OFCCEO_APPROVED]: "Green",
      [STATUS.SUBMIT_STATUS.OFCCEO_REJECTED]: "Red",
    },
  },
  {
    id: "status",
    type: "status",
    statusColor: {
      [STATUS.CANDIDATE.PENDING]: "Orange",
      [STATUS.CANDIDATE.SHORTLISTED]: "DarkOrange",
      [STATUS.CANDIDATE.IN_INTERVIEW]: "Maroon",
      [STATUS.CANDIDATE.IN_EVALUATION]: "MediumBlue",
      [STATUS.CANDIDATE.IN_REFERENCE_CHECK]: "",
      [STATUS.CANDIDATE.IN_JOB_OFFER]: "",
      [STATUS.CANDIDATE.HIRED]: "Green",
    },
    label: "Status",
  },
  {
    id: "shortlistResult",
    label: "Shortlist Result",
    textColor: {
      [STATUS.SHORTLIST_RESULT.PASSED]: "Green",
      [STATUS.SHORTLIST_RESULT.FAILED]: "Red",
      [STATUS.SHORTLIST_RESULT.WAITING]: "Orange",
      [STATUS.SHORTLIST_RESULT.KEEP_IN_POOL]: "Blue",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/***
 * Candidate Table
 */
const tblInterview = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "candidate",
    label: "Applicant Code",
    type: "link",
    obj: { name: "applicantCode" },
  },
  {
    id: "candidate",
    label: "Name",
    obj: { name: "fullName" },
  },
  {
    id: "appliedPosition",
    label: "Apply Position",
    obj: { name: "nameEn" },
  },
  {
    id: "interviewDate",
    label: "Interview At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm A",
  },
  {
    id: "interviewProcess",
    label: "Interview Process",
    type: "status",
    statusColor: {
      [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW]: "black",
      [STATUS.INTERVIEW_PROCESS.SECOND_INTERVIEW]: "green",
    },
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.INTERVIEW_STATUS.INTERVIEWED]: "Blue",
    },
  },
  {
    id: "interviewResult",
    label: "Result",
    textColor: { Passed: "green", Failed: "red", Waiting: "Orange" },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**Job reference Table */
const tblReferenceCheck = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "candidate",
    label: "Applicant Code",
    type: "link",
    obj: { name: "applicantCode" },
  },
  {
    id: "candidate",
    label: "Candidate Name",
    obj: { name: "fullName" },
  },
  {
    id: "checkResult",
    label: "Result",
    textColor: {
      [STATUS.REFERENCE_RESULT.POSITIVE]: "green",
      [STATUS.REFERENCE_RESULT.NEGATIVE]: "red",
      [STATUS.REFERENCE_RESULT.WAITING]: "orange",
    },
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.REFERENCE_STATUS.PENDING]: "orange" },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**Job Offer table */
const tblJobOffer = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "candidate",
    label: "Applicant Code",
    type: "link",
    obj: { name: "applicantCode" },
  },
  {
    id: "candidate",
    label: "Candidate Name",
    obj: { name: "fullName" },
  },
  {
    id: "offerPosition",
    orId: "position",
    label: "Position",
    obj: { name: "nameEn" },
  },
  {
    id: "positionLevel",
    label: "Position Level",
    obj: { name: "nameEn" },
  },
  {
    id: "department",
    label: "Department",
    obj: { name: "nameEn" },
  },
  {
    id: "processStatus",
    label: "Process Status",
    type: "status",
    statusColor: {
      [STATUS.OFFER_PROCESS.PENDING]: "Orange",
      [STATUS.OFFER_PROCESS.SUBMITTED_HOD]: "Black",
      [STATUS.OFFER_PROCESS.HOD_APPROVED]: "Green",
      [STATUS.OFFER_PROCESS.HOD_REJECTED]: "Red",
      [STATUS.OFFER_PROCESS.DHR_VERIFIED]: "Green",
      [STATUS.OFFER_PROCESS.DHR_REJECTED]: "Red",
      [STATUS.OFFER_PROCESS.OFFCEO_APPROVED]: "Green",
      [STATUS.OFFER_PROCESS.OFCCEO_REJECTED]: "Red",
    },
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.OFFER_STATUS.PENDING]: "orange" },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Hire Table
 */
const tblHire = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "candidate",
    label: "Applicant Code",
    type: "link",
    obj: { name: "applicantCode" },
  },
  {
    id: "candidate",
    label: "Name",
    obj: { name: "fullName" },
  },
  {
    id: "position",
    label: "Hire Position",
    obj: { name: "nameEn" },
  },
  {
    id: "department",
    label: "Department",
    obj: { name: "nameEn" },
  },
  {
    id: "headDepartment",
    label: "Head Department",
    obj: { name: "fullName" },
  },
  {
    id: "businessUnit",
    label: "Business Unit",
    obj: { name: "nameEn" },
  },
  {
    id: "hiredAt",
    label: "Hired At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "hiredBy",
    label: "Hired By",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: { [STATUS.HIRE_STATUS.HIRE]: "Green" },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Position Table
 */
const tblPosition = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "positionLevelName",
    label: "Level",
  },
  {
    id: "businessUnitName",
    label: "Business Unit",
    arrayId: "name",
  },
  {
    id: "departmentName",
    label: "Department",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Position level table
 */
const tblPositionLevel = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "businessUnitName",
    label: "Business Unit",
  },
  {
    id: "departmentName",
    label: "Department Name",
    arrayId: "name",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Recruiter Table
 */
const tblRecruiter = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "cardId",
    label: "Card ID",
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "positionName",
    label: "Position",
  },
  {
    id: "departmentName",
    label: "Department",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Department Table
 */
const tblDepartment = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "businessUnitName",
    label: "Business Unit",
    arrayId: "name",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Head department table
 */

const tblHeadDepartment = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "staffId",
    label: "Card ID",
  },
  {
    id: "fullName",
    label: "Name",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "businessUnitName",
    label: "Business Unit",
  },
  {
    id: "departmentName",
    label: "Department",
  },
  {
    id: "positionName",
    label: "Position",
  },
  {
    id: "positionLevelName",
    label: "Level",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * Committee table
 */
const tblCommittee = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "staffId",
    label: "Card ID",
  },
  {
    id: "fullName",
    label: "Name",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "businessUnitName",
    label: "Business Unit",
  },
  {
    id: "departmentName",
    label: "Department",
  },
  {
    id: "positionName",
    label: "Position",
  },
  {
    id: "positionLevelName",
    label: "Level",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];
/**
 * Main business table
 */

const tblMainBusiness = [
  {
    id: "index",
    label: "No .",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "description",
    label: "Description",
  },
];

/**
 * Business Table
 */
const tblBusinessUnit = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "mainBusinessUnitName",
    label: "Main Business Unit",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**Location Table */

const tblLocation = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
    label: "Status",
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**Location Table */

const tblCampus = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "nameEn",
    label: "Name",
  },
  {
    id: "nameKh",
    label: "Name(KH)",
  },
  {
    id: "shortName",
    label: "Short Name",
  },
  {
    id: "location",
    label: "Location",
    obj: { name: "nameEn" },
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "Green",
      [STATUS.RECORD.INACTIVE]: "Red",
    },
    label: "Status",
  },
  {
    id: "action",
    label: "Actions",
  },
];

/**
 * User management
 */
const tblUser = [
  {
    id: "index",
    label: "No.",
  },
  {
    id: "fullName",
    label: "Full Name",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "status",
    label: "Status",
    type: "status",
    statusColor: {
      [STATUS.RECORD.ACTIVE]: "green",
      [STATUS.RECORD.INACTIVE]: "red",
    },
  },
  {
    id: "createdAt",
    label: "Created At",
    type: "date",
    dateFormat: "MMM DD, YYYY hh:mm:ss A",
  },
  {
    id: "roles",
    label: "Role",
    arrayId: "authority",
  },
  {
    id: "action",
    label: "Actions",
  },
];

export const TABLE_CONFIG = {
  tbDocEntry,
  tblGroupDocument,
  tblMainCategory,
  tbSubCategory,
  tbSubSubCategory,

  tblCandidate,
  tblInterview,
  tblJobOffer,
  tblReferenceCheck,
  tblHire,
  tblMainBusiness,
  tblBusinessUnit,
  tblDepartment,
  tblHeadDepartment,
  tblCommittee,
  tblPosition,
  tblPositionLevel,
  tblRecruiter,
  tblLocation,
  tblCampus,
  tblUser,
};
