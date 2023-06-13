import { lazy } from "react";
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
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import React from "react";

/**
 * Import components
 */
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));
const Candidate = {
    home: lazy(() => import('../pages/candidate/home')),
    create: lazy(() => import('../pages/candidate/create'))
};
const Interview = {
    home: lazy(() => import('../pages/interview/home')),
    create: lazy(() => import('../pages/interview/create'))
};

const Accessment = {
    home: lazy(() => import('../pages/accessment/home'))
};
const Hire = {
    home: lazy(() => import('../pages/hire/home'))
};
const Settings = {
    businessUnit: {
        home: lazy(() => import('../pages/settings/business_unit/home')),
        create: lazy(() => import('../pages/settings/business_unit/home'))
    },
    department: {
        home: lazy(() => import('../pages/settings/department/home')),
        create: lazy(() => import('../pages/settings/department/create'))
    },
    position: {
        home: lazy(() => import('../pages/settings/position/home')),
        create: lazy(() => import('../pages/settings/position/create'))
    },
    receivingCategory: {
        home: lazy(() => import('../pages/settings/receiving_category/home')),
        create: lazy(() => import('../pages/settings/receiving_category/create'))
    },
    recruiter: {
        home: lazy(() => import('../pages/settings/recruiter/home')),
        create: lazy(() => import('../pages/settings/recruiter/create'))
    }
}


export const PRIVATE_ROUTES = [
    /** Dashboard */
    {
        name: "Dashboard",
        path: "/",
        component: <Dashboard />,
        icon: <DashboardIcon />,
        isDivider: false,
        children: [

        ]
    },
    /**Candidate */
    {
        name: "Candidates",
        path: "/candidate",
        component: <Candidate.home />,
        icon: <PeopleAltIcon />,
        isDivider: false,
    },
    /**Interview */
    {
        name: "Interviews",
        path: "/interview",
        component: <Interview.home />,
        icon: <RecordVoiceOverIcon />,
        isDivider: false,
    },
    /**Assessment */
    {
        name: "Assessments",
        path: "/assessment",
        component: <Accessment.home />,
        icon: <PersonSearchIcon />,
    },
    /**Replies */
    {
        name: "Hires",
        path: "/hire",
        component: <Hire.home />,
        icon: <ChecklistIcon />,
        isDivider: false,
    },
    /**Reports */
    {
        name: "Reports",
        path: "/report",
        icon: <AssessmentIcon />,
        isDivider: true,
        children: [

        ]
    },
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
                name: "Business",
                path: "business",
                component: <Settings.businessUnit.home />,
                icon: <BusinessIcon />,
            },
            /**Department */
            {
                name: "Department",
                path: "department",
                component: <Settings.department.home />,
                icon: <ApartmentIcon />,
            },
            /**Position */
            {
                name: "Position",
                path: "position",
                component: <Settings.position.home />,
                icon: <AirlineSeatReclineNormalIcon />,
            },
            /**Receive category */
            {
                name: "Receive Category",
                path: "receiving-category",
                component: <Settings.receivingCategory.home />,
                icon: <CallReceivedIcon />,
            },
            /**Recruiter */
            {
                name: "Recruiter",
                path: "recruiter",
                component: <Settings.recruiter.home />,
                icon: <SwitchAccountIcon />,
                /**Children recruiter */
                // children: [
                //     {
                //         name: "Create New Recruiter",
                //         path: "create",
                //         component: <Recruiter.create />
                //     }
                // ]
            }
        ]
    }
];