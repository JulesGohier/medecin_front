import {authenticateAdministrator, getMedecin, getPatients, getRendezVous} from "@/admin/actions/admin.action.ts";
import {LoaderSpinner} from "@/admin/components/LoaderSpinner.tsx";
import StatCard, {StatCardProps} from "@/admin/components/StatCard.tsx";
import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useQuery} from "@tanstack/react-query";
import {Briefcase, CalendarCheck, User} from "lucide-react";


const DashboardAdmin = () => {
    const { data: admin, isLoading } = useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            let token = localStorage.getItem("token");
            if (!token) {
                const data = await authenticateAdministrator("admin@admin.com", "password123");
                localStorage.setItem("token", data.token);
            }
            else {
                const data = await authenticateAdministrator("admin@admin.com", "password123");
                return data;
            }
        },
    });
    
    const { data: patient } = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients
    });
    
    const { data: medecin } = useQuery({
        queryKey: ["medecins"],
        queryFn: getMedecin
    });
    
    const { data: appointment } = useQuery({
        queryKey: ["appointments"],
        queryFn: getRendezVous
    });
    
    
    
    const statsCards: StatCardProps[] = [
        {
            icon: User,
            title: "Patients",
            value: patient?.member.length ?? <LoaderSpinner />
        },
        {
            icon: Briefcase,
            title: "Medecins",
            value: medecin?.member.length ?? <LoaderSpinner />
        },
        {
            icon: CalendarCheck,
            title: "RDV",
            value: appointment?.member.length ?? <LoaderSpinner />
        },
    ];
    
    if (isLoading) {
        return (
            <div className={"flex w-full h-screen items-center justify-center"}>
                <LoaderSpinner />
            </div>
        );
    }
    
    if (admin.roles[0] !== "ROLE_ADMIN") {
        alert("Vous n'avez pas l'autorisation !");
    }
    
    return (
        <DashboardWrapper user={medecin}>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black mb-6"}>
                    <h2 className={"text-xl font-semibold"}>Tableau de Bord</h2>
                    <p className={"text-lg font-medium"}>Vos statistiques globales de vos données.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statsCards.map((item, key) => (
                        <StatCard
                            key={key}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default DashboardAdmin;