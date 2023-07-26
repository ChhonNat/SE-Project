import { any, object, string } from "zod";

const EvaluateInterviewModel = object({
    file: any(),
    result: string().min(1, { message: 'Interview result is required!' }),
    remark: string().optional().nullable()
});

export default EvaluateInterviewModel;