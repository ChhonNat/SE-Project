import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ReplyIcon from '@mui/icons-material/Reply';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import React from "react";

/**
 * Components
 */
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));
const Candidate = {
    home: lazy(() => import('../pages/candidates/home')),
    create: lazy(() => import('../pages/candidates/create'))
};
const Interview = {
    home: lazy(() => import('../pages/interviews/home')),
    create: lazy(() => import('../pages/interviews/create'))
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
    {
        name: "Dashboard",
        path: "/",
        component: <Dashboard />,
        icon: <DashboardIcon />,
        isDivider: false,
        children: [

        ]
    },
    {
        name: "Candidate",
        path: "/candidate",
        icon: <PeopleAltIcon />,
        isDivider: false,
        children: [
            {
                name: "Record",
                path: "record",
                component: <Candidate.home />,
                icon: <InfoIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <Candidate.create />,
                icon: <FormatAlignJustifyIcon />
            }
        ]
    },
    {
        name: "Interview",
        path: "/interview",
        icon: <RecordVoiceOverIcon />,
        isDivider: false,
        children: [
           
            {
                name: "Record",
                path: "record",
                component: <Interview.home />,
                icon: <FormatListNumberedIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <Interview.create />,
                icon: <FormatAlignJustifyIcon />
            }
        ]
    },
    {
        name: "Replies",
        path: "/reply",
        icon: <ReplyIcon />,
        isDivider: false,
        children: [

        ]
    },
    {
        name: "Reports",
        path: "/report",
        icon: <AssessmentIcon />,
        isDivider: false,
        children: [

        ]
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <SettingsIcon />,
        isDivider: false,
        children: [
            {
                name: "Business",
                path: "business",
                component: <BusinessUnit.home />,
                icon: <BusinessIcon />,
                children: [
                    {
                        name: "Create Business",
                        path: "create",
                        component: <BusinessUnit.create />,
                        icon: null,
                    }
                ]
            },
            {
                name: "Department",
                path: "department",
                component: <Department.home />,
                icon: <ApartmentIcon />,
                children: [
                    {
                        name: "Create Department",
                        path: "create",
                        component: <Department.create />,
                        icon: null
                    }
                ]
            },
            {
                name: "Position",
                path: "position",
                component: <Position.home />,
                icon: <AirlineSeatReclineNormalIcon />,
                children: [
                    {
                        name: "Create Position",
                        path: "create",
                        component: <Position.create />
                    }
                ]
            },
            {
                name: "Receive Category",
                path: "receiving-category",
                component: <ReceivingCategory.home />,
                icon: <CallReceivedIcon />,
                children: [
                    {
                        name: "Create Receiving Category",
                        path: "create",
                        component: <ReceivingCategory.create />
                    }
                ]
            },
            {
                name: "Recruiter",
                path: "recruiter",
                component: <Recruiter.home />,
                icon: <SwitchAccountIcon />,
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