import { any, number, object, string } from "zod";

const Create = object({
    staffId: string().min(1,{message:'Staff ID is required'}),
    firstName: string().min(1, {message: "First name is required!"}),
    lastName: string().min(1, { message: "Last name is required!" }),
    phoneNumber: string().min(9, { message: "Phone number is required at least 9 characters!" }).max(10, {message: 'Phone number is required at most 10 characters'}),
    businessUnitId: number().min(1, { message: "Business unit is required!" }),
    positionId: number().min(1, { message: "Position is required!" }),
    positionLevelId: number().min(1, {message: "Position level is required!"}),
    departmentId: number().min(1, { message: "Department is required!" }),
    description: string().optional(),
    status: string().optional().default('Active')
});

const Update = object({
    id: any().optional(),
    staffId: string().min(1,{message:'Staff ID is required'}),
    firstName: string().min(1, {message: "First name is required!"}),
    lastName: string().min(1, { message: "Last name is required!" }),
    phoneNumber: string().min(9, { message: "Phone number is required at least 9 characters!" }).max(10, {message: 'Phone number is required at most 10 characters'}),
    businessUnitId: number().min(1, { message: "Business unit is required!" }),
    positionId: number().min(1, { message: "Position is required!" }),
    positionLevelId: number().min(1, {message: "Position level is required!"}),
    departmentId: number().min(1, { message: "Department is required!" }),
    description: string().optional(),
    status: string().optional().default('Active')
});

export const HeadDepartmentModel = {
    Create,
    Update
};