import { object, any, string, number, array } from "zod";


const Create = object({
    nameEn: string().min(1, { message: 'Position english name is required!' }),
    nameKh: string().min(1, { message: 'Position khmer name is required!' }),
    departmentId: number().min(1, { message: 'Department is required!'}).default(3),
    businessUnitId: number().min(1, { message: 'Business devision is required!' }),
    description: string().optional().nullable(),
    status: string().optional().nullable().default('Active')
});

const Update = object({
    id: any().optional().nullable(),
    nameEn: string().min(1, { message: 'Position english name is required!' }),
    nameKh: string().min(1, { message: 'Position khmer name is required!' }),
    departmentId: number().min(1, { message: 'Department is required!'}).default(3),
    businessUnitId: number().min(1, { message: 'Business devision is required!' }),
    description: string().optional().nullable(),
    status: string().optional().nullable().default('Active')
});

export const PositionLevelModel = {
    Create,
    Update
};