import { any, number, object, string } from "zod";

const HeadDepartmentModel = object({
    id: any().optional(),
    staffId: any(),
    firstName: string().min(1, {message: "First name is required!"}),
    lastName: string().min(1, { message: "Last name is required!" }),
    fullName: string().optional(),
    phoneNumber: string().min(1, { message: "Phone number is required!" }),
    positionId: number().min(1, { message: "Position is required!" }),
    positionName: string().optional(),
    businessDivisionId: number().min(1, { message: "Business division is required!" }),
    businessDivisionName: string().optional(),
    departmentId: number().min(1, { message: "Department is required!" }),
    departmentName: string().optional(),
    description: string().optional(),
    createdAt: any().optional(),
    createdBy: any().optional(),
    updatedAt: any().optional(),
    updatedBy: any().optional(),
    status: string().optional().default('Active')
});

export default HeadDepartmentModel;