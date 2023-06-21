import { object, any, string, number  } from "zod";

const InterviewModel = object({
    id: any().optional().nullable(),
    firstName: string().optional().nullable(),
    lastName: string().optional().nullable(),
    fullName: string().optional().nullable(),
    gender: string().optional().nullable(),
    phoneNumber: string().optional().nullable(),
    email: string().optional().nullable(),
    appliedPositionId: number().optional().nullable(),
    departmentId: number().optional().nullable(),
    headDepartmentId: number().optional().nullable(),
    businessDivisionId: number().optional().nullable(),
    appliedLocationId: number().optional().nullable(),
    appliedDate: string().optional().nullable(),
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
    offerDate: string().optional().nullable(),
    feedBackChannel: string().optional().nullable(),
    remark: string().optional().nullable(),
    interviewResult: string().optional().nullable(),
    feedBackDate: any().optional().nullable()
});

export default InterviewModel;