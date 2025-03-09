import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {useQuery} from "@tanstack/react-query";
import {authenticateMedecin, fetchRDVPatient} from "@/patientPage/actions/patient-action.ts";
import {LoaderSpinner} from "@/patientPage/components/LoaderSpinner.tsx";
import {TableAppointment} from "@/patientPage/components/TableAppointment.tsx";

export const PatientRdv = () => {
    const {
        data: patientData,
        isLoading: isAuthLoading,
    } = useQuery({
        queryKey: ["patientData"],
        queryFn: async () => {
            const patientDataString = localStorage.getItem('patient');

            if (!patientDataString) {
                throw new Error("Aucune donnée patient trouvée dans le localStorage.");
            }

            try {
                const patient = JSON.parse(patientDataString);
                return patient;
            } catch (error) {
                throw new Error("Les données du patient sont corrompues ou mal formatées.");
            }
        },
    });

    const {
        data: patientAllRdv,
        isLoading: isPatientLoading,
    } = useQuery({
        queryKey: ["patientAllRdv"],
        queryFn: async () => {
            return await fetchRDVPatient(patientData.num_secu_sociale);
        },
    });

    if (isPatientLoading || isAuthLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-[80vh] items-center justify-center flex-col">
                    <p className="text-lg mb-4">Chargement de l'ensembles de vos rendez-vous...</p>
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }

    return (
        <DashboardWrapper user={patientData}>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Vos rendez-vous</h2>
                    <p className={"text-lg font-medium"}></p>
                </div>
                <div className={"flex flex-col sm:flex-row md:flex-row mt-16"}>
                    <TableAppointment appointments={patientAllRdv}/>
                </div>
            </div>
        </DashboardWrapper>
    );
};