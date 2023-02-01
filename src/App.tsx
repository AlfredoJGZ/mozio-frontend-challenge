import { Routes, Route } from "react-router-dom";
import TravelForm from "./components/TravelForm";
import Results from "./components/Results";
import { Box } from "@mui/material";
import "../src/App.css";

const App = () => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Routes>
        <Route path="/" element={<TravelForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Box>
  );
};

export default App;
