import { object, any, string, number, array } from "zod"

const DepartmentModel = object({
    id: any().optional().nullable(),
    nameEn: string().min(1, { message: 'Department english name is required!' }),
    nameKh: string().min(1, { message: 'Department khmer name is required!' }),
    code: string().min(4, { message: 'Code is required at least 4 characters!' })
        .max(5, { message: 'Code is required at most 5 characters!' }),
    businessUnitId: number().min(1, { message: 'Primary business is required!' }),
    description: string().optional().nullable(),
    createdAt: any().optional().nullable(),
    createdBy: any().optional().nullable(),
    updatedAt: any().optional().nullable(),
    updatedBy: any().optional().nullable(),
    status: string().min(1, { message: 'Status is required!' }).default('Active')
});

export default DepartmentModel;