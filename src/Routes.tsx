import { Suspense } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { lazy } from 'react';
import Fallback from "./Components/Fallback";

const Login = lazy(() => import('./pages/Login/Login'))

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Fallback />}>
              <Login />

            </Suspense>
          }
        />
      </ReactRoutes>
    </>
  );
};
export default Routes;
