import { Route } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/Admin/DashboardPage";
import AuthenticatedOnlyPage from "./pages/AuthenticatedOnlyPage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthenticatedOnlyPage from "./pages/UnauthenticatedOnlyPage";

function App() {
  return (
    <div className="App">
      <Route element={<LayoutPage />}>
        <Route element={<AuthenticatedOnlyPage />}>
          <Route path="/admin">
            <Route index element={<DashboardPage />} />
          </Route>
        </Route>
        <Route element={<UnauthenticatedOnlyPage />}>
          <Route path="admin-login" element={<LoginPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </div>
  );
}

export default App;
