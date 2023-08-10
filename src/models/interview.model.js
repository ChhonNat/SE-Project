import { any, object, string, number } from "zod";

const Evaluate = object({
  file: any(),
  interviewResult: string().min(1, {
    message: "Interview result is required!",
  }),
  interviewProcess: string().min(1),
  remark: string().optional().nullable(),
});

const Invite = object({
    interviewDate: string().min(1, { message: 'Date is required!' }),
    headDepartmentId: number().min(1, { message : 'Head of department is required!' }),
    departments: any().array().min(1, { message: 'Department is required!' }).default([]),
    committees: any().array().min(1, { message: 'Committee is required!' }).default([]),
    remark: string().optional().nullable(),

    hour:string().min(1,{message: 'Hour is required!'}).default("01"),
    min:string().min(1, {message: 'Minute is required!'}).default("00"),
    meridiem:string().optional().nullable().default("AM")
});

export const InterviewModel = {
    Evaluate,
    Invite
};
