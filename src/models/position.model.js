import { object, any, string, number, array } from "zod"

const Create = object({
    nameEn: string().min(1, { message: 'Position english name is required!' }),
    nameKh: string().min(1, { message: 'Position khmer name is required!' }),
    businessUnitId: number().min(1, {message: "Primary business is required!"}),
    departmentId: number().min(1, { message: 'Department is required!' }),
    positionLevelId: number().min(1, { message: "Position level is required!" }),
    description: string().optional().nullable(),
    status: string().optional().nullable().default('Active')
});

const Update = object({
    id: any().optional().nullable(),
    nameEn: string().min(1, { message: 'Position english name is required!' }),
    nameKh: string().min(1, { message: 'Position khmer name is required!' }),
    businessUnitId: number().min(1, {message: "Primary business is required!"}),
    departmentId: number().min(1, { message: 'Department is required!' }),
    positionLevelId: number().min(1, { message: "Position level is required!" }),
    description: string().optional().nullable(),
    status: string().optional().nullable().default('Active')
});

export const PositionModel = {
    Create,
    Update
};
