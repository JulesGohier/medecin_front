import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { YourMedecinCard } from "@/patient/components/YourMedecinCard.tsx";
import {BookingAppointment} from "@/patient/components/BookingAppointment.tsx";
import {CabinetCard} from "@/patient/components/CabinetCard.tsx";
import {NextAppointement} from "@/patient/components/NextAppointement.tsx";
import { LoaderSpinner } from "@/patient/components/LoaderSpinner.tsx";
import {
    authenticateMedecin,
    fetchMedecinsId, fetchRDVPatient
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
        queryKey: ["medecinData", patientData?.medecin_perso],
        queryFn: async () => {
            const medecin = await fetchMedecinsId(patientData?.medecin_perso);
            return medecin;
        },
        enabled: !!patientData,
    });

    const {
        data: rdvPatient,
        isLoading: isRDVLoading,
        error: rdvError
    } = useQuery({
        queryKey: ["rdvPatient", patientData?.num_secu_sociale],
        queryFn: async () => {
            const rdvs = await fetchRDVPatient(patientData?.num_secu_sociale);
            let nextRDV;
            if(rdvs.length != 0) {
                const sortedRDV = rdvs.sort((a, b) => {
                    const dateA = new Date(a.date).getDate();
                    const dateB = new Date(b.date).getDate();

                    if (dateA != dateB) {
                        return dateA - dateB;
                    }

                    const timeA = new Date(a.date).getTime()
                    const timeB = new Date(b.date).getTime()

                    return timeA - timeB;
                });

                const upcomingRDV = sortedRDV[0];

                const numRpps = patientData.medecin_perso;
                const RDVMedecinData = await fetchMedecinsId(numRpps);

                const dateTime = upcomingRDV.date;

                const [date, time] = dateTime.split("T");
                const timeWithoutTimezone = time.split("+")[0];

                const nextAppointment = {
                    medecin: {
                        name: RDVMedecinData.nom,
                        prenom: RDVMedecinData.prenom,
                        specialty: RDVMedecinData.specialite,
                        avatar: RDVMedecinData.avatar,
                    },
                    date: date,
                    time: timeWithoutTimezone,
                }

                nextRDV = nextAppointment;
            }
            else{
                nextRDV = null;
            }
            return {rdvs, nextRDV};
        },
        enabled: !!patientData,
    });

    const nextRDV = rdvPatient?.nextRDV

    // const [patient, setPatient] = useState<object | null>(null);
    // const [medecin, setMedecin] = useState<object | null>(null);
    //
    // const [nextRDV, setNextRDV] = useState<object | null>(null);
    //
    // const [error, setError] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { patient } = await authenticateMedecin();
    //             const yourMedecinData = await fetchMedecinsId(patient.medecin_perso);
    //             const rdvPatient = await fetchRDVPatient(patient.num_secu_sociale);
    //
    //             console.log("Unsorted : ", rdvPatient);
    //
    //             if(rdvPatient.length != 0){
    //                 const sortedRDV = rdvPatient.sort((a, b) => {
    //                     const dateA = new Date(a.date).getDate();
    //                     const dateB = new Date(b.date).getDate();
    //
    //                     if (dateA != dateB){
    //                         return dateA - dateB;
    //                     }
    //
    //                     const timeA = new Date(a.date).getTime()
    //                     const timeB = new Date(b.date).getTime()
    //
    //                     return timeA - timeB;
    //                 });
    //
    //                 const upcomingRDV = sortedRDV[0];
    //
    //                 const numRpps = patient.medecin_perso;
    //                 const RDVMedecinData = await fetchMedecinsId(numRpps);
    //
    //                 const dateTime = upcomingRDV.date;
    //
    //                 const [date, time] = dateTime.split("T");
    //                 const timeWithoutTimezone = time.split("+")[0];
    //
    //                 const nextAppointment = {
    //                     medecin: {
    //                         name: RDVMedecinData.nom,
    //                         prenom: RDVMedecinData.prenom,
    //                         specialty: RDVMedecinData.specialite,
    //                         avatar: RDVMedecinData.avatar,
    //                     },
    //                     date: date,
    //                     time: timeWithoutTimezone,
    //                 };
    //
    //                 setNextRDV(nextAppointment);
    //             }else {
    //                 setNextRDV(null);
    //             }
    //
    //
    //             setPatient(patient)
    //             setMedecin(yourMedecinData);
    //
    //         } catch (err) {
    //             setError("Échec de l'authentification ou récupération des données.");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    if (isAuthLoading) {
        return (
            <div className="flex w-full h-screen items-center justify-center">
                <LoaderSpinner />
            </div>
        );
    }
    if (isMedecinLoading || isRDVLoading) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-screen items-center justify-center">
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }
    if (authError || medecinError || rdvError) {
        return <p className="text-red-500">Erreur lors de la récupération des données.</p>;
    }

    return (
        <DashboardWrapper user={patientData}>
            <div className="grid w-full gap-4 min-h-[500px] max-h-[80vh] grid-cols-1 md:grid-cols-[2fr_3fr]">
                <div className="flex flex-col gap-4 h-full">
                    <YourMedecinCard
                        nom={medecinData?.nom}
                        prenom={medecinData?.prenom}
                        specialite={medecinData?.specialite}
                        telephone={medecinData?.numTel}
                        email={medecinData?.email}
                        className="w-full flex-1"
                    />
                    <CabinetCard className="w-full flex-1" />
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <BookingAppointment patient={patientData} className="w-full flex-1 min-h-[300px] md:min-h-[500px]" />
                    <NextAppointement
                        className="w-full h-[160px] rounded-2xl flex flex-col justify-center"
                        medecin={nextRDV?.medecin}
                        date={nextRDV?.date}
                        time={nextRDV?.time}
                    />
                </div>
            </div>
        </DashboardWrapper>
    );
};