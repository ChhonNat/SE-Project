import React, { Suspense, useEffect } from "react";
import './App.css';

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, isLogout } from "./store/authentication/authenticationService";
import { PRIVATE_ROUTES } from "./routers/privateRoutes";
import { AUTH } from "./constants/pathUrl";
import Layout from './layout/screenLayout';
import PageContainer from "./components/global/pageWrapper";
import { PUBLIC_ROUTES } from "./routers/publicRoutes";

const Login = React.lazy(() => import('./pages/authentication/login'));

const App = () => {

  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  const Loading = () => {
    return <p className="global-loading">Loading...</p>
  };

  const PageNotFound = () => {
    return <p className="page-not-found">Page not found!</p>
  }

  /**
   * Private routes with private elements
   */
  const PrivateRouters = () => {
    return (
      <>
        <Layout />

        {/* All routes */}
        <Suspense fallback={<Loading />}>
          <Routes>
            {
              PRIVATE_ROUTES && PRIVATE_ROUTES.length &&
              PRIVATE_ROUTES.map((route, index) => (
                <React.Fragment key={index}>
                  {/* Parent routes */}
                  <Route path={route?.path} element={<PageContainer layout={route?.component} />} key={index} />

                  {/* Child routes */}
                  {route?.children?.length && route?.children.map((child, childIndex) => (
                    <Route path={route?.path} key={index}>
                      <Route path={child?.path} element={<PageContainer layout={child?.component} />} key={childIndex} />
                    </Route>
                  ))}
                </React.Fragment>

              ))
            }
          </Routes>
        </Suspense>
      </>
    );
  };

  
  /**
   * Public routes with public elements
   */
  const PublicRouters = () => {
    return (
      <Suspense fallback={<Loading />}>
        <Routes>
          {
            PUBLIC_ROUTES && PUBLIC_ROUTES && PUBLIC_ROUTES.map((route, index) => (
              <React.Fragment key={index}>
                <Route path={route?.path} element={route?.component} />
              </React.Fragment>
            ))
          }
        </Routes>
      </Suspense>
    );
  };

  /**
   * return private router if user has authentication, public router if user unauthentication
   */
  return (
    <div>
      {
        !user?.userAuthendicated ? <PrivateRouters /> : <PublicRouters />
      }
    </div>
  );
};

export default App;
