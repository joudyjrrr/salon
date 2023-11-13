import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Fallback from "./Components/Fallback";
import Category from "./pages/Category/Category";
import AddCategory from "./pages/Category/AddCategory";

const Login = lazy(() => import("./pages/Login/Login"));
const ProtectedPage = lazy(() => import("./Layout/ProtectedPage"));
const CpMangment = lazy(() => import("./pages/CpMangment/CpMangment"));
const Notification = lazy(() => import("./pages/Notification/Notification"))

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

        <Route element={<ProtectedPage />}>
          <Route
            path="/cp-management"
            index
            element={
              <Suspense fallback={<></>}>
                <CpMangment />
              </Suspense>
            }
          />
          <Route
            path="/category"
            element={
              <Suspense fallback={<></>}>
                <Category />
              </Suspense>
            }
          />

          <Route
            path="/addCategory"
            element={
              <Suspense fallback={<></>}>
                <AddCategory />
              </Suspense>
            }
          />
          <Route
            path="/notifications"
            element={
              <Suspense fallback={<></>}>
                <Notification />
              </Suspense>
            }
          />
        </Route>
      </ReactRoutes>
    </>
  );
};
export default Routes;
