import React, { Suspense, useEffect } from "react";
import './App.css';

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, isLogout } from "./store/authentication/authenticationService";
import { PRIVATE_ROUTES } from "./routers/private_routes";
import Layout from './layout/screen_layout';
import PageContainer from "./components/Layout/page_wrapper";
import { PUBLIC_ROUTES } from "./routers/public_routes";

const App = () => {

  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  /**
   * Loading while while route fallback
   */

  const Loading = () => {
    return <p className="global-loading">Loading...</p>
  };

  /**
   * Page not found status
   */
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
              PRIVATE_ROUTES && PRIVATE_ROUTES.length && PRIVATE_ROUTES.map((route, index) => (
                <React.Fragment key={index}>
                  {/* Parent routes */}
                  <Route path={route?.path} element={<PageContainer layout={route?.component} />} key={index} />

                  {/* Child routes */}
                  {route?.children?.length && route?.children.map((childRoute, childIndex) => (

                    <Route path={route?.path} key={index}>
                      {/* Child route components */}
                      <Route path={childRoute?.path} element={<PageContainer layout={childRoute?.component} />} key={childIndex} />

                      {/* Child route child route components */}
                      {
                        childRoute?.children?.length && childRoute?.children?.map((childChildRoute, childChildRouteIndex) => (

                          <Route path={route?.path + childRoute?.path} key={childChildRouteIndex}>
                            <Route path={childChildRoute?.path} element={<PageContainer layout={childChildRoute?.component} />} key={childChildRouteIndex} />
                          </Route>
                        ))
                      }
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
   * Switch screen between authorize and unauthorize user
   */
  const Screen = () => {
    return (
      <>
        {user?.isAuthenticated ? <PrivateRouters /> : <PublicRouters />}

      </>
    );
  };

  /**
   * return private router if user has authentication, public router if user unauthentication
   */
  return (
    <>
      <Screen />
    </>
  );
};

export default App;
