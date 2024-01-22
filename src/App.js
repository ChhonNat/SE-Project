import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/navbar";
import MainPageComponent from "./components/Layout/page-wrapper";
import Sidebar from "./components/Layout/sidebar";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Counter from "./qms/q-components/counters/home";
import ScreenTicket from "./qms/q-components/srcree-ticket/home";
import { PRIVATE_ROUTES } from "./routers/private_routes";
import { PUBLIC_ROUTES } from "./routers/public_routes";
import { isLogin, isLogout } from "./store/authentication/authenticationService";

const detectedRoute = ["/", "/screen/counter", "/screen/ticket"];
const publicCurrentRoutes = ["/", "/display"];

const App = () => {
  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // ditect publice routes
  const ditectPubliceRotes = (current) => {
    if (publicCurrentRoutes.includes(current)) return current;
    else return publicCurrentRoutes[0];
  }

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);
  // handle logout
  const handleLogout = () => {
    dispatch(isLogout());
    navigate("/login");
  };

  const [userRole, setUserRole] = useState('');
  const [userPermission, setUserPermission] = useState('');

  useEffect(() => {
    setUserRole(user?.roles[0]);
    let tmpUerPermission = user?.permissions?.find(item => item === "user_create");
    setUserPermission(tmpUerPermission);

    const defaultPath = PRIVATE_ROUTES[0]?.path;
    const loginPath = detectedRoute[0];

    if (detectedRoute.includes(pathname) && user?.roles[0] === "admin") {
      user?.isAuthenticated ? navigate(defaultPath) : navigate(loginPath);
    } else if (detectedRoute.includes(pathname) && user?.roles[0] === "counter") {
      if (user?.isAuthenticated && user?.permissions[2] === "user_create") {
        navigate(detectedRoute[2])
      } else {
        navigate(detectedRoute[1])
      }
      // user?.isAuthenticated ? navigate(detectedRoute[1]) : navigate(loginPath);
    } else {
      user?.isAuthenticated
        ? navigate(pathname && pathname !== "/" ? handleLogout() : defaultPath)
        : navigate(ditectPubliceRotes(pathname));
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
        userRole === "counter"
          ?
          userPermission === "user_create"
            ?
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/screen/ticket" element={<ScreenTicket />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
            :
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/screen/counter" element={<Counter />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          :
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
              PUBLIC_ROUTES.filter((route) => !route?.isHide
              ).map((route, index) => (
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