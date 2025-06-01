import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import { useAuthStore } from "./store/useAuthStore"
import Predictions from "@/scenes/predictions";
import LoginPage from "./scenes/auth/LoginPage"
import { useEffect } from "react";

function App() {
  
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
   useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/predictions" element={ authUser ? <Predictions /> : <Navigate to="/login" />} />
              <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
