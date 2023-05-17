import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ReplyIcon from '@mui/icons-material/Reply';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import React from "react";

/**
 * Components
 */
const Dashboard = React.lazy(() => import('../pages/dashboard/dashboard'));
const Candidate = {
    info : React.lazy(() => import('../pages/candidates/info')),
    form : React.lazy(() => import('../pages/candidates/form'))
};
const Interview = {
    record: React.lazy(() => import('../pages/interviews/list')),
    form: React.lazy(() => import('../pages/interviews/form'))
};

export const ROUTES = [
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
                name: "Info",
                path: "info",
                component: <Candidate.info />,
                icon: <InfoIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <Candidate.form />,
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
                component: <Interview.record />,
                icon: <FormatListNumberedIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <Interview.form />,
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
        path: "/setting",
        icon: <SettingsIcon />,
        isDivider: false,
        children: [

        ]
    },
];