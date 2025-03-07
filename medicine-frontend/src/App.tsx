import "./App.css";
import { Route, Routes } from "react-router";

import {PatientDashboard} from "@/patient/templates/PatientDashboard.tsx";
import {PatientMedecin} from "@/patient/templates/PatientMedecin.tsx";
import {PatientSettings} from "@/patient/templates/PatientSettings.tsx";
import {PatientRdv} from "@/patient/templates/PatientRdv.tsx";


function App() {
    return (
        <Routes>
            <Route path={"/"} element={<PatientDashboard />} />
            <Route path={"/mes_rendez_vous"} element={<PatientRdv />} />
            <Route path={"/medecins"} element={<PatientMedecin />} />
            <Route path={"/settings"} element={<PatientSettings />} />
        </Routes>
    );
}

export default App;