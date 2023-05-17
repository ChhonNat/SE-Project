import React, { Suspense, useEffect } from "react";
import './App.css';

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, isLogout } from "./store/authentication/authenticationService";
import { ROUTES } from "./constants/routes";
import { AUTH } from "./constants/pathUrl";
import Layout from './components/global/layout';

const Login = React.lazy(() => import('./pages/authentication/login'));

const App = () => {

  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();
  // const location = useLocation();
  // const { pathname } = location;

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  /**
   * prevent user has login and go to login page
   * remove old token login
   */
  // useEffect(() => {

  //   if(pathname === '/login')
  //   dispatch(isLogout());

  // },[pathname]);


  const Loading = () => {
    return <p className="global-loading">Loading...</p>
  };

  const PageNotFound = () => {
    return <p className="page-not-found">Page not found!</p>
  }

  const Screen = () => {
    return (
      <>
        {user?.isAuthenticated ? (
          <>
            <Layout />

            {/* All routes */}
            <Suspense fallback={<Loading />}>

              <Routes>
                {
                  ROUTES && ROUTES.length &&
                  ROUTES.map((route, index) => (
                    <React.Fragment key={index}>
                      {/* Parent routes */}
                      <Route path={route?.path} element={route?.component} key={index} />

                      {/* Child routes */}
                      {route?.children?.length && route?.children.map((child, childIndex) => (
                        <Route path={route?.path} key={index}>
                          <Route path={child?.path} element={child?.component} key={childIndex} />
                        </Route>
                      ))}
                    </React.Fragment>

                  ))
                }
              </Routes>
            </Suspense>

          </>
        ) :
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path={AUTH.login_url} element={<Login />} />
            </Routes>
          </Suspense>
        }

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
