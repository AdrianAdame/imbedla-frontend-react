import React, { lazy, useMemo } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import { selectCurrentThemeMode, selectCurrentToken, setMode } from "./features/userSlice";

/** App Utils */
import RequireAuth from "./features/slices/auth/requireAuth"
import Loader from "./components/Loader"

/** General App layout */
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

/** Authentication Routes */
const Login = lazy(() => import ('./pages/Login'))

/** App Routes/Components */
const Home = lazy(() => import ('./pages/Home'))

function App() {
  const isAuthenticated= Boolean(useSelector(selectCurrentToken))
  const mode = useSelector(selectCurrentThemeMode)

  const theme = useMemo(() => {}, [mode])

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/** General Pages Routes */}
          
          {/** Authentication Route Pages */}
          <Route 
            path="login/" 
            element={
              isAuthenticated ? (<Navigate to="/app" replace />) 
              : 
              (<React.Suspense fallback={<Loader />}>
                <Login />
              </React.Suspense>)} 
          />

          {/** Main Application Routes*/}
          <Route element={null}> {/* <Route element={<RequireAuth />}> */}
            <Route element={<Layout />}>
              <Route 
                path="/app" 
                element={
                  <React.Suspense fallback={<Loader />}>
                    <Home />
                  </React.Suspense>
                }
              />
            </Route>
          </Route>

          
          {/** 404 Not Found Page */}
          <Route path="*" element={<React.Suspense fallback={<Loader />}><div>Not found</div></React.Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
