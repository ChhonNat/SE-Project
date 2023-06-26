import { object, string } from "zod";

const UserModel = object({
    staffId: string(),
    firstName: string(),
    secondName: string(),
    gender: string(),
    dob: string(),
    email: string(),
    phoneNumber: string(),
    username: string(),
    password: string(),
    confirmPassword: string(),
    roleId: string()
});

export default UserModel;