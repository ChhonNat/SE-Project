import { lazy } from "react";
import React from "react";

/**
 * MUI icon
 */
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import DomainIcon from '@mui/icons-material/Domain';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ElevatorIcon from '@mui/icons-material/Elevator';

/**
 * Import all page components
 */
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));

const Candidate = {
    home: lazy(() => import('../pages/candidate/home')),
    // create: lazy(() => import('../pages/candidate/create'))
};

const Interview = {
    home: lazy(() => import('../pages/interview/home')),
    // create: lazy(() => import('../pages/interview/create'))
};

const Assessment = {
    home: lazy(() => import('../pages/assessment/home'))
};

const Hire = {
    home: lazy(() => import('../pages/hire/home'))
};

const Settings = {

    positionLevel : {
        home: lazy(() => import('../pages/settings/position-level/home'))
    },      

    position: {
        home: lazy(() => import('../pages/settings/position/home')),
    },

    department: {
        home: lazy(() => import('../pages/settings/department/home')),
    },

    headDepartment: {
        home: lazy(() => import('../pages/settings/head_department/home'))
    },

    mainBusiness: {
        home: lazy(() => import('../pages/settings/main-business/home'))
    },

    businessUnit: {
        home: lazy(() => import('../pages/settings/business-unit/home')),
    },

    subBusinessUnit: {
        home: lazy(() => import('../pages/settings/sub-business-unit/home'))
    },

    campus: {
        home: lazy(() => import('../pages/settings/campus/home'))
    },

    // receivingCategory: {
    //     home: lazy(() => import('../pages/settings/receiving_category/home')),
    //     create: lazy(() => import('../pages/settings/receiving_category/create'))
    // },

    // recruiter: {
    //     home: lazy(() => import('../pages/settings/recruiter/home')),
    // },

};

const User = {
    home: lazy(() => import('../pages/user/home'))
};


export const PRIVATE_ROUTES = [

    /** Dashboard */
    // {
    //     name: "Dashboard",
    //     path: "/",
    //     component: <Dashboard />,
    //     icon: <DashboardIcon />,
    //     isDivider: false,
    //     children: [

    //     ]
    // },

    /**Reports */
    // {
    //     name: "Reports",
    //     path: "/report",
    //     icon: <AssessmentIcon />,
    //     isDivider: true,
    //     children: [

    //     ]
    // },

    /**Candidate */
    {
        name: "Candidates",
        path: "/candidate",
        component: <Candidate.home />,
        icon: <PeopleAltIcon />,
        isDivider: false,
    },
    /**Interview */
    // {
    //     name: "Interviews",
    //     path: "/interview",
    //     component: <Interview.home />,
    //     icon: <RecordVoiceOverIcon />,
    //     isDivider: false,
    // },
    /**Assessment */
    // {
    //     name: "Assessments",
    //     path: "/assessment",
    //     component: <Assessment.home />,
    //     icon: <PersonSearchIcon />,
    // },
    /**Replies */
    // {
    //     name: "Hires",
    //     path: "/hire",
    //     component: <Hire.home />,
    //     icon: <HowToRegIcon />,
    //     isDivider: false,
    // },
    /**Settings */
    {
        name: "Settings",
        path: "/settings",
        icon: <SettingsIcon />,
        isDivider: false,
        /**Children settings */
        children: [

            // Main business
            {
                name: "Main Businesses",
                path: "main-business",
                component: <Settings.mainBusiness.home />,
                icon: <BusinessIcon />
            },

            /**Business */
            {
                name: "Primary Businesses",
                path: "business",
                component: <Settings.businessUnit.home />,
                icon: <MeetingRoomIcon />,
            },

            /**Sub Business */
            {
                name: "Secondary Businesses",
                path: "sub-business",
                component: <Settings.subBusinessUnit.home />,
                icon: <CorporateFareIcon />
            },

            /**Department */
            {
                name: "Departments",
                path: "department",
                component: <Settings.department.home />,
                icon: <ApartmentIcon />,
            },

            // Position label
            {
                name: "Position Levels",
                path: "position-level",
                component: <Settings.positionLevel.home/>,
                icon: <ElevatorIcon/>,
            },

            /**Position */
            {
                name: "Positions",
                path: "position",
                component: <Settings.position.home />,
                icon: <AirlineSeatReclineNormalIcon />,
            },

            /**Department */
            {
                name: "Head Departments",
                path: "head-department",
                component: <Settings.headDepartment.home />,
                icon: <PeopleAltIcon />,
            },

            /**Location */
            // {
            //     name: 'Campuses',
            //     path: 'campus',
            //     component: <Settings.campus.home />,
            //     icon: <PinDropIcon />
            // },

            /**Recruiter */
            // {
            //     name: "Recruiters",
            //     path: "recruiter",
            //     component: <Settings.recruiter.home />,
            //     icon: <SwitchAccountIcon />,
            //     /**Children recruiter */
            //     // children: [
            //     //     {
            //     //         name: "Create New Recruiter",
            //     //         path: "create",
            //     //         component: <Recruiter.create />
            //     //     }
            //     // ]
            // },


        ]
    },
    /**Replies */
    {
        name: "Users",
        path: "/user",
        component: <User.home />,
        icon: <AccountCircleIcon />,
        isDivider: false,
    }
];