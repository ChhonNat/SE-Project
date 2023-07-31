import { object, string } from "zod";

const JobOfferModel = object({
    offerSalary: string().optional().nullable(),
    remark: string()
});

export default JobOfferModel;