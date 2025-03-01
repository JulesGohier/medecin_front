import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {fetchData} from "@/medecin/actions/medecin-action.ts";
import { LoaderSpinner } from "@/medecin/components/LoaderSpinner.tsx";
import {NextAppointmentModal} from "@/medecin/components/modals/NextAppointmentModal.tsx";

import { useQueries } from "@tanstack/react-query";

export type Patient = {
    num_secu_sociale: string;
    nom: string;
    prenom: string;
    sexe: string;
    num_tel: string;
    date_naissance: string;
}


export const NextAppointmentCard = ({ appointments }: { appointments: string[] }) => {
    const queriesAppointmentData = useQueries({
        queries: appointments.map((appointment) => ({
            queryKey: ['appointment', appointment],
            queryFn: () => fetchData(appointment),
        })),
    });
    
    const queriesAppointmentPatientData = useQueries({
        queries: queriesAppointmentData
            .filter((appointment) => appointment.data?.idPatient)
            .map((appointment) => ({
                queryKey: ['patient', appointment.data.idPatient],
                queryFn: () => fetchData(appointment.data.idPatient),
            })),
    });
    
    const isLoading = queriesAppointmentData.some(query => query.isLoading) || queriesAppointmentPatientData.some(query => query.isLoading);
    
    return (
        <Card className={"w-full sm:w-1/2 mx-0 sm:mx-6 border-2 border-gray-200 mt-5 sm:mt-0 md:max-h-[1000px] xl:max-h-[400px]"}>
            <CardHeader>
                <CardTitle>Vos prochains rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-col px-4 text-lg"}>
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-full mt-12">
                        <LoaderSpinner/>
                    </div>
                ) : queriesAppointmentData.length > 0 ? (
                    queriesAppointmentData.map((item, key) => {
                        const patientData = queriesAppointmentPatientData[key]?.data;
                        const appointmentDate = item.data?.date;
                        
                        return (
                            <div key={key} className="flex flex-col py-2">
                                <div className={"flex flex-row flex-wrap items-center ml-3"}>
                                    <Avatar className={"mr-6"}>
                                        <AvatarImage src="https://github.com/shadcn.png"
                                                     alt={`${patientData?.prenom} ${patientData?.nom}`}/>
                                        <AvatarFallback>
                                            {patientData ? `${patientData.prenom[0]}${patientData.nom[0]}` : '??'}
                                        </AvatarFallback>
                                    </Avatar>
                                    
                                    <div className={"flex flex-col min-w-0 text-sm sm:text-md md:text-lg"}>
                                        <h1>{patientData?.prenom} {patientData?.nom}</h1>
                                        <h2>{patientData?.num_tel}</h2>
                                    </div>
                                    
                                    <div className={"flex ml-0 xl:ml-auto flex-col text-center w-24 min-w-0 text-lg"}>
                                        <div className="flex-col items-center justify-center mt-2">
                                            <NextAppointmentModal
                                                {...patientData}
                                                appointmentDate={appointmentDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {key < queriesAppointmentData.length - 1 && (
                                    <Separator className={"mt-2 border-gray-300 md:flex"}/>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>Aucun prochain rendez-vous</div>
                )}
            </CardContent>
        </Card>
    );
};