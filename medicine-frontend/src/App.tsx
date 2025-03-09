import "./App.css";
import { Route, Routes } from "react-router";

import {Homepage} from "@/templates/Homepage.tsx";
import {Connexion} from "@/landingPage/Connexion.tsx";
import {Inscription} from "@/landingPage/Inscription.tsx";

import {PatientDashboard} from "@/patientPage/templates/PatientDashboard.tsx";
import {PatientMedecin} from "@/patientPage/templates/PatientMedecin.tsx";
import {PatientSettings} from "@/patientPage/templates/PatientSettings.tsx";
import {PatientRdv} from "@/patientPage/templates/PatientRdv.tsx";


import { SessionExpire } from "@/templates/SessionExpire.tsx";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"/connexion"} element={<Connexion/>}/>
            <Route path={"/inscription"} element={<Inscription/>}/>


            <Route path={"/dashboard_patient"} element={<PatientDashboard/>}/>
            <Route path={"/mes_rendez_vous"} element={<PatientRdv/>}/>
            <Route path={"/medecins"} element={<PatientMedecin/>}/>
            <Route path={"/settings"} element={<PatientSettings/>}/>


            <Route path={"/session_expire"} element={<SessionExpire/>}/>
        </Routes>
    );
}

export default App;