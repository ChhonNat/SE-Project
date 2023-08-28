import React, { Suspense, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Layout/navbar";
import Sidebar from "./components/Layout/sidebar";
import MainPageComponent from "./components/Layout/page-wrapper";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./store/authentication/authenticationService";
import { PRIVATE_ROUTES } from "./routers/private_routes";
import { PUBLIC_ROUTES } from "./routers/public_routes";

const detectedRoute = ["/login"];

const App = () => {
  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  useEffect(() => {
    const defaultPath = PRIVATE_ROUTES[0]?.path;
    const loginPath = detectedRoute[0];

    if (detectedRoute.includes(pathname)) {
      user?.isAuthenticated ? navigate(defaultPath) : navigate(loginPath);
    } else {
      user?.isAuthenticated
        ? navigate(pathname && pathname !== "/" ? pathname : defaultPath)
        : navigate(loginPath);
    }
  }, [user]);

  /**
   * Loading while while route fallback
   */
  const Loading = () => {
    return <p className="global-loading"></p>;
  };

  /**
   * return private router if user has authentication, public router if user un authentication
   */
  return (
    <>
      {user?.isAuthenticated ? (
        <>
          {/* Navbar component */}
          <Navbar />

          {/* Sidebar component */}
          <Sidebar />
          {/* All routes */}
          <Suspense fallback={<Loading />}>
            <Routes>
              {PRIVATE_ROUTES &&
                PRIVATE_ROUTES.length &&
                PRIVATE_ROUTES.filter((route) => !route?.isHide).map((route, index) => (
                  <React.Fragment key={index}>
                    {/* Parent routes */}
                    <Route
                      path={route?.path}
                      element={<MainPageComponent outlet={route.component} />}
                      key={index}
                    />

                    {/* Child routes */}
                    {route?.children?.length &&
                      route?.children.filter((childRoute) => !childRoute?.isHide).map((childRoute, childIndex) => (
                        <Route path={route?.path} key={index}>
                          {/* Child route components */}
                          <Route
                            path={childRoute?.path}
                            element={
                              <MainPageComponent
                                outlet={childRoute.component}
                              />
                            }
                            key={childIndex}
                          />

                          {/* Child route child route components */}
                          {childRoute?.children?.length &&
                            childRoute?.children?.filter((childChiRoute) => !childChiRoute?.isHide).map(
                              (childChildRoute, childChildRouteIndex) => (
                                <Route
                                  path={route?.path + childRoute?.path}
                                  key={childChildRouteIndex}
                                >
                                  <Route
                                    path={childChildRoute?.path}
                                    element={
                                      <MainPageComponent
                                        outlet={childChildRoute.component}
                                      />
                                    }
                                    key={childChildRouteIndex}
                                  />
                                </Route>
                              )
                            )}
                        </Route>
                      ))}
                  </React.Fragment>
                ))}
            </Routes>
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<Loading />}>
          <Routes>
            {PUBLIC_ROUTES &&
              PUBLIC_ROUTES?.length &&
              PUBLIC_ROUTES.filter((route) => !route?.isHide) .map((route, index) => (
                <React.Fragment key={index}>
                  <Route path={route?.path} element={route?.component} />
                </React.Fragment>
              ))}
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;
