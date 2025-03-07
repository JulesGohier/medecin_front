import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { YourMedecinCard } from "@/patient/components/YourMedecinCard.tsx";
import {BookingAppointment} from "@/patient/components/BookingAppointment.tsx";
import {CabinetCard} from "@/patient/components/CabinetCard.tsx";
import {NextAppointement} from "@/patient/components/NextAppointement.tsx";
import { LoaderSpinner } from "@/patient/components/LoaderSpinner.tsx";
import {
    authenticateMedecin,
    fetchMedecinsId, fetchProchainRDVPatient
} from "@/patient/actions/patient-action.ts";
import {useQuery} from "@tanstack/react-query";


export const PatientDashboard = () => {

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
        data: medecinData,
        isLoading: isMedecinLoading,
        error: medecinError
    } = useQuery({
        queryKey: ["medecinData"],
        queryFn: async () => {
            const medecin = await fetchMedecinsId(patientData?.medecin_perso);
            return medecin;
        },
        enabled: !!patientData,
    });

    const {
        data: nextRDV,
        isLoading: isNextRDVLoading,
        error: nextRDVError
    } = useQuery({
        queryKey: ["nextRDV"],
        queryFn: async () => {
            const data = await fetchProchainRDVPatient(patientData?.num_secu_sociale);

            if(data != null ){
                const numRpps = data.idMedecin.split("/").pop();

                const [date, time] = data.date.split("T");

                const timeWithoutTimezone = time.split("+")[0];

                const nextRDVMedecin = await fetchMedecinsId(numRpps);
                const medecin =  {
                    nom: nextRDVMedecin.nom,
                    prenom: nextRDVMedecin.prenom,
                    specialite: nextRDVMedecin.specialite,
                    avatar: nextRDVMedecin.avatar
                };

                return {medecin, date, timeWithoutTimezone};
            }
            return null;

        },
        enabled: !!patientData,
    });


    if (isAuthLoading) {
        return (
            <div className="flex w-full h-screen items-center justify-center">
                <LoaderSpinner />
            </div>
        );
    }

    if (isMedecinLoading || isNextRDVLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-screen items-center justify-center">
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }

    if (authError || medecinError || nextRDVError) {
        return <p className="text-red-500">Erreur lors de la récupération des données.</p>;
    }

    return (
        <DashboardWrapper user={patientData}>
            <div className="grid w-full gap-4 min-h-[500px] max-h-[80vh] grid-cols-1 md:grid-cols-[2fr_3fr]">
                <div className="flex flex-col gap-4 h-full">
                    <YourMedecinCard
                        medecin={medecinData}
                        className="w-full flex-1"
                    />
                    <CabinetCard className="w-full flex-1" />
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <BookingAppointment patient={patientData} numRpps={patientData.medecin_perso} className="w-full flex-1 min-h-[300px] md:min-h-[500px]" />
                    <NextAppointement
                        className="w-full h-[160px] rounded-2xl flex flex-col justify-center"
                        medecin={nextRDV?.medecin}
                        date={nextRDV?.date}
                        time={nextRDV?.timeWithoutTimezone}
                    />
                </div>
            </div>
        </DashboardWrapper>
    );
};