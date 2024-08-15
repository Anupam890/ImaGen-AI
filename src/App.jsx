import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Auth/Register";
import TextGen from "./pages/TextGen";
import ImageGen from "./pages/ImageGen";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/Auth/PasswordReset";
import Navbar from "./components/Navbar";
import { PromptHistoryProvider } from "./Context/PromptHistoryContext";

const ConditionalNavbar = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navbar />;
  }
  return null;
};

const App = () => {
  return (
    <PromptHistoryProvider>
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="img-gen" element={<ImageGen />} />
            <Route path="text-gen" element={<TextGen />} />
          </Route>
        </Routes>
      </Router>
    </PromptHistoryProvider>
  );
};

export default App;
