import StatCard, {StatCardProps} from "@/medecin/components/cards/StatsCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {CalendarCheck, Users} from "lucide-react";
import React from "react";
import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {PatientsAreaChart} from "@/medecin/components/charts/PatientsAreaChart.tsx";

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
};

const MedecinDashboard = () => {
    const statsCards: StatCardProps[] = [
        {
            icon: Users,
            title: "Vos Patients",
            value: 312,
            percentage: "+10",
            linkTo: "/patients"
        },
        {
            icon: CalendarCheck,
            title: "Rendez-Vous",
            value: 3,
            percentage: "+10",
            linkTo: "/appointments"
        },
    ]
    
    return (
        <DashboardWrapper>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Tableau de Bord</h2>
                    <p className={"text-lg font-medium"}>Vos statistiques globales de vos données.</p>
                </div>
                <div className={"flex flex-row mt-5"}>
                    {statsCards.map((item, key) => {
                        return (
                            <StatCard
                                key={key}
                                {...item}
                            />
                        )
                    })}
                </div>
                <div className={"flex flex-row mt-5 "}>
                    <PatientsAreaChart/>
                    <PatientsAreaChart/>
                </div>
            </div>
        </DashboardWrapper>
    );
    }
    
    export default MedecinDashboard;