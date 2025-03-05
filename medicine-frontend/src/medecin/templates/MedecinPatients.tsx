import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {authenticateMedecin, fetchMedecinByRpps} from "@/medecin/actions/medecin-action.ts";
import {LoaderSpinner} from "@/medecin/components/LoaderSpinner.tsx";
import {TablePatients} from "@/medecin/components/tables/TablePatients.tsx";
import {useQuery} from "@tanstack/react-query";


const MedecinPatients = () => {
    const { data: medecin, isLoading } = useQuery({
        queryKey: ["medecin"],
        queryFn: async () => {
            let token = localStorage.getItem("token");
            if (!token) {
                const data = await authenticateMedecin();
                localStorage.setItem("token", data.token);
            }
            else {
                const data = await authenticateMedecin();
                return fetchMedecinByRpps(data.id);
            }
        },
    });
    
    if (isLoading) {
        return (
            <div className={"flex w-full h-screen items-center justify-center"}>
                <LoaderSpinner />
            </div>
        );
    }
    
    
    return (
        <DashboardWrapper user={medecin}>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Patients</h2>
                    <p className={"text-lg font-medium"}>Tableau de vos patients.</p>
                </div>
                <div className={"flex flex-col sm:flex-row md:flex-row mt-16"}>
                    <TablePatients patients={medecin?.patients} />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinPatients;