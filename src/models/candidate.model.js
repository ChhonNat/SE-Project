import { string, object, any, number, date } from 'zod';

const CandidateModel = object({
    id: string().optional().nullable(),
    firstName: string().min(1),
    lastName: string().min(1),
    fullName: string().optional().nullable(),
    gender: string().min(1),
    phoneNumber: string().min(9).max(10),
    email: string().min(1).email(),
    appliedPositionId: number(),
    departmentId: number(),
    headDepartmentId: number(),
    businessDivisionId: number(),
    appliedLocationId: number(),
    appliedDate: string(),
    receivedChannel: string().optional().nullable(),
    shortListDate: string().optional().nullable(),
    shortListWeek: string().optional().nullable(),
    shortListMonth:string().optional().nullable(),
    shortListResult:string().optional().nullable(),
    filePath: string().optional().nullable(),
    createdAt: string().optional().nullable(),
    createdBy: string().optional().nullable(),
    updatedAt: string().optional().nullable(),
    updatedBy: string().optional().nullable(),
    status: string().optional().nullable()
});

export default CandidateModel;
