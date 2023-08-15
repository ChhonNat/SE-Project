import { any, number, object, string } from "zod";

const OfferModel = object({
  file: any().optional().nullable(),
  campusId: number().min(1, { message: "Campus is required!" }),
  positionId: number().min(1, { message: "Position is required!" }),
  positionLevelId: number().min(1, { message: "Position level is required!" }),
  offerSalary: string()
    .min(1, { message: "Amount of salary is required!" })
    .default("0"),
  remark: string().optional().nullable(),
});

const VerifyModel = object({
  remark: string().optional().nullable(),
});

const ApproveModel = object({
  remark: string().optional().nullable(),
});

const HireModel = object({
  file: any().optional().nullable(),
  signedOfferLetterDate: string().min(1, {
    message: "Signed offer letter to required!",
  }),
  signedContractDate: string().min(1, {
    message: "Signed contact date is required!",
  }),
  joinedDate: string().min(1, { message: "Joined date is required!" }),
  remark: string().optional().nullable(),
});

export const JobOfferModel = {
  OfferModel,
  VerifyModel,
  ApproveModel,
  HireModel,
};
