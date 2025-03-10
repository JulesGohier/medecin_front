import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {authenticateMedecin, fetchMedecinByRpps} from "@/medecin/actions/medecin-action.ts";
import {LoaderSpinner} from "@/medecin/components/LoaderSpinner.tsx";
import {TablePatients} from "@/medecin/components/tables/TablePatients.tsx";
import {useQuery} from "@tanstack/react-query";
import {parseurJSON} from "@/parseurJson.ts";


const MedecinPatients = () => {
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