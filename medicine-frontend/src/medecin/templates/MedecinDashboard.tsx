import React from "react";
import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import PatientsCard from "@/medecin/components/cards/PatientsCard.tsx";
import AppointmentsCard from "@/medecin/components/cards/AppointmentsCard.tsx";
import {PatientsAreaChart} from "@/medecin/components/charts/PatientsAreaChart.tsx";


const MedecinDashboard = () => {
    return (
        <DashboardWrapper>
            <div className={"mt-12 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"font-semibold "}>Tableau de Bord</h2>
                    <p className={"font-medium"}>Vos statistiques globales de vos données.</p>
                </div>
                <div className={"flex flex-row mt-5"}>
                    <PatientsCard/>
                    <AppointmentsCard/>
                </div>

                <div className={"flex w-full items-center mt-3"}>
                    <div className={"w-[965px] h-[300px]"}>
                        <PatientsAreaChart/>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinDashboard;