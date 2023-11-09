import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
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
<<<<<<< HEAD
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
=======
          path="/login"
          element={
            <Suspense fallback={<Fallback />}>
              <Login />

>>>>>>> b36354a7ef502161b57b1a33c6eb4d222c2b2c2f
            </Suspense>
          }
        />
      </ReactRoutes>
    </>
  );
};
export default Routes;
