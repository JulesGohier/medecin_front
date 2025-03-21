import {authenticateMedecin, fetchMedecinByRpps} from "@/templates/medecinPage/actions/medecin-action.ts";
import { LoaderSpinner } from "@/templates/medecinPage/components/LoaderSpinner.tsx";
import {useQuery} from "@tanstack/react-query";
import { CalendarCheck, Users } from "lucide-react";
import { NextAppointmentCard } from "@/templates/medecinPage/components/cards/NextAppointmentCard.tsx";
import StatCard, { StatCardProps } from "@/templates/medecinPage/components/cards/StatsCard.tsx";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { PatientsAreaChart } from "@/templates/medecinPage/components/charts/PatientsAreaChart.tsx";
import {parseurJSON} from "@/parseurJson.ts";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
};


const MedecinDashboard = () => {

    const { data: medecin, isLoading: isLoading } = useQuery({
        queryKey: ["medecin"],
        queryFn: async () => {
            const idMedecin = parseurJSON('id');
            return fetchMedecinByRpps(idMedecin);
        },
    });

    if (isLoading) {
        return (
            <div className={"flex w-full h-screen items-center justify-center"}>
                <LoaderSpinner />
            </div>
        );
    }
    
    const patientsCount = medecin?.patients.length || 0;
    const rdvCount = medecin?.rdv.length || 0;
    
    const statsCards: StatCardProps[] = [
        {
            icon: Users,
            title: "Patients",
            value: formatNumber(patientsCount),
            percentage: "+10",
            linkTo: "/mes_patients"
        },
        {
            icon: CalendarCheck,
            title: "RDV",
            value: formatNumber(rdvCount),
            percentage: "+10",
            linkTo: "/mes_consultations"
        },
    ];
    
    return (
        <DashboardWrapper user={medecin}>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Tableau de Bord</h2>
                    <p className={"text-lg font-medium"}>Vos statistiques globales de vos données.</p>
                </div>
                
                <div className={"flex flex-col sm:flex-row md:flex-row mt-2"}>
                    {statsCards.map((item, key) => (
                        <StatCard
                            key={key}
                            {...item}
                        />
                    ))}
                </div>
                
                <div className={"flex flex-col mt-4 sm:flex-row md:flex-row"}>
                    <PatientsAreaChart />
                    <NextAppointmentCard appointments={medecin?.rdv} />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinDashboard;