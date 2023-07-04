import { object, any, string } from "zod"

const MainBusinessModel = object({
    id: any().optional().nullable(),
    nameEn: string().min(1, { message: 'Main business english name is required!' }),
    nameKh: string().min(1, { message: 'Main business khmer name is required!' }),
    description: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable()
});

export default MainBusinessModel;