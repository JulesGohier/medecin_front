import "./App.css";
import { Route, Routes } from "react-router";
import MedecinDashboard from "@/medecin/templates/MedecinDashboard.tsx";
import MedecinAppointments from "@/medecin/templates/MedecinAppointments.tsx";
import MedecinPatients from "@/medecin/templates/MedecinPatients.tsx";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MedecinDashboard />} />
      <Route path={"/patients"} element={<MedecinPatients />} />
      <Route path={"/appointments"} element={<MedecinAppointments />} />
    </Routes>
  );
}

export default App;
