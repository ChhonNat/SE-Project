import { object, any, string, number, array } from "zod"

const PositionModel = object({
    id: any().optional().nullable(),
    name: string().min(1, { message: 'Position name is required!' }),
    description: string().optional().nullable(),
    departmentId: number().min(1, { message: 'Department is required!'}),
    businessDivisions: any().array(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable()
});

export default PositionModel;