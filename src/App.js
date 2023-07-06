import React, { Suspense, useEffect, useState } from "react";
import './App.css';

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./store/authentication/authenticationService";
import { PRIVATE_ROUTES } from "./routers/private_routes";
import { PUBLIC_ROUTES } from "./routers/public_routes";
import Navbar from "./components/Layout/navbar";
import Sidebar from "./components/Layout/sidebar";
import MainPageComponent from "./components/Layout/page-wrapper";

const detectedRoute = [
  '/login'
];

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [minSidebar, setMinsidebar] = useState(true);
  const user = useSelector((state) => state.userAuthendicated);

  const { pathname } = location;

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  useEffect(() => {

    if (detectedRoute.includes(pathname)) {

      user?.isAuthenticated ? navigate('/candidate') : navigate('/login');
    } else {
      
      user?.isAuthenticated ? navigate(pathname) : navigate('/login');
    }
  }, [user])

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

        {/* Navbar component */}
        <Navbar
          open={minSidebar}
          handleSetMinSidebar={() => setMinsidebar(!minSidebar)}
        />

        {/* Sidebar component */}
        <Sidebar
          open={minSidebar}
          handleMinSidebar={setMinsidebar}
        />
        {/* All routes */}
        <Suspense fallback={<Loading />}>

          <Routes>
            {
              PRIVATE_ROUTES && PRIVATE_ROUTES.length && PRIVATE_ROUTES.map((route, index) => (

                < React.Fragment key={index} >

                  {/* Parent routes */}
                  <Route path={route?.path}
                    element={
                      <MainPageComponent open={minSidebar} outlet={route.component} />
                    }
                    key={index} />

                  {/* Child routes */}
                  {route?.children?.length && route?.children.map((childRoute, childIndex) => (

                    <Route path={route?.path} key={index}>
                      {/* Child route components */}
                      <Route
                        path={childRoute?.path}
                        element={
                          <MainPageComponent open={minSidebar} outlet={childRoute.component} />
                        }
                        key={childIndex}
                      />

                      {/* Child route child route components */}
                      {
                        childRoute?.children?.length && childRoute?.children?.map((childChildRoute, childChildRouteIndex) => (

                          <Route path={route?.path + childRoute?.path} key={childChildRouteIndex}>
                            <Route path={childChildRoute?.path}
                              element={
                                <MainPageComponent open={minSidebar} outlet={childChildRoute.component} />
                              }
                              key={childChildRouteIndex}
                            />
                          </Route>
                        ))
                      }
                    </Route>
                  ))}
                </React.Fragment>

              ))
            }
          </Routes>

        </Suspense >
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
            PUBLIC_ROUTES && PUBLIC_ROUTES?.length && PUBLIC_ROUTES.map((route, index) => (
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
