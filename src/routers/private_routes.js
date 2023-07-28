import React, { lazy } from "react";

/**
 * MUI icon
 */
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { HowToReg } from "@mui/icons-material";

/**
 * Import all page components
 */
const Candidate = {
    home: lazy(() => import('../pages/candidate/home')),
    // create: lazy(() => import('../pages/candidate/create'))
};

const Interview = {
    home: lazy(() => import('../pages/interview/home')),
};

const ReferenceCheck = {
    home: lazy(() => import('../pages/reference-check/home'))
};

const JobOffer = {
    home: lazy(() => import('../pages/job-offer/home'))
}

// const Assessment = {
//     home: lazy(() => import('../pages/assessment/home'))
// };

const Settings = {

    positionLevel: {
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

    committee: {
        home: lazy(() => import('../pages/settings/committee/home'))
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

};

const User = {
    home: lazy(() => import('../pages/user/home'))
};


export const PRIVATE_ROUTES = [


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
    /**Interview */
    {
        name: "Reference Checks",
        path: "/reference-check",
        component: <ReferenceCheck.home />,
        icon: <PersonSearchIcon />,
    },

    /**Job Offer */

    // {
    //     name: "Job Offers",
    //     path: "/job-offer",
    //     component: <JobOffer.home />,
    //     icon: <HowToReg />
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
                component: <Settings.positionLevel.home />,
                icon: <ElevatorIcon />,
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

            /**Committee */
            {
                name: "Committees",
                path: "committee",
                component: <Settings.committee.home />,
                icon: <PeopleAltIcon />,
            },

        ]
    },
    /**User set up */
    {
        name: "Users",
        path: "/user",
        component: <User.home />,
        icon: <AccountCircleIcon />,
        isDivider: false,
    }
];