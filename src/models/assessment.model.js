import { object, any, string, number  } from "zod";

const AssessmentModel = object({
    id: any().optional().nullable(),
    firstName: string().optional().nullable(),
    lastName: string().optional().nullable(),
    fullName: string().optional().nullable(),
    gender: string().optional().nullable(),
    phoneNumber: string().optional().nullable(),
    email: string().optional().nullable(),
    offerPositionId: number().optional().nullable(),
    departmentId: number().optional().nullable(),
    headDepartmentId: number().optional().nullable(),
    businessDivisionId: number().optional().nullable(),
    offerLocationId: number().optional().nullable(),
    interviewId:  number().optional().nullable(),
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
    joinDate: string().min(1, {message: "Offer date is required!"}),
    hireDate: string().min(1,{message: "Hire date is required!"})
});

export default AssessmentModel;