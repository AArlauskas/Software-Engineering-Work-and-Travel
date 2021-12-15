import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicTopBar from "./components/PublicTopBar/PublicTopBar";
import URI from "./constants/URI";
import LoginPage from "./containers/LoginPage/LoginPage";
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        {getCurrentAppbar()}
        <CssBaseline/>
        <Routes>
          <Route path={URI.LOGIN} element={<LoginPage />} />
          <Route></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

const getCurrentAppbar = () => {
  return <PublicTopBar/>
}

export default App;
