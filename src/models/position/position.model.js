import { object, any, string, number, array } from "zod"

const PositionModel = object({
    id: any().optional().nullable(),
    nameEn: string().min(1, { message: 'Position english name is required!' }),
    nameKh: string().min(1, { message: 'Position khmer name is required!' }),
    description: string().optional().nullable(),
    departmentId: number().min(1, { message: 'Department is required!' }),
    departmentName: string().optional().nullable(),
    businessUnitId: number().min(1, {message: "Primary business is required!"}),
    businessUnitName: string().optional().nullable(),
    positionLevelId: number().min(1, { message: "Position level is required!" }),
    positionLevelName: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable().default('Active')
});

export default PositionModel;

    // businessDivisions: any().array().min(1, { message: 'Business devision is required!' }),
