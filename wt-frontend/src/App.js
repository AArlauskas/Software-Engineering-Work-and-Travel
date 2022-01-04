import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import URI from "./constants/URI";
import LoginPage from "./containers/LoginPage/LoginPage";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import PricingPage from "./containers/PricingPage/PricingPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import CompaniesPage from "./containers/CompaniesPage/CompaniesPage";
import EmailerPage from "./containers/EmailerPage/EmailerPage";
import TopBar from "./components/TopBar/TopBar";
import LookupPage from "./containers/LookupPage/LookupPage";
import HomePage from "./containers/HomePage/HomePage";
import UserRoles from "./constants/UserRoles";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar />
        {getRoutes()}
      </ThemeProvider>
    </Router>
  );
}

const getRoutes = () => {
  const role = window.localStorage.getItem("role");
  if(role === UserRoles.PUBLIC) return getPublicRoutes();
  if(role === UserRoles.BASIC) return getBasicRoutes();
  if(role === UserRoles.PRO || role === UserRoles.ADMIN) return getProRoutes();
}

const getPublicRoutes = () => {
  return (
    <Routes>
      <Route path={URI.HOME} element={<HomePage />} />
      <Route path={URI.LOGIN} element={<LoginPage />} />
      <Route path={URI.REGISTER} element={<RegisterPage />} />
      <Route path={URI.PRICING} element={<PricingPage isLoggedIn={false}/>} />
      <Route path={URI.COMPANIES} element={<CompaniesPage />} />
      <Route path="*" element={<Navigate to={URI.HOME}/>}/>
    </Routes>
  );
};

const getBasicRoutes = () => {
  return (
    <Routes>
      <Route path={URI.EMAILER} element={<EmailerPage />} />
      <Route path={URI.PRICING} element={<PricingPage isLoggedIn={true}/>} />
      <Route path="*" element={<Navigate to={URI.EMAILER}/>}/>
    </Routes>
  );
};

const getProRoutes = () => {
  return (
    <Routes>
      <Route path={URI.EMAILER} element={<EmailerPage />} />
      <Route path={URI.LOOKUP} element={<LookupPage />} />
      <Route path="*" element={<Navigate to={URI.EMAILER}/>}/>
    </Routes>
  );
};

export default App;
