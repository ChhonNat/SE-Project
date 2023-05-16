import React, { useEffect } from "react";
import Layout from './components/global/layout';
import Login from "./feature/authentication/login";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./store/authentication/authenticationService";
import { ROUTES } from "./constants/routes";

const App = () => {

  const user = useSelector((state) => state.userAuthendicated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  const Screen = () => {
    return (
      <>
        {user.isAuthenticated && (
          <>
            <Layout />

            {/* All routes */}
            <Routes>
              {
                ROUTES && ROUTES.length &&
                ROUTES.map((route, index) => (
                  <>
                    {/* Parent routes */}
                    <Route path={route?.path} element={route?.component} key={index} />

                    {/* Child routes */}
                    {route?.children?.length && route?.children.map((child, childIndex) => (
                      <Route path={route?.path} key={index}>
                        <Route path={child?.path} element={child?.component} key={childIndex}/>
                      </Route>
                    ))}
                  </>

                ))
              }
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
