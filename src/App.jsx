import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

/** Pages Components */
import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/** General Pages Routes */}
          

          {/** Main Application Routes*/}
          <Route element={<Layout />}>
            <Route path="/" element={<Home/>} />
          </Route>

          {/** Authentication Route Pages */}
          <Route path="login/" element={<Login />} />
          
          {/** 404 Not Found Page */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
