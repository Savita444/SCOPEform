////sos
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Login from "./screens/submenus/Login";
import InterJoining from "./screens/submenus/InterJoining";
import Logout from "./screens/submenus/Logout";
import ProtectedRoutes from "./api/ProtectedRoutes";
import ViewInternJoining from "./screens/submenus/ViewInternJoining";
import CompletionFrom from "./screens/submenus/CompletionFrom";
import ViewCompletionFrom from "./screens/submenus/ViewCompletionFrom";
import InternDetailsPage from "./screens/submenus/InternDetailsPage";
import CompletionDetailsPage from "./screens/submenus/CompletionDetailsPage";

function App() {
  // REACT_APP_IMAGE_URL= "https://api.sumagotraining.in/";
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<BaseLayout />}>
          {/* submenus */}
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Component={Dashboard} />}
          />
          <Route
            path="/interjoining"
            element={<ProtectedRoutes Component={InterJoining} />}
          />
          <Route
            path="/viewinterjoining"
            element={<ProtectedRoutes Component={ViewInternJoining} />}
          />
          <Route
            path="/intern-details/:id"
            element={<ProtectedRoutes Component={InternDetailsPage} />}
          />
          <Route
            path="/completion-details/:id"
            element={<ProtectedRoutes Component={CompletionDetailsPage} />}
          />
          <Route
            path="/completion"
            element={<ProtectedRoutes Component={CompletionFrom} />}
          />
          <Route
            path="/viewcompletion"
            element={<ProtectedRoutes Component={ViewCompletionFrom} />}
          />
          <Route
            path="/logout"
            element={<ProtectedRoutes Component={Logout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
