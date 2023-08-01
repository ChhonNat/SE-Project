import { number, object, string } from "zod";

const InviteInterviewModel = object({
    interviewDate: string().min(1, { message: 'Date is required!' }),
    headDepartmentId: number().min(1, { message : 'Head of department is required!' }),
    committees: number().array().min(0).default([]),
    remark: string().optional().nullable(),

    hour:string().min(1,{message: 'Hour is required!'}),
    min:string().min(1, {message: 'Minute is required!'}),
    meridiem:string().optional().nullable()
});

export default InviteInterviewModel;