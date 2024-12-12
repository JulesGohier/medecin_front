import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "@/templates/Homepage.tsx";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
    </Routes>
  );
}

export default App;
