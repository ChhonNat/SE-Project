import { object, any, string } from "zod"


const Create = object({
    nameEn: string().min(1, { message: 'Location english name is required!' }),
    nameKh: string().min(1, { message: 'Location khmer name is required!' }),
    description: string().optional().nullable(),
});

const Update = object({
    nameEn: string().min(1, { message: 'Location english name is required!' }),
    nameKh: string().min(1, { message: 'Location khmer name is required!' }),
    description: string().optional().nullable(),
    status: string().min(1).default('Active')
})

export const LocationModel ={
    Create,
    Update
};