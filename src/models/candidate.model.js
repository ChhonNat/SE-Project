import { string, object, any, number, date } from 'zod';

const CandidateModel = object({
    firstName: string().min(1),
    lastName: string().min(1),
    gender: string().min(1),
    phoneNumber: string().min(9).max(10),
    email: string().min(1).email(),
    positionId: string(),
    departmentId: string(),
    businessId: string(),
    location: string(),
    receivedId: string(),
    recruiterId: string(),
    appliedDate: string(),
    shortListedDate: string()
}); 

export default CandidateModel;
