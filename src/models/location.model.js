import { object, any, string } from "zod"

const LocationModel = object({
    id: any().optional().nullable(),
    name: string().optional().nullable(),
    description: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable()
});

export default LocationModel;