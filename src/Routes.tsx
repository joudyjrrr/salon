import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Fallback from "./Components/Fallback";
import Category from "./pages/Category/Category";
import AddCategory from "./pages/Category/AddCategory";

const Login = lazy(() => import("./pages/Login/Login"));
const ProtectedPage = lazy(() => import("./Layout/ProtectedPage"));
const CpMangment = lazy(() => import("./pages/CpMangment/CpMangment"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const Salon = lazy(() => import("./pages/Salon/Salon"));
const AddSalon = lazy(() => import("./pages/Salon/AddSalon"));
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
          <Route path="/salon">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Salon />
                </Suspense>
              }
            />
            <Route 
            path="add-salon"
            element={
              <Suspense fallback={<></>}>
                <AddSalon />
              </Suspense>
            }
            />
          </Route>
        </Route>
      </ReactRoutes>
    </>
  );
};
export default Routes;
