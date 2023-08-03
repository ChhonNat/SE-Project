import { any, object, string } from "zod";

const OfferModel = object({
    offerSalary: string().min(1,{message: 'Amount of salary is required!' }),
    remark: string().optional().nullable()
});

const VerifyModel = object({
    remark: string().optional().nullable()
});

const ApproveModel = object({
    remark: string().optional().nullable()
});

const HireModel = object({
    file: any().default(null),
    signedOfferLetterDate: any().default(null),
    signedContractDate: any().default(null),
    joinedDate: any().default(null),
    remark: string().optional().nullable()
});

export const JobOfferModel = {
    OfferModel,
    VerifyModel,
    ApproveModel,
    HireModel
};