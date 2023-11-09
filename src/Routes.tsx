import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";

const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route
          path="/hi"
          element={
            <Suspense fallback={<></>}>
              <h1>hiiii</h1>
            </Suspense>
          }
        />
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
      </ReactRoutes>
    </>
  );
};
export default Routes;
