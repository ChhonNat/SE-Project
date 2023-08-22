import { object, any, string, number } from "zod";

const Create = object({
  campusCode: string().min(1, { message: "Campus code is required!" }),
  nameEn: string().min(1, { message: "Campus english name is required!" }),
  nameKh: string().min(1, { message: "Campus khmer name is required!" }),
  shortName: string().min(1, { message: "Campus khmer name is required!" }),
  locationId: number().nonnegative(),
  address: string().optional().nullable(),
  description: string().optional().nullable(),
  status: string().optional().nullable(),
});

const Update = object({
  id: number().nonnegative(),
  campusCode: string().min(1, { message: "Campus code is required!" }),
  nameEn: string().min(1, { message: "Campus english name is required!" }),
  nameKh: string().min(1, { message: "Campus khmer name is required!" }),
  shortName: string().min(1, { message: "Campus khmer name is required!" }),
  locationId: number().nonnegative(),
  address: string().optional().nullable(),
  description: string().optional().nullable(),
  status: string().optional().nullable(),
});

export const CampusModel = {
  Create,
  Update,
};
