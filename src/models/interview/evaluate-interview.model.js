import { any, object, string } from "zod";

const EvaluateInterviewModel = object({
    file: any(),
    interviewResult: string().min(1, { message: 'Interview result is required!' }),
    interviewProcess: string().min(1),
    remark: string().optional().nullable()
});

export default EvaluateInterviewModel;