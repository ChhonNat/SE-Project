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
import { appConfig } from "../constants/app_cont";


/**
 * Import all page components
 */
const Candidate = {
    HomeComponent: lazy(() => import('../pages/candidate/home')),
};

const Interview = {
    HomeComponent: lazy(() => import('../pages/interview/home')),
};

const ReferenceCheck = {
    HomeComponent: lazy(() => import('../pages/reference-check/home'))
};

const JobOffer = {
    HomeComponent: lazy(() => import('../pages/job-offer/home'))
};

const Hire = {
    HomeComponent: lazy(() => import('../pages/hire/home'))
};

const Settings = {

    MainBusiness: {
        HomeComponent: lazy(() => import('../pages/settings/main-business/home'))
    },

    BusinessUnit: {
        HomeComponent: lazy(() => import('../pages/settings/business-unit/home')),
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

const User = {
    HomeComponent: lazy(() => import('../pages/user/home'))
};


export const PRIVATE_ROUTES = [

    /**Candidate */
    {
        name: "Candidates",
        path: "/candidate",
        component: <Candidate.HomeComponent />,
        icon: <PeopleAltIcon style={{color: appConfig.systemColor }} />,
        isDivider: false,
    },
    // /**Interview */
    // {
    //     name: "Interviews",
    //     path: "/interview",
    //     component: <Interview.HomeComponent />,
    //     icon: <RecordVoiceOverIcon style={{color: appConfig.systemColor }} />,
    //     isDivider: false,
    // },
    // /**Reference  Check*/
    // {
    //     name: "Reference Checks",
    //     path: "/reference-check",
    //     component: <ReferenceCheck.HomeComponent />,
    //     icon: <PersonSearchIcon style={{color: appConfig.systemColor }} />,
    // },
    // /**Job Offer */
    // {
    //     name: "Job Offers",
    //     path: "/job-offer",
    //     component: <JobOffer.HomeComponent />,
    //     icon: <HowToReg style={{color: appConfig.systemColor }} />
    // },
    // /**Hire*/
    // {
    //     name: "Hire Applicants",
    //     path: "/hire",
    //     component: <Hire.HomeComponent />,
    //     icon: <AssignmentIndIcon style={{color: appConfig.systemColor }} />
    // },
    /**Settings */
    {
        name: "Settings",
        path: "/settings",
        icon: <SettingsIcon style={{color: appConfig.systemColor }} />,
        isDivider: false,
        /**Children settings */
        children: [

            // Main business
            {
                name: "Main Businesses",
                path: "main-business",
                component: <Settings.MainBusiness.HomeComponent />,
                icon: <BusinessIcon style={{color: appConfig.systemColor }} />
            },

            /**Business */
            {
                name: "Primary Businesses",
                path: "business",
                component: <Settings.BusinessUnit.HomeComponent />,
                icon: <ApartmentIcon style={{color: appConfig.systemColor }} />
            },

            // /**Department */
            // {
            //     name: "Departments",
            //     path: "department",
            //     component: <Settings.Department.HomeComponent />,
            //     icon: <CorporateFareTwoTone style={{color: appConfig.systemColor }} />
            // },


            // /**Campus */
            // {
            //     name: 'Campuses',
            //     path: 'campus',
            //     component: <Settings.Campus.HomeComponent />,
            //     icon: <MeetingRoomIcon style={{color: appConfig.systemColor }} />
            // },

            // {
            //     name: 'Locations',
            //     path: 'location',
            //     component: <Settings.Location.HomeComponent />,
            //     icon: <LocationOn style={{color: appConfig.systemColor }} />
            // },

            // /**Position level*/
            // {
            //     name: "Position Levels",
            //     path: "position-level",
            //     component: <Settings.PositionLevel.HomeComponent />,
            //     icon: <ElevatorIcon style={{color: appConfig.systemColor }} />,
            // },

            // /**Position */
            // {
            //     name: "Positions",
            //     path: "position",
            //     component: <Settings.Position.HomeComponent />,
            //     icon: <AirlineSeatReclineNormalIcon style={{color: appConfig.systemColor }} />,
            // },

            // /**Department */
            // {
            //     name: "Head Departments",
            //     path: "head-department",
            //     component: <Settings.HeadDepartment.HomeComponent />,
            //     icon: <PeopleAltIcon style={{color: appConfig.systemColor }} />,
            // }
        ]
    },
    /**User setup */
    {
        name: "Users",
        path: "/user",
        component: <User.HomeComponent />,
        icon: <AccountCircleIcon style={{color: appConfig.systemColor }} />,
        isDivider: false,
    }
];