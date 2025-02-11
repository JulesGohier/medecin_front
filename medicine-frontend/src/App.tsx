import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "@/templates/Homepage";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
    </Routes>
  );
}

export default App;
