import { number, object, string } from "zod";

const Create = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  groupDocId: number().nonnegative(1, { message: "groupDocId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" })
});

const Update = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  groupDocId: number().nonnegative(1, { message: "groupDocId is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" }),
  status: string().default("Active")
});

export const MainCategoryModel = {
  Create,
  Update,
};
