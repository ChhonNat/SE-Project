import { object, string } from 'zod';


const Create = object({
    name: string().min(1, { message: "Name is required!" }),
    description: string().min(1, { message: "Description is required!" }),
});

const Update = object({
    name: string().min(1, { message: "Name is required!" }),
    description: string().min(1, { message: "Description is required!" }),
    status: string().default("Inacitive")
})

export const ServiceModel = {
    Create,
    Update,
};
