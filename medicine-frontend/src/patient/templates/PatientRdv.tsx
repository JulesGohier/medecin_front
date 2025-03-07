import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import {useQuery} from "@tanstack/react-query";
import {authenticateMedecin, fetchMedecinsRDV, fetchRDVPatient} from "@/patient/actions/patient-action.ts";
import {LoaderSpinner} from "@/patient/components/LoaderSpinner.tsx";
import {TableAppointment} from "@/patient/components/TableAppointment.tsx";

export const PatientRdv = () => {
    const {
        data: patientData,
        isLoading: isAuthLoading,
        error: authError
    } = useQuery({
        queryKey: ["authenticateMedecin"],
        queryFn: async () => {
            const { patient } = await authenticateMedecin();
            return patient;
        },
        retry: 2,
    });

    const {
        data: patientAllRdv,
        isLoading: isPatientLoading,
        error: patientError
    } = useQuery({
        queryKey: ["patientAllRdv"],
        queryFn: async () => {
            return await fetchRDVPatient(patientData.num_secu_sociale);
        },
    });

    if (isPatientLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-screen items-center justify-center">
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