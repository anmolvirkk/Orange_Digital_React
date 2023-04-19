import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Details from "./pages/Details";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6F56B7",
    },
    secondary: {
      main: "#5949A8",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Gallery />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;