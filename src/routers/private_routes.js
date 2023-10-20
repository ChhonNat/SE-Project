import React, { lazy } from "react";

/**
 * MUI icon
 */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import MainCategoryIcon from '@mui/icons-material/Category';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SubCategoryIcon from '@mui/icons-material/Segment';
import SettingsIcon from '@mui/icons-material/Settings';
import SubSubCategoryIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { appConfig } from "../constants/app_cont";

/**
 * Import all page components
 */
// const Candidate = {
//     HomeComponent: lazy(() => import('../pages/candidate/home')),
// };

// const Interview = {
//     HomeComponent: lazy(() => import('../pages/interview/home')),
// };

// const ReferenceCheck = {
//     HomeComponent: lazy(() => import('../pages/reference-check/home'))
// };

// const JobOffer = {
//     HomeComponent: lazy(() => import('../pages/job-offer/home'))
// };

// const Hire = {
//     HomeComponent: lazy(() => import('../pages/hire/home'))
// };
const DocEntry = {
    HomeComponent: lazy(() => import('../pages/doc-entry/home'))
};

const Settings = {

    MainBusiness: {
        HomeComponent: lazy(() => import('../pages/settings/main-business/home'))
    },

    BusinessUnit: {
        HomeComponent: lazy(() => import('../pages/settings/business-unit/home')),
    },

    GroupDocument: {
        HomeComponent: lazy(() => import('../pages/settings/group-document/home')),
    },

    MainCategories: {
        HomeComponent: lazy(() => import('../pages/settings/main-categories/home')),
    },

    SubCategories: {
        HomeComponent: lazy(() => import('../pages/settings/sub-categories/home')),
    },

    SubSubCategories: {
        HomeComponent: lazy(() => import('../pages/settings/child-sub-categories/home')),
    },


    Department: {
        HomeComponent: lazy(() => import('../pages/settings/department/home')),
    },

    PositionLevel: {
        HomeComponent: lazy(() => import('../pages/settings/position-level/home'))
    },

    Position: {
        HomeComponent: lazy(() => import('../pages/settings/position/home')),
    },

    HeadDepartment: {
        HomeComponent: lazy(() => import('../pages/settings/head_department/home'))
    },

    Campus: {
        HomeComponent: lazy(() => import('../pages/settings/campus/home'))
    },

    Location: {
        HomeComponent: lazy(() => import('../pages/settings/location/home'))
    }

};

const User = {
    HomeComponent: lazy(() => import('../pages/user/home'))
};


export const PRIVATE_ROUTES = [
    /** document-entry */
    {
        name: "Documents Entry",
        path: "/doc-entry",
        component: <DocEntry.HomeComponent />,
        icon: <InsertDriveFileIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
    },
    /**Settings */
    {
        name: "Settings",
        path: "/settings",
        icon: <SettingsIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        /**Children settings */
        children: [

            // //Department
            // {
            //     name: "Departments",
            //     path: "department",
            //     component: <Settings.Department.HomeComponent />,
            //     icon: <CorporateFareTwoTone style={{ color: appConfig.systemColor }} />
            // },

            // Main business
            {
                name: "Type of Documents",
                path: "group-document",
                component: <Settings.GroupDocument.HomeComponent />,
                icon: <BusinessIcon style={{ color: appConfig.systemColor }} />,
                // isHide: true
            },
            // Main categories
            {
                name: "Main Categories",
                path: "main-categories",
                component: <Settings.MainCategories.HomeComponent />,
                icon: <MainCategoryIcon style={{ color: appConfig.systemColor }} />,
                // isHide: true
            },
            // Sub categories
            {
                name: "Sub-Categories",
                path: "sub-categories",
                component: <Settings.SubCategories.HomeComponent />,
                icon: <SubCategoryIcon style={{ color: appConfig.systemColor }} />,
                // isHide: true
            },
            // child-Sub categories
            {
                name: "Sub-Sub-Categories",
                path: "child-sub-categories",
                component: <Settings.SubSubCategories.HomeComponent />,
                icon: <SubSubCategoryIcon style={{ color: appConfig.systemColor }} />,
                // isHide: true
            },

            ////'
        ]
    },
    /**User setup */
    {
        name: "Users",
        path: "/user",
        component: <User.HomeComponent />,
        icon: <AccountCircleIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
    }
];