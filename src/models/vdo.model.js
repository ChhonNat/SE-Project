import { number, object, string } from 'zod';


const Create = object({
  link: string().min(1, { message: "Link is required!" }),
  decsription: string().min(1, { message: "Decsription is required!" }),
  serviceId: number().min(1, { message: "Service is required!" }),
});

const Update = object({
  link: string().min(1, { message: "Link is required!" }),
  decsription: string().min(1, { message: "Decsription is required!" }),
  serviceId: number().min(1, { message: "Service is required!" }),
  status: string().default("Inacitive")
})

export const vdoModel = {
  Create,
  Update,
};
