import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {fetchMedecinByRpps} from "@/templates/medecinPage/actions/medecin-action.ts";
import {LoaderSpinner} from "@/templates/medecinPage/components/LoaderSpinner.tsx";
import {TableAppointment} from "@/templates/medecinPage/components/tables/TableAppointment.tsx";
import {useQuery} from "@tanstack/react-query";
import {parseurJSON} from "@/parseurJson.ts";


const MedecinAppointments = () => {

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
        )
    }
    
    return (
        <DashboardWrapper user={medecin}>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Rendez-vous</h2>
                    <p className={"text-lg font-medium"}>Tableau de vos rendez-vous.</p>
                </div>
                <div className={"flex flex-col sm:flex-row md:flex-row mt-16"}>
                    <TableAppointment appointments={medecin?.rdv} />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinAppointments;