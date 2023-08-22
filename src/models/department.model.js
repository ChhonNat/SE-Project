import { object, any, string, number, array } from "zod";

const Create = object({
  code: string()
    .min(4, { message: "Code is required at least 4 characters!" })
    .max(5, { message: "Code is required at most 5 characters!" }),
  nameEn: string().min(1, { message: "Department english name is required!" }),
  nameKh: string().min(1, { message: "Department khmer name is required!" }),
  description: string().optional().nullable(),
  status: string().min(1, { message: "Status is required!" }).default("Active"),
  businessUnitId: number().min(1, { message: "Primary business is required!" }),
});

const Update = object({
  id: any().optional().nullable(),
  code: string()
    .min(4, { message: "Code is required at least 4 characters!" })
    .max(5, { message: "Code is required at most 5 characters!" }),
  nameEn: string().min(1, { message: "Department english name is required!" }),
  nameKh: string().min(1, { message: "Department khmer name is required!" }),
  description: string().optional().nullable(),
  status: string().min(1, { message: "Status is required!" }).default("Active"),
  businessUnitId: number().min(1, { message: "Primary business is required!" }),
});

export const DepartmentModel = {
    Create,
    Update
};
