import "./App.css";
import { Route, Routes } from "react-router";

import {Homepage} from "@/templates/Homepage.tsx";
import {Connexion} from "@/templates/landingPage/Connexion.tsx";
import {Inscription} from "@/templates/landingPage/Inscription.tsx";

import {PatientDashboard} from "@/templates/patientPage/templates/PatientDashboard.tsx";
import {PatientMedecin} from "@/templates/patientPage/templates/PatientMedecin.tsx";
import {PatientSettings} from "@/templates/patientPage/templates/PatientSettings.tsx";
import {PatientRdv} from "@/templates/patientPage/templates/PatientRdv.tsx";

import MedecinDashboard from "@/templates/medecinPage/templates/MedecinDashboard.tsx";
import MedecinAppointments from "@/templates/medecinPage/templates/MedecinAppointments.tsx";
import MedecinPatients from "@/templates/medecinPage/templates/MedecinPatients.tsx";

import DashboardAdmin from "@/templates/adminPage/templates/DashboardAdmin.tsx";

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

            <Route path={"/dashboard_medecin"} element={<MedecinDashboard />} />
            <Route path={"/mes_patients"} element={<MedecinPatients />} />
            <Route path={"/mes_consultations"} element={<MedecinAppointments />} />

            <Route path={"/dashboard_admin"} element={<DashboardAdmin />} />

            <Route path={"/session_expire"} element={<SessionExpire/>}/>
        </Routes>
    );
}

export default App;