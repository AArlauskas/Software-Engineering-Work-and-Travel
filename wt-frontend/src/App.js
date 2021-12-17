import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import URI from "./constants/URI";
import LoginPage from "./containers/LoginPage/LoginPage";
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import PricingPage from "./containers/PricingPage/PricingPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import CompaniesPage from "./containers/CompaniesPage/CompaniesPage";
import TopBar from "./components/TopBar/TopBar";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TopBar/>
        <CssBaseline/>
        <Routes>
          <Route path={URI.LOGIN} element={<LoginPage />} />
          <Route path={URI.REGISTER} element={<RegisterPage/>}></Route>
          <Route path={URI.PRICING} element={<PricingPage/>} />
          <Route path={URI.COMPANIES} element={<CompaniesPage/>}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
