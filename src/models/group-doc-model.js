import { object, any, string, number } from "zod";

const Create = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  acronym: string().min(1, { message: "Acronym is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" })
});

const Update = object({
  nameEn: string().min(1, { message: "English name is required!" }),
  nameKh: string().min(1, { message: "Khmer name is required!" }),
  acronym: string().min(1, { message: "Acronym is required!" }),
  ordering: string().min(1, { message: "Ordering is required!" }),
  status: string().default("Active")
});

export const GroupDocumentModel = {
  Create,
  Update,
};
