import { any, number, object, string } from "zod";

const CommitteeModel = object({
    id: any().optional(),
    staffId: string().min(1,{message:'Staff ID is required'}),
    firstName: string().min(1, {message: "First name is required!"}),
    lastName: string().min(1, { message: "Last name is required!" }),
    fullName: string().optional(),
    phoneNumber: string().min(9, { message: "Phone number is required at least 9 characters!" }).max(10, {message: 'Phone number is required at most 10 characters'}),
    positionId: number().min(1, { message: "Position is required!" }),
    positionName: string().optional(),
    positionLevelId: number().min(1, {message: "Position level is required!"}),
    positionLevelName: string().optional().nullable(),
    businessUnitId: number().min(1, { message: "Business unit is required!" }),
    businessUnitName: string().optional(),
    departmentId: number().min(1, { message: "Department is required!" }),
    departmentName: string().optional(),
    description: string().optional(),
    createdAt: any().optional(),
    createdBy: any().optional(),
    updatedAt: any().optional(),
    updatedBy: any().optional(),
    status: string().optional().default('Active')
});

export default CommitteeModel;