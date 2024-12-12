import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "@/templates/Homepage.tsx";
import Dashboard from "@/medecin/templates/MedecinDashboard.tsx";
import MedecinDashboard from "@/medecin/templates/MedecinDashboard.tsx";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MedecinDashboard />} />
    </Routes>
  );
}

export default App;
