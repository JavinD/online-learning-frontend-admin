import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import CourseCreatePage from "./pages/Admin/CourseCreatePage";
import CourseEditPage from "./pages/Admin/CourseEditPage";
import CoursePage from "./pages/Admin/CoursePage";
import DashboardPage from "./pages/Admin/DashboardPage";
import InvoiceDetailPage from "./pages/Admin/InvoiceDetailPage";
import InvoicePage from "./pages/Admin/InvoicePage";
import AuthenticatedOnlyPage from "./pages/AuthenticatedOnlyPage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthenticatedOnlyPage from "./pages/UnauthenticatedOnlyPage";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage />}>
          <Route element={<AuthenticatedOnlyPage />}>
            <Route path="">
              <Route index element={<DashboardPage />} />
              <Route path="invoice">
                <Route index element={<InvoicePage />} />
                <Route path=":id" element={<InvoiceDetailPage />} />
              </Route>

              <Route path="course">
                <Route index element={<CoursePage />} />
                <Route path="create" element={<CourseCreatePage />} />
                <Route path=":slug" element={<CourseEditPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
          <Route element={<UnauthenticatedOnlyPage />}>
            <Route path="admin-login" element={<LoginPage />} />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to={"/admin-login"}
                replace
                state={{ from: location }}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
