import React, { lazy } from "react";

/**
 * MUI icon
 */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import BusinessIcon from '@mui/icons-material/Business';
import MainCategoryIcon from '@mui/icons-material/Category';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PaidIcon from '@mui/icons-material/Paid';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SubCategoryIcon from '@mui/icons-material/Segment';
import SettingsIcon from '@mui/icons-material/Settings';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import SubSubCategoryIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { appConfig } from "../constants/app_cont";
/**
 * Import all page components
 */
const Dashboard = {
    HomeComponent: lazy(() => import('../pages/dashboard/dashboard'))
};
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

const UserManagement = {
    Counters : {
        HomeComponent: lazy(() => import('../pages/user-management/counters/home'))
    },

    User : {
        HomeComponent: lazy(() => import('../pages/user-management/user/home'))
    },

};

const SystemConfiguration = {
    DisplaySetting : {
        HomeComponent: lazy(() => import('../pages/system-configuration/display-setting/home'))
    },
    SoundSetting : {
        HomeComponent: lazy(() => import('../pages/system-configuration/sound-setting/home'))
    },
    TicketSetting : {
        HomeComponent: lazy(() => import('../pages/system-configuration/ticket-setting/home'))
    },
};

const ManageServicesPoint = {
    Payment : {
        HomeComponent: lazy(() => import('../pages/manage-services-point/payment/home'))
    },
    Information : {
        HomeComponent: lazy(() => import('../pages/manage-services-point/information/home'))
    },
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

export const PRIVATE_ROUTES = [
    /**Dashboard */
    {
        name: "Dashboard",
        path: "/dashboard",
        component: <Dashboard.HomeComponent />,
        icon: <DashboardIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        // isHide: true
    },
    /**User Management */
    {
        name: "User Management",
        path: "/user-management",
        icon: <ManageAccountsIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        /**Children settings */
        children: [

            /**User setup */
            {
                name: "Counters",
                path: "counters",
                component: <UserManagement.Counters.HomeComponent />,
                icon: <SupportAgentIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },

            /**User setup */
            {
                name: "Users",
                path: "user",
                component: <UserManagement.User.HomeComponent />,
                icon: <AccountCircleIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
        ]
    },
    /**System Configuration */
    {
        name: "System Configuration",
        path: "/system-confiiguration",
        icon: <DisplaySettingsIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        /**Children settings */
        children: [
            {
                name: "Display Setting",
                path: "display-setting",
                component: <SystemConfiguration.DisplaySetting.HomeComponent />,
                icon: <ArtTrackIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
            {
                name: "Sound Setting",
                path: "sound-setting",
                component: <SystemConfiguration.SoundSetting.HomeComponent />,
                icon: <SpatialAudioOffIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
            {
                name: "Ticket Setting",
                path: "ticket-setting",
                component: <SystemConfiguration.TicketSetting.HomeComponent />,
                icon: <ConfirmationNumberIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
        ]
    },
    /**Manage Payment */
    {
        name: "Manage Service Points",
        path: "/system-confiiguration",
        icon: <RoomServiceIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        /**Children settings */
        children: [
            {
                name: "Payments",
                path: "payment",
                component: <ManageServicesPoint.Payment.HomeComponent />,
                icon: <PaidIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
            {
                name: "Information",
                path: "information",
                component: <ManageServicesPoint.Information.HomeComponent />,
                icon: <NewspaperIcon style={{ color: appConfig.systemColor }} />,
                isDivider: false,
                // isHide: true
            },
        ]
    },

    /** document-entry */
    {
        name: "Documents Entry",
        path: "/doc-entry",
        component: <DocEntry.HomeComponent />,
        icon: <InsertDriveFileIcon style={{ color: appConfig.systemColor }} />,
        isDivider: false,
        isHide: true
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
            //     path: "department",s
            //     component: <Settings.Department.HomeComponent />,
            // },s

            // Main business
            {
                name: "Types of Document",
                path: "group-document",
                component: <Settings.GroupDocument.HomeComponent />,
                icon: <BusinessIcon style={{ color: appConfig.systemColor }} />,
                isHide: true
            },
            // Main categories
            {
                name: "Main Categories",
                path: "main-categories",
                component: <Settings.MainCategories.HomeComponent />,
                icon: <MainCategoryIcon style={{ color: appConfig.systemColor }} />,
                isHide: true
            },
            // Sub categories
            {
                name: "Sub Categories",
                path: "sub-categories",
                component: <Settings.SubCategories.HomeComponent />,
                icon: <SubCategoryIcon style={{ color: appConfig.systemColor }} />,
                isHide: true
            },
            // child-Sub categories
            {
                name: "Sub Sub Categories",
                path: "child-sub-categories",
                component: <Settings.SubSubCategories.HomeComponent />,
                icon: <SubSubCategoryIcon style={{ color: appConfig.systemColor }} />,
                isHide: true
            },

            ////'
        ]
    },
];