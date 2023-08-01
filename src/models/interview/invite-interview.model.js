import { number, object, string } from "zod";

const InviteInterviewModel = object({
    interviewDate: string().min(1, { message: 'Schedule date is required!' }),
    headDepartmentId: number().min(1, { message : 'Head of department is required!' }),
    committees: number().array().min(0).default([]),
    remark: string().optional().nullable(),

    hour:string().optional().nullable(),
    min:string().optional().nullable(),
    meridiem:string().optional().nullable()
});

export default InviteInterviewModel;