import React from "react";
import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import PatientsCard from "@/medecin/components/cards/PatientsCard.tsx";
import AppointmentsCard from "@/medecin/components/cards/AppointmentsCard.tsx";


const Homepage = () => {
    return (
        <DashboardWrapper>
            <div className={"mt-12"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"font-semibold "}>Tableau de Bord</h2>
                    <p className={"font-medium"}>Vos statistiques globales de vos données.</p>
                </div>
                <div className={"flex flex-row mt-5"}>
                    <PatientsCard />
                    <AppointmentsCard />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default Homepage;