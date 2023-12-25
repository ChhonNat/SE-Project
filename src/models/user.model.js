import { array, number, object, string } from 'zod';


const Create = object({
  username: string().min(1, { message: "Username is required!" }),
  phone_number: string()
    .min(9, { message: "Phone number must be at least 9 characters" })
    .max(10, { message: "Phone number must be at most 10 characters" }),
  email: string().min(1, { message: "Email is required!" }),
  password: string().min(1, { message: "Password is required!" }),
  password_confirmed: string().min(1, {
    message: "Confirm password is required!",
  }),
  roles: number().min(1, { message: "Roles is required!" }),
  permissions: array(string()).min({message: "permissions is required!"}),
}).refine((data) => data?.password === data?.password_confirmed, {
  message: "Confirm password doesn't match",
  path: ["password_confirmed"],
});

const Update = object({
  username: string().min(1, { message: "Username is required!" }),
  phone_number: string()
    .min(9, { message: "Phone number must be at least 9 characters" })
    .max(10, { message: "Phone number must be at most 10 characters" }),
  email: string().min(1, { message: "Email is required!" }),
  roles: number().min(1, { message: "Roles is required!" }),
  permissions: array(string()).min({message: "permissions is required!"}),
  status: string().default("Inacitive")
})

export const UserModel = {
  Create,
  Update,
};
