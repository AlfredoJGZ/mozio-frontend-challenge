import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1>Fill the details of your travel below</h1>}
      />
      <Route path="/results" element={<h1>Your travel</h1>} />
    </Routes>
  );
};

export default App;
