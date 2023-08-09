import {any, object, string } from "zod";

const Verify = object({
    file: any(),
    checkResult: string().min(1, {message: 'Result is required!'}),
    remark: string().optional().nullable()
});

export const ReferenceModel ={
    Verify
};