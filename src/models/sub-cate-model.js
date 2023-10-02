import { number, object, string } from "zod";

const Create = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  mainCateId: number().nonnegative(1, { message: "mainCateId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" })
});

const Update = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  mainCateId: number().nonnegative(1, { message: "mainCateId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" }),
  status: string().default("Active")
});

export const SubCategoryModel = {
  Create,
  Update,
};
