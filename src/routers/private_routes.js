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

    position: {
        home: lazy(() => import('../pages/settings/position/home')),
        // create: lazy(() => import('../pages/settings/position/create'))
    },

    recruiter: {
        home: lazy(() => import('../pages/settings/recruiter/home')),
        // create: lazy(() => import('../pages/settings/recruiter/create'))
    },

    department: {
        home: lazy(() => import('../pages/settings/department/home')),
        // create: lazy(() => import('../pages/settings/department/create'))
    },

    headDepartment: {
        home: lazy(() => import('../pages/settings/head_department/home'))
    },

    businessUnit: {
        home: lazy(() => import('../pages/settings/business/home')),
        // create: lazy(() => import('../pages/settings/business/home'))
    },

    location: {
        home: lazy(() => import('../pages/settings/location/home'))
    },

    // receivingCategory: {
    //     home: lazy(() => import('../pages/settings/receiving_category/home')),
    //     create: lazy(() => import('../pages/settings/receiving_category/create'))
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

            /**Business */
            {
                name: "Business Divisions",
                path: "business",
                component: <Settings.businessUnit.home />,
                icon: <MeetingRoomIcon />,
            },

            /**Department */
            {
                name: "Departments",
                path: "department",
                component: <Settings.department.home />,
                icon: <ApartmentIcon />,
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
            {
                name: 'Locations',
                path: 'location',
                component: <Settings.location.home />,
                icon: <PinDropIcon />
            },

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
    //    {
    //     name: "Users",
    //     path: "/user",
    //     component: <User.home />,
    //     icon:  <AccountCircleIcon />,
    //     isDivider: false,
    // }
];