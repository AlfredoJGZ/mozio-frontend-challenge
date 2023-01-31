import { Routes, Route } from "react-router-dom";
import TravelForm from "./components/TravelForm";
import Results from "./components/Results";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TravelForm />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
};

export default App;
