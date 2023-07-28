import { object, string } from "zod";

const VerifyReferenceModel = object({
    checkResult: string().min(1, {message: 'Result is required!'}),
    remark: string().optional().nullable()
});

export default VerifyReferenceModel;