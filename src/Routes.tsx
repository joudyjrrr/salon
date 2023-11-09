import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import Fallback from "./Components/Fallback";

const Login = lazy(() => import("./pages/Login/Login"));
const ProtectedPage = lazy(() => import("./Layout/ProtectedPage"));

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route element={<ProtectedPage />}>
          <Route
            path="/cp-management"
            index
            element={
              <Suspense fallback={<></>}>
                <h1>cpMangmens</h1>
              </Suspense>
            }
          />
          <Route
            path="/category"
            index
            element={
              <Suspense fallback={<></>}>
                <h1>category</h1>
              </Suspense>
            }
          />
        </Route>

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
