import { object, any, string, number } from "zod"

const DepartmentModel = object({
    id: any().optional().nullable(),
    name: string().min(1, { message: 'Department name is required!' }),
    businessDivisionId: number().min(1, { message: 'Business division is required!' }),
    description: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().optional().nullable()
});

export default DepartmentModel;