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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { CorporateFareTwoTone, HowToReg, LocationOn } from "@mui/icons-material";


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
};

const Hire = {
    home: lazy(() => import('../pages/hire/home'))
};

const Settings = {

    mainBusiness: {
        home: lazy(() => import('../pages/settings/main-business/home'))
    },

    businessUnit: {
        home: lazy(() => import('../pages/settings/business-unit/home')),
    },

    department: {
        home: lazy(() => import('../pages/settings/department/home')),
    },

    positionLevel: {
        home: lazy(() => import('../pages/settings/position-level/home'))
    },

    position: {
        home: lazy(() => import('../pages/settings/position/home')),
    },

    headDepartment: {
        home: lazy(() => import('../pages/settings/head_department/home'))
    },

    campus: {
        home: lazy(() => import('../pages/settings/campus/home'))
    },

    location: {
        home: lazy(() => import('../pages/settings/location/home'))
    }

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
    /**Reference  Check*/
    {
        name: "Reference Checks",
        path: "/reference-check",
        component: <ReferenceCheck.home />,
        icon: <PersonSearchIcon />,
    },
    /**Job Offer */
    {
        name: "Job Offers",
        path: "/job-offer",
        component: <JobOffer.home />,
        icon: <HowToReg />
    },
    /**Hire*/
    {
        name: "Hire Applicants",
        path: "/hire",
        component: <Hire.home />,
        icon: <AssignmentIndIcon />
    },
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
                icon: <ApartmentIcon />
            },

            /**Department */
            {
                name: "Departments",
                path: "department",
                component: <Settings.department.home />,
                icon: <CorporateFareTwoTone />
            },


            /**Campus */
            {
                name: 'Campuses',
                path: 'campus',
                component: <Settings.campus.home />,
                icon: <MeetingRoomIcon />
            },

            {
                name: 'Locations',
                path: 'location',
                component: <Settings.location.home />,
                icon: <LocationOn />
            },

            /**Position level*/
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
            }
        ]
    },
    /**User setup */
    {
        name: "Users",
        path: "/user",
        component: <User.home />,
        icon: <AccountCircleIcon />,
        isDivider: false,
    }
];