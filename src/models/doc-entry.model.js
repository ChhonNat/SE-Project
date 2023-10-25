import { any, number, object, string } from "zod";

const Create = object({
    docCode: string().min(1, { message: "numbering is required!" }),
    docNameEn: string().min(1, { message: "document name English is required!" }),
    docNameKh: string().optional().nullable(),
    deptId: number().min(1, { message: "source of document is required!" }),
    campusId: number().min(1, { message: "campus is required!" }),
    year: string().min(1, { message: "year is required!" }),
    issuedDate: string().min(1, { message: "issued date is required!" }),
    issueNum: string().default('0'),
    numOfPage: string().min(1, { message: "number of page is required!" }),
    approvedBy: string().default(0).nullable(),
    typeOfDocId: number().min(1, { message: "type of document is required!" }),
    mainCateId: number().default(0).nullable(),
    subCateId: number().default(0).nullable(),
    subSubCateId: number().default(0).nullable(),
    files: any().default(null),
    isSecret: number().optional(),
    chronoNum: string().min(1, { message: "chrono No is required!" }),
    remark: string().optional().nullable()
});

const Update = object({
    docCode: string().min(1, { message: "numbering is required!" }),
    docNameEn: string().min(1, { message: "document name English is required!" }),
    docNameKh: string().optional().nullable(),
    deptId: number().min(1, { message: "source of document is required!" }),
    campusId: number().min(1, { message: "campus is required!" }),
    year: number().min(1, { message: "year is required!" }),
    issuedDate: string().min(1, { message: "issued date is required!" }),
    issueNum: string().optional().default('0'),
    numOfPage: string().min(1, { message: "number of page is required!" }),
    approvedBy: string().default(0).nullable(),
    typeOfDocId: number().min(1, { message: "type of document is required!" }),
    mainCateId: number().default(0).nullable(),
    subCateId: number().default(0).nullable(),
    subSubCateId: number().default(0).optional().nullable(),
    files: any().default(null).nullable(),
    isSecret: number().optional(),
    chronoNum: string().min(1, { message: "chrono No is required!" }),
    remark: string().optional().nullable(),
});

export const DocEntryModel = {
    Create,
    Update,
};
