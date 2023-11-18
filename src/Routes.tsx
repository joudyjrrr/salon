import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";



const Login = lazy(() => import("./pages/Login/Login"));
const ProtectedPage = lazy(() => import("./Layout/ProtectedPage"));
const CpMangment = lazy(() => import("./pages/CpMangment/CpMangment"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const Salon = lazy(() => import("./pages/Salon/Salon"));
const AddSalon = lazy(() => import("./pages/Salon/AddSalon"));
const Fallback = lazy(() => import('./Components/Fallback'))
const Category = lazy(() => import('./pages/Category/Category'));
const AddCategory = lazy(() => import('./pages/Category/AddCategory'))
const Coupon = lazy(() => import('./pages/Coupon/Coupon'))
const AddCoupon = lazy(() => import('./pages/Coupon/AddCoupon/AddCoupon'))


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
            path="/"
            element={
              <Suspense fallback={<></>}>
                <></>
              </Suspense>
            }
          />
          <Route
            path="/cp-management"
            index
            element={
              <Suspense fallback={<></>}>
                <CpMangment />
              </Suspense>
            }
          />
          <Route path="/category">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="addCategory"
              element={
                <Suspense fallback={<></>}>
                  <AddCategory />
                </Suspense>
              }
            />
          </Route>

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
          <Route path="/coupon">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Coupon />
                </Suspense>
              }
            />
            <Route
              path="addCoupon"
              element={
                <Suspense fallback={<></>}>
                  <AddCoupon />
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
