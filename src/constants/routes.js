import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ReplyIcon from '@mui/icons-material/Reply';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

/**
 * Components
 */
import Dashboard from "../pages/dashboard/dashboard";
import CandidateInfo from "../pages/candidates/info";
import CandidateForm from "../pages/candidates/form";
import InterviewRecord from "../pages/interviews/list";
import InterviewForm from "../pages/interviews/form";

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
                component: <CandidateInfo />,
                icon: <InfoIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <CandidateForm />,
                icon: <FormatAlignJustifyIcon />
            }
        ]
    },
    {
        name: "Interview",
        path: "/interview",
        icon: <RecordVoiceOverIcon />,
        isDivider: true,
        children: [
            {
                name: "Record",
                path: "record",
                component: <InterviewRecord />,
                icon: <FormatListNumberedIcon />
            },
            {
                name: "Form",
                path: "form",
                component: <InterviewForm />,
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