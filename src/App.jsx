////sos
import { useEffect, lazy, Suspense } from "react";
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
import IdCardIssue from "./screens/submenus/IdCardIssue";
import ViewIdCard from "./screens/submenus/ViewIdCard";
import IdCardDetailsPage from "./screens/submenus/IdCardDetailsPage";
import PersonalDetailsPage from "./screens/submenus/PersonalDetailsPage";
import ForgotPassword from "./screens/submenus/ForgotPassword";
import { id } from "date-fns/locale";
import ViewJoining from "./screens/submenus/ViewJoining";
import InternAllDetails from "./screens/submenus/InternAllDetails";
import UpdatePersonalDetails from "./screens/submenus/UpdatePersonalDetails";
import UpdateInternDetails from "./screens/submenus/UpdateInternDetails";
import AllDetailsofIntern from "./screens/submenus/AllDetailsofIntern";
import CompletionAllDetails from "./screens/submenus/CompletionAllDetails";
import UpdateCompletionDetails from "./screens/submenus/UpdateCompletionDetails";
import IdCardAllDetails from "./screens/submenus/IdCardAllDetails";
import UpdateIdCardDetails from "./screens/submenus/UpdateIdCardDetails";
import ViewT3Sheet from "./screens/submenus/ViewT3Sheet";
import T3SheetDetails from "./screens/submenus/T3SheetDetails";
import ViewPopupEnquiry from "./screens/submenus/ViewPopupEnquiry";
import ViewImplanttraining from "./screens/submenus/ViewImplanttraining";
import T3SheetAllDetails from "./screens/submenus/T3SheetAllDetails";
import AddCourse from "./screens/submenus/AddCourse";
import Addsubcourse from "./screens/submenus/AddSubcourse";
import AddSubsubcourse from "./screens/submenus/AddSub-subcourse";
import UpdateCourse from "./screens/submenus/UpdateCourse";
import UpdateSubcourse from "./screens/submenus/UpdateSubcourse";
import UpdateSubcoursedetails from "./screens/submenus/UpdateSubcoursedetails";
import ProgramfeesCategory from "./screens/submenus/ProgramfeesCategory";
import AddCoursefees from "./screens/submenus/AddCoursefees";
import Updatefeecategory from "./screens/submenus/Updatefeecategory";
import Updatecoursefees from "./screens/submenus/Updatecoursefees";
import LazyCompletionFrom from "./screens/submenus/LazyCompletionFrom";
import CompletionFormSkeleton from "./screens/submenus/CompletionFormSkeleton"; // Skeleton component

function App() {
  // REACT_APP_IMAGE_URL= "https://api.sumagotraining.in/";
  const LazyCompletionDetailsPage = lazy(() =>
    import("./screens/submenus/CompletionDetailsPage")
  );
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
            path="/PersonalDetailsPage"
            element={<ProtectedRoutes Component={PersonalDetailsPage} />}
          />
          <Route
            path="/update-intern-personal-details/:id"
            element={<ProtectedRoutes Component={UpdatePersonalDetails} />}
          />

          <Route
            path="/interjoining/:id"
            element={<ProtectedRoutes Component={InterJoining} />}
          />
          <Route
            path="/viewinterjoining"
            element={<ProtectedRoutes Component={ViewInternJoining} />}
          />
          <Route
            path="/viewjoining"
            element={<ProtectedRoutes Component={ViewJoining} />}
          />
          <Route
            path="/all-intern-details/:id"
            element={<ProtectedRoutes Component={AllDetailsofIntern} />}
          />
          <Route
            path="/intern-details/:id"
            element={<ProtectedRoutes Component={InternDetailsPage} />}
          />
          <Route
            path="/update-intern-details/:id"
            element={<ProtectedRoutes Component={UpdateInternDetails} />}
          />
          <Route
            path="/intern-all-details/:id"
            element={<ProtectedRoutes Component={InternAllDetails} />}
          />


          <Route
            path="/completion/:id"
            element={<ProtectedRoutes Component={CompletionFrom} />}
          />


          <Route
            path="/completion-details/:id"
            element={
              <Suspense fallback={<CompletionFormSkeleton />}>
                <ProtectedRoutes Component={LazyCompletionDetailsPage} />
              </Suspense>
            }
          />;
          <Route
            path="/completion-details/:id"
            element={<ProtectedRoutes Component={LazyCompletionFrom} />}
          />
          <Route
            path="/completion-all-details/:id"
            element={<ProtectedRoutes Component={CompletionAllDetails} />}
          />

          <Route
            path="/completion-all-details/:id"
            element={
              <Suspense fallback={<CompletionFormSkeleton />}>
                <ProtectedRoutes Component={LazyCompletionDetailsPage} />
              </Suspense>
            }
          />;

          <Route
            path="/update-completion-details/:id"
            element={<ProtectedRoutes Component={UpdateCompletionDetails} />}
          />
          <Route
            path="/viewcompletion"
            element={<ProtectedRoutes Component={ViewCompletionFrom} />}
          />


          <Route
            path="/IdCardIssue/:id"
            element={<ProtectedRoutes Component={IdCardIssue} />}
          />
          <Route
            path="/get-intern-id-card-details/:id"
            element={<ProtectedRoutes Component={IdCardDetailsPage} />}
          />
          <Route
            path="/ViewIdCard"
            element={<ProtectedRoutes Component={ViewIdCard} />}
          />
          <Route
            path="/Id-card-all-details/:id"
            element={<ProtectedRoutes Component={IdCardAllDetails} />}
          />
          <Route
            path="/update-Id-card-details/:id"
            element={<ProtectedRoutes Component={UpdateIdCardDetails} />}
          />


          <Route
            path="/ViewT3Sheet"
            element={<ProtectedRoutes Component={ViewT3Sheet} />}
          />

          <Route
            path="/T3SheetDetails/:id"
            element={<ProtectedRoutes Component={T3SheetDetails} />}
          />
          <Route
            path="/T3SheetAllDetails/:id"
            element={<ProtectedRoutes Component={T3SheetAllDetails} />}
          />



          <Route
            path="/addcourse"
            element={<ProtectedRoutes Component={AddCourse} />}
          />
          <Route
            path="/update-course/:id"
            element={<ProtectedRoutes Component={UpdateCourse} />}
          />

          <Route
            path="/addsubcourse"
            element={<ProtectedRoutes Component={Addsubcourse} />}
          />
          <Route
            path="/update-subcourse/:id"
            element={<ProtectedRoutes Component={UpdateSubcourse} />}
          />
          <Route
            path="/addsubsubcourse"
            element={<ProtectedRoutes Component={AddSubsubcourse} />}
          />
          <Route
            path="/update-subcoursedetails/:id"
            element={<ProtectedRoutes Component={UpdateSubcoursedetails} />}
          />
          <Route
            path="/addprogramfeescategory"
            element={<ProtectedRoutes Component={ProgramfeesCategory} />}
          />
          <Route
            path="/update-feecategory/:id"
            element={<ProtectedRoutes Component={Updatefeecategory} />}
          />
          <Route
            path="/addcoursefees"
            element={<ProtectedRoutes Component={AddCoursefees} />}
          />
          <Route
            path="/update-coursefees/:id"
            element={<ProtectedRoutes Component={Updatecoursefees} />}
          />








          <Route
            path="/ViewPopupEnquiry"
            element={<ProtectedRoutes Component={ViewPopupEnquiry} />}
          />
          <Route
            path="/ViewImplanttraining"
            element={<ProtectedRoutes Component={ViewImplanttraining} />}
          />
















          <Route
            path="/logout"
            element={<ProtectedRoutes Component={Logout} />}
          />

          <Route
            path="/forgotpassword"
            element={<ProtectedRoutes Component={ForgotPassword} />}
          />
        </Route>


      </Routes>
    </>
  );
}

export default App;
