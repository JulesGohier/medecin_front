import { CalendarCheck, Users } from "lucide-react";
import { NextAppointmentCard } from "@/medecin/components/cards/NextAppointmentCard.tsx";
import StatCard, { StatCardProps } from "@/medecin/components/cards/StatsCard.tsx";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { PatientsAreaChart } from "@/medecin/components/charts/PatientsAreaChart.tsx";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
};

const MedecinDashboard = () => {
    const statsCards: StatCardProps[] = [
        {
            icon: Users,
            title: "Patients",
            value: formatNumber(4330),
            percentage: "+10",
            linkTo: "/patients"
        },
        {
            icon: CalendarCheck,
            title: "RDV",
            value: formatNumber(12),
            percentage: "+10",
            linkTo: "/appointments"
        },
    ];
    
    return (
        <DashboardWrapper>
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
                    <NextAppointmentCard />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinDashboard;