import { object, any, string, number } from "zod";

const Create = object({
  code: string()
    .min(4, { message: "Code is required at least 4 characters!" })
    .max(5, { message: "Code is required at most 5 characters!" }),
  nameEn: string().min(1, {
    message: "Business unit english name is required!",
  }),
  nameKh: string().min(1, { message: "Business unit khmer name is required!" }),
  phone: string()
    .min(1, { message: "Phone number is required at least 9 characters" })
    .max(10, { message: "Phone number is required at most 10 characters" }),
  email: string().optional().nullable(),
  description: string().optional().nullable(),
  addressEn: string().optional().nullable(),
  addressKh: string().optional().nullable(),
  status: string().optional().nullable().default("Active"),
  mainBusinessUnitId: number().min(1, {
    message: "Main business is required!",
  }),
});

const Update = object({
  id: any().optional().nullable(),
  code: string()
    .min(4, { message: "Code is required at least 4 characters!" })
    .max(5, { message: "Code is required at most 5 characters!" }),
  nameEn: string().min(1, {
    message: "Business unit english name is required!",
  }),
  nameKh: string().min(1, { message: "Business unit khmer name is required!" }),
  phone: string()
    .min(1, { message: "Phone number is required at least 9 characters" })
    .max(10, { message: "Phone number is required at most 10 characters" }),
  email: string().optional().nullable(),
  description: string().optional().nullable(),
  addressEn: string().optional().nullable(),
  addressKh: string().optional().nullable(),
  status: string().optional().nullable().default("Active"),
  mainBusinessUnitId: number().min(1, {
    message: "Main business is required!",
  }),
});

export const BusinessUnitModel = {
  Create,
  Update,
};
