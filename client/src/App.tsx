import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ThemeToggleFloating from "./components/ThemeToggleFloating";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import Jogadores from "./components/Jogadores";
import Partidas from "./components/Partidas";
import Times from "./components/Times";
import Escalacoes from "./components/Escalacoes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/partidas" element={<Partidas />} />
            <Route path="/times" element={<Times />} />
            <Route path="/escalacoes" element={<Escalacoes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
