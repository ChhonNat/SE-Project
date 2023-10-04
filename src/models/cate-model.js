import { number, object, string } from "zod";

const Create = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  subCateId: number().nonnegative(1, { message: "subCateId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" })
});

const Update = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  subCateId: number().nonnegative(1, { message: "subCateId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" }),
  status: string().default("Active")
});

export const categoryModel = {
  Create,
  Update,
};
