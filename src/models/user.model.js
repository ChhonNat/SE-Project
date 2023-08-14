import { number, object, string, any } from "zod";

const Create = object({
  staffId: string().min(1, { message: "Staff ID is required!" }),
  firstName: string().min(1, { message: "First name is required!" }),
  secondName: string().min(1, { message: "Last name is required!" }),
  gender: string().min(1, { message: "Gender is required!" }),
  birthDate: string().min(1, { message: "Date of birth is required!" }),
  email: string().min(1, { message: "Email is required!" }),
  phoneNumber: string()
    .min(9, { message: "Phone number is require at least 9 characters" })
    .max(10, { message: "Phone number is require at most 10 characters" }),
  username: string().min(1, { message: "Username is required!" }),
  password: string().min(1, { message: "Password is required!" }),
  confirmPassword: string().min(1, {
    message: "Confirm password is required!",
  }),
  roles: any(),
  departmentId: number().min(1, {message: 'Department is required!'})
}).refine((data) => data?.password === data?.confirmPassword, {
  message: "Confirm password doesn't match",
  path: ["confirmPassword"],
});

const Update = object({
  staffId: string().min(1, { message: "Staff ID is required!" }),
  firstName: string().min(1, { message: "First name is required!" }),
  secondName: string().min(1, { message: "Last name is required!" }),
  gender: string().min(1, { message: "Gender is required!" }),
  birthDate: string().min(1, { message: "Date of birth is required!" }),
  email: string().min(1, { message: "Email is required!" }),
  phoneNumber: string()
    .min(9, { message: "Phone number is require at least 9 characters" })
    .max(10, { message: "Phone number is require at most 10 characters" }),
  username: string().min(1, { message: "Username is required!" }),
  password: string().optional().nullable(),
  confirmPassword: string().optional().nullable(),
  roles: any(),
  status: string().optional().default("Active"),
  departmentId: number().min(1, {message: 'Department is required!'})
});

export const UserModel = {
  Create,
  Update,
};
