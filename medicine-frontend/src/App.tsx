import "./App.css";
import { Route, Routes } from "react-router";

import {PatientDashboard} from "@/patient/templates/PatientDashboard.tsx";
import {PatientMedecin} from "@/patient/templates/PatientMedecin.tsx";
import {PatientHelp} from "@/patient/templates/PatientHelp.tsx";
import {PatientSettings} from "@/patient/templates/PatientSettings.tsx";


function App() {
    return (
        <Routes>
            <Route path={"/"} element={<PatientDashboard />} />
            <Route path={"/medecins"} element={<PatientMedecin />} />
            <Route path={"/help"} element={<PatientHelp />} />
            <Route path={"/settings"} element={<PatientSettings />} />
        </Routes>
    );
}

export default App;