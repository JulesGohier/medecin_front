import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {MedecinCard} from "@/patientPage/components/MedecinCard.tsx";
import {authenticateMedecin, fetchAllMedecins} from "@/patientPage/actions/patient-action.ts";
import {LoaderSpinner} from "@/patientPage/components/LoaderSpinner.tsx";
import { useQuery } from "@tanstack/react-query";

export const PatientMedecin = () => {
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
        retry: 2,
    });

    const { data: medecins, isLoading } = useQuery({
        queryKey: ["medecins"],
        queryFn: async () => {
            const tmp = await fetchAllMedecins();

            return tmp;
        },
        enabled: !!patientData,
        retry: 2,
    });

    if (isAuthLoading || isLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className={"flex w-full h-[80vh] items-center justify-center flex-col"}>
                    <p className="text-lg mb-4">Chargement de la liste des medecins...</p>
                    <LoaderSpinner/>
                </div>
            </DashboardWrapper>
        );
    }

    return (
        <DashboardWrapper user={patientData}>
            <h2 className="text-xl font-bold mb-4">Liste des Médecins</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {medecins.length > 0 ? (
                    medecins.map((medecin: object, index: string) => (
                            <MedecinCard
                                key={index}
                                medecin={medecin}
                                patient={patientData}
                            />
                        ))
                ) : (
                    <p className="text-gray-500">Chargement en cours...</p>
                )}
            </div>
        </DashboardWrapper>
    );
};
