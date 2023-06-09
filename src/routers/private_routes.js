import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ReplyIcon from '@mui/icons-material/Reply';
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
const BusinessUnit = {
    home: lazy(() => import('../pages/business-unit/home')),
    create: lazy(() => import('../pages/business-unit/create'))
};
const Department = {
    home: lazy(() => import('../pages/department/home')),
    create: lazy(() => import('../pages/department/create'))
};
const Position = {
    home: lazy(() => import('../pages/position/home')),
    create: lazy(() => import('../pages/position/create'))
};
const ReceivingCategory = {
    home: lazy(() => import('../pages/receiving-category/home')),
    create: lazy(() => import('../pages/receiving-category/create'))
};
const Recruiter = {
    home: lazy(() => import('../pages/recruiter/home')),
    create: lazy(() => import('../pages/recruiter/create'))
};

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
        /**Children candidate  */
        // children: [
        //     {
        //         name: "Record",
        //         path: "record",
        //         component: <Candidate.home />,
        //         icon: <InfoIcon />
        //     },
        //     {
        //         name: "Form",
        //         path: "form",
        //         component: <Candidate.create />,
        //         icon: <FormatAlignJustifyIcon />
        //     }
        // ]
    },
    /**Interview */
    {
        name: "Interviews",
        path: "/interview",
        component: <Interview.home />,
        icon: <RecordVoiceOverIcon />,
        isDivider: false,
        /**Interview interview */
        // children: [
           
        //     {
        //         name: "Record",
        //         path: "record",
        //         component: <Interview.home />,
        //         icon: <FormatListNumberedIcon />
        //     },
        //     {
        //         name: "Form",
        //         path: "form",
        //         component: <Interview.create />,
        //         icon: <FormatAlignJustifyIcon />
        //     }
        // ]
    },
    /**Replies */
    {
        name: "Replies",
        path: "/reply",
        icon: <ReplyIcon />,
        isDivider: false,
        children: [

        ]
    },
    /**Reports */
    {
        name: "Reports",
        path: "/report",
        icon: <AssessmentIcon />,
        isDivider: false,
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
                component: <BusinessUnit.home />,
                icon: <BusinessIcon />,
                /**Children business */
                children: [
                    {
                        name: "Create Business",
                        path: "create",
                        component: <BusinessUnit.create />,
                        icon: null,
                    }
                ]
            },
            /**Department */
            {
                name: "Department",
                path: "department",
                component: <Department.home />,
                icon: <ApartmentIcon />,
                /**Children department */
                children: [
                    {
                        name: "Create Department",
                        path: "create",
                        component: <Department.create />,
                        icon: null
                    }
                ]
            },
            /**Position */
            {
                name: "Position",
                path: "position",
                component: <Position.home />,
                icon: <AirlineSeatReclineNormalIcon />,
                /**Children position */
                children: [
                    {
                        name: "Create Position",
                        path: "create",
                        component: <Position.create />
                    }
                ]
            },
            /**Receive category */
            {
                name: "Receive Category",
                path: "receiving-category",
                component: <ReceivingCategory.home />,
                icon: <CallReceivedIcon />,
                /**Children receive category */
                children: [
                    {
                        name: "Create Receiving Category",
                        path: "create",
                        component: <ReceivingCategory.create />
                    }
                ]
            },
            /**Recruiter */
            {
                name: "Recruiter",
                path: "recruiter",
                component: <Recruiter.home />,
                icon: <SwitchAccountIcon />,
                /**Children recruiter */
                children: [
                    {
                        name: "Create New Recruiter",
                        path: "create",
                        component: <Recruiter.create />
                    }
                ]
            }
        ]
    }
];