import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { YourMedecinCard } from "@/patientPage/components/YourMedecinCard.tsx";
import {BookingAppointment} from "@/patientPage/components/BookingAppointment.tsx";
import {CabinetCard} from "@/patientPage/components/CabinetCard.tsx";
import {NextAppointement} from "@/patientPage/components/NextAppointement.tsx";
import { LoaderSpinner } from "@/patientPage/components/LoaderSpinner.tsx";
import {
    authenticateMedecin,
    fetchMedecinsId, fetchProchainRDVPatient
} from "@/patientPage/actions/patient-action.ts";
import {useQuery} from "@tanstack/react-query";


export const PatientDashboard = () => {

    const {
        data: patientData,
        isLoading: isAuthLoading,
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
            <div className="flex w-full h-screen items-center justify-center flex-col">
                <p className="text-lg mb-4">Bienvenue ! Nous vous connectons...</p>
                <LoaderSpinner />
            </div>
        );
    }


    if (isMedecinLoading || isNextRDVLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex flex-col w-full h-[80vh] items-center justify-center">
                    <p className="text-lg mb-4">Bienvenue ! Nous vous connectons...</p>
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
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