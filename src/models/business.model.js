import { object, any, string } from "zod"

const BusinessModel = object({
    id: any().optional().nullable(),
    name: string().min(1, { message: 'Business name is required!' }),
    description: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable()
});

export default BusinessModel;