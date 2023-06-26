import { string, object, any, number, date } from 'zod';

const UPLOAD_MAX_FILE_SIZE = 500000;
const ACCET_FILE_UPLOAD = ['image/pdf'];

const Model = object({
    id: any().optional().nullable(),
    applicantCode: string().min(1, { message: "Application code is required!" }),
    firstName: string().min(1, { message: "Firstname is required!" }),
    lastName: string().min(1, { message: "Lastname is required!" }),
    fullName: string().optional().nullable(),
    gender: string().min(1, { message: "Gender is required!" }),
    phoneNumber: string().min(8).min(9),
    email: string().email().optional().nullable(),
    appliedPositionId: number().min(1, { message: "Position is required!" }),
    departmentId: number().optional().nullable(),
    headDepartmentId: number().optional().nullable(),
    headDepartmentName: string().optional().nullable(),
    businessDivisionId: number().optional().nullable(),
    appliedLocationId: number(),
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
    receivedChannel: string().optional().nullable(),
    interviewDate: string().optional().nullable(),
    file: any().default(null),
    cvFile: any()
        // .refine((files) => files?.[0]?.size > UPLOAD_MAX_FILE_SIZE, `Max image size is 5MB.`)
        // .refine(
        //     (files) => ACCET_FILE_UPLOAD.includes(files?.[0]?.type),
        //     "Only .pdf formats are supported."
        // )
});

const List = {
    ...Model,
};

const Create = {
    ...Model,
};

const Update = {
    ...Model,
};


export const CandidateModel = {
    List,
    Create,
    Update
};
