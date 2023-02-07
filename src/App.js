import React from "react";
import Dashboard from "./page/dashboard";
import AllTime from "./page/allTime";
import Leave from "./page/leave";
import Layout from "./page/layout";
import MissAction from "./page/missAction";
import CandidateInfo from "./feature/candidates/candidateInfo";
import InterviewRecord from "./feature/interviews/interviewRecord";
import { Routes, Route } from "react-router-dom";
import CandidateForm from "./feature/candidates/candidateform";
import InterviewForm from "./feature/interviews/interviewform";
import Login from "./feature/authentication/login";
import { useSelector } from "react-redux";
// import { loading, data, error, sendRequest } from "./hooks";

const App = () => {
  const user = useSelector((state) => state.userAuthendicated);

  const Screen = () => {
    return (
      <>
        {user.isAuthenticated && (
          <>
            <Layout />
            <Routes>
              <Route path="/" element={Dashboard} />

              <Route path="/candidateInfo" element={<CandidateInfo />} />
              <Route path="/interviewRecord" element={<InterviewRecord />} />
              <Route path="/candidateform" element={<CandidateForm />} />
              <Route path="/interviewform" element={<InterviewForm />} />
              <Route path="/Login" element={<Login />} />

              <Route path="/allTime" element={<AllTime />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/missAction" element={<MissAction />} />
            </Routes>
          </>
        )}

        {!user.isAuthenticated && <Login />}
      </>
    );
  };

  return (
    <div>
      <Screen />
    </div>
  );
};

export default App;
