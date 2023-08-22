import { string, object, any, number } from "zod";

const Create = object({
  applicantCode: any().optional(),
  firstName: string().min(1, { message: "First name is required!" }),
  lastName: string().min(1, { message: "Last name is required!" }),
  gender: string().min(1, { message: "Gender is required!" }),
  phoneNumber: string().min(8).min(9),
  email: string().optional().nullable(),
  departmentId: number().min(1, { message: "Department is required!" }),
  headDepartmentId: number().min(1, {
    message: "Head department ID is required!",
  }),
  businessUnitId: number().min(1, { message: "Primary business is required!" }),
  appliedPositionId: number().min(1, { message: "Position is required!" }),
  appliedPositionLevelId: number().min(1, {
    message: "Applied position level is required!",
  }),
  appliedDate: string().min(1, { message: "Applied date is required!" }),
  receivedChannel: string().min(1, {
    message: "Received from channel is required!",
  }),
  file: any().default(null), //file for upload
  campusId: number().min(1, { message: "Campus is required!" }),
});

const Update = object({
  applicantCode: any().optional(),
  firstName: string().min(1, { message: "First name is required!" }),
  lastName: string().min(1, { message: "Last name is required!" }),
  gender: string().min(1, { message: "Gender is required!" }),
  phoneNumber: string().min(8).min(9),
  email: string().optional().nullable(),
  departmentId: number().min(1, { message: "Department is required!" }),
  headDepartmentId: number().min(1, {
    message: "Head department ID is required!",
  }),
  businessUnitId: number().min(1, { message: "Primary business is required!" }),
  appliedPositionId: number().min(1, { message: "Position is required!" }),
  appliedPositionLevelId: number().min(1, {
    message: "Applied position level is required!",
  }),
  appliedDate: string().min(1, { message: "Applied date is required!" }),
  receivedChannel: string().min(1, {
    message: "Received from channel is required!",
  }),
  campusId: number().min(1, { message: "Campus is required!" }),
  status: string().optional().nullable().default("Pending"),
  file: any().default(null), //file for upload
  cvFile: any()
 
});

export const CandidateModel = {
  Create,
  Update,
};
