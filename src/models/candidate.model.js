import { string, object, any, number, date } from 'zod';
const UPLOAD_MAX_FILE_SIZE = 500000;
const ACCET_FILE_UPLOAD = ['image/pdf'];

const Model = object({
    id: any().optional().nullable(),
    applicantCode: any().optional(),
    firstName: string().min(1, { message: "First name is required!" }),
    lastName: string().min(1, { message: "Last name is required!" }),
    fullName: string().optional().nullable(),
    gender: string().min(1, { message: "Gender is required!" }),
    phoneNumber: string().min(8).min(9),
    email: string().optional().nullable(),
    appliedPositionId: number().min(1, { message: "Position is required!" }),
    appliedPositionName: string().optional().nullable(),
    appliedPositionLevelId: number().min(1, { message: "Applied position level is required!" }),
    appliedPositionLevelName: string().optional().nullable(),
    departmentId: number().min(1, {message: 'Department is required!'}),
    departmentName: string().optional().nullable(),
    headDepartmentId: number().min(1, {message: 'Head department ID is required!'}).default(101),
    headDepartmentName: string().min(1,{message: 'Head department is required!'}).default('TEST'),
    businessUnitId: number().min(1,{message: 'Primary business is required!'}),
    businessUnitName: string().optional().nullable(),
    appliedDate: string().min(1, { message: "Applied date is required!" }),
    receivedChannel: string().optional().nullable(),
    shortlistDate: string().optional().nullable(),
    shortlistWeek: string().optional().nullable(),
    shortlistMonth: string().optional().nullable(),
    shortlistResult: string().optional().nullable().default('Pending'),
    filePath: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable().default('Pending'),
    receivedChannel: string().min(1, {message: 'Received from channel is required!'}),
    interviewDate: string().optional().nullable(),
    //cvFile for preview
    cvFile: any(),
    //file for upload
    file: any().default(null)
});

const List = Object({
    ...Model,
});

const Create = Object({
    ...Model,
});

const Update = Object({
    ...Model,
});


export const CandidateModel = {
    List,
    Create,
    Update
};
