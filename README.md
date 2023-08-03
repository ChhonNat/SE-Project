# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


#npm v 7.x.x
#node v 18.x.x


+ Process each roles

----------------------------------------------------
                    1: Verify
----------------------------------------------------

1.1 TA admin:
    Create CV:
        shortlist result : waiting
        submit status: waiting
        status (candidate): pending

    Action:
        submit to hr:
            submit status: Submitted_DHR
            status (candidate): Reviewed
1.2 DHR:
    CV:
        shorlist result: waiting
        submit status: Submitted_DHR
        status (candidate): Reviewed

    Action:
        verify && submit to offceo:
            submit status: DHR_Verified
            status (candidate): Reviewed

1.3 OFFCEO:
    CV:
        shorlist result: waiting
        submit status: Submited_OFFCEO
        status (candidate): reviewed

    Action:
        approve && submit to TA:
            submit status: Submitted_TA_Team || Sent_TA_Team
            status (candidate): reviewed
1.4 TA_Team:
    CV:
        shortlist result:  waiting
        submit status: Submitted_TA_Team | Sent_TA_Team
        status (candidate): reviewed

    Action: 
        shortlist
            shortlist result: Passed | Failed | Blacklist | Keep_In_Pool
        submit to HOD:
            shortlist result: Passed
            submit status: Submitted_HOD
            status (candidate): Shortlisted
            remark: 'yes .....'

1.5 HOD: 
    CV: 
        shortlist result: Passed
        submit status: Submitted_HOD
        status (candidate): Shortlisted

    Action:
        shortlist result: Passed | Failed | Keep_In_Pool
        set schedule: ''
        set key person | committee: ['', '', '']

        submit to TA:
            submit status: Submitted_TA | Sent_TA_Team
            shortlist result: Passed
            schedule | interviewDate: '10-10-2023' 
            committee : ['a','b']
            status (candidate): Shortlisted

1.6 HOD:
    CV: 
        shortlist result: Passed

    Action: 
        Invite/Set Schedule Interview: date
        status: In Interview

--------------------------------------------------
                    2: Interview
--------------------------------------------------

2.1 HOD
    CV:
        Upload first result form
    
2.2 HOD: 
    CV: 
        Update first evaluate result


If has second interview 
------------    
2.3 HOD:
    CV:
        Set second interview schedule
2.4 HOD:
    CV: 
        Upload second result form
2.5 HOD:
    CV:
        Update second evaluate result
------------

2.6 HOD:
    CV:
        Push to TA for reference check
        
--------------------------------------------------
                    3: Reference Check
--------------------------------------------------
3.1
    TA:
        Do the background check and update the result
3.2
    TA:
        Submit to HOD to offer the salary,...
3.3
    HOD:
        submit to HOD to verify
3.4
    HOD: 
        submit to OFFCEO to approve
        
        


<!-- TA:
    CV: 
        shortlist result: Passed
        submit status: Submitted_TA | Sent_TA_Team 
        status (candidate): Shortlisted
        interviewDate: '10-10-2023'
        committee: ['a','b']

    Action: 
        final interviewDate: '11-11-2023'
        final committee: ['c','d']  

        print form interview -->


-------------------------------------
UI
            Candidate
                TA: 
                    Shortlists: OFFCEO_APPROVED
                    Status: Pending
                    Shortlist Result: Waiting
                        Action: 
                            Shortlist
                    Shortlists : OFFCEO_APPROVED
                    Status: Shortlisted
                    Shortlist Result: Passed
                        Action:
                            Submit to HOD
                    Shortlists: Submitted_HOD
                    Status: Shortlisted
                    Shortlist Result: Passed
                Hiring Manager:




-------------
API

        Candidate
            Hiring Manager:
                Set Validate in invite interview before shortlist by hiring manager


