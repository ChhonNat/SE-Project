import { string, object, any, number, date } from 'zod';

const Model = object({
    id: any().optional().nullable(),
    firstName: string().min(1, { message: "Firstname is required!" }),
    lastName: string().min(1, { message: "Lastname is required!" }),
    fullName: string().optional().nullable(),
    gender: string().min(1, { message: "Gender is required!" }),
    phoneNumber: string().min(8).min(9),
    email: string().email(),
    appliedPositionId: number().min(1, { message: "Position is required!" }),
    departmentId: number(),
    headDepartmentId: number(),
    businessDivisionId: number(),
    appliedLocationId: number(),
    appliedDate: string().min(1, { message: "Applied date is required" }),
    receivedChannel: string().optional().nullable(),
    shortlistDate: string().min(1, { message: "Shorlist date is required" }),
    shortlistWeek: string().optional().nullable(),
    shortlistMonth: string().optional().nullable(),
    shortlistResult: string().optional().nullable().default('Pending'),
    filePath: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable().default('Pending'),
    receivedChanel: string().optional().nullable(),
    interviewDate: string().optional().nullable()
});

const Create = {
    ...Model,
};

const Update = {
    ...Model,
};


export const CandidateModel = {
    Create,
    Update
};
