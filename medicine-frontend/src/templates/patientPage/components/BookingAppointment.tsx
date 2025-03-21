import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {SelectAppointment} from "@/templates/patientPage/components/SelectAppointment.tsx";
import { DatePicker } from "@/components/ui/datepicker";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchMedecinsRDV, fetchRDVPatient} from "@/templates/patientPage/actions/patient-action.ts";
import {LoaderSpinner} from "@/templates/patientPage/components/LoaderSpinner.tsx";
import { formatDate} from "@/templates/patientPage/components/format.ts";

type dayObject = {
    date: string;
    horaires: string[];
};

export const BookingAppointment = ({ className, numSecuSocial, numRpps }: { className?: string, numSecuSocial: string,numRpps: string}) => {
    const [date, setDate] = useState<Date | any>(new Date())
    const [jourDeLaSemaine, setJourDeLaSemaine] = useState<dayObject[]>([]);

    const {
        data: medicinAllRdv,
        isLoading: isMedecinLoading,
    } = useQuery({
        queryKey: ["medicinAllRdv"],
        queryFn: async () => {
            return await fetchMedecinsRDV(numRpps);
        },
    });


    const generateHoraires = (): string[] => {
        const horaires = [];
        for (let i = 9; i <= 18; i++) {
            const hour = i < 10 ? `0${i}:00` : `${i}:00`;
            horaires.push(hour);
            if(i != 18){
                horaires.push(hour.replace(':00', ':30'));
            }

        }
        return horaires;
    };

    useEffect(()=>{
        if(!medicinAllRdv) return;

        const horairesBase = generateHoraires();
        const rdvsReserves = Array.from(medicinAllRdv).filter((rdv: any) => rdv.state == "réservé");


        const lundi = new Date(date);
        lundi.setDate(date?.getDate()-date.getDay()+ 1);

        const disponibilite: dayObject[] = Array.from({ length: 5 }, (_, index) => {
            const currentDay = new Date(lundi);
            currentDay.setDate(lundi.getDate() + index);
            const currentDayFr = currentDay.toLocaleDateString('fr-CA');

            const horairesReserveDuJour = rdvsReserves
                .filter((rdv: any) => {
                    const rdvDate = new Date(rdv.date);
                    return rdvDate.toLocaleDateString('fr-CA') === currentDayFr;
                })
                .map((rdv: any) => {
                    return rdv.date.split('T')[1].substring(0, 5);
                });

            const disponibilites = horairesBase.filter((horaire) => !horairesReserveDuJour.includes(horaire));

            return {
                date: currentDayFr,
                horaires: disponibilites
            };
        });

        setJourDeLaSemaine(disponibilite);
    },[medicinAllRdv,isMedecinLoading,date])

    if (isMedecinLoading) {
        return (
            <Card className={className}>
                <CardTitle className={"text-black flex justify-self-center m-3"}>Prendre un rendez-vous</CardTitle>
                <hr />
                <CardContent className="flex flex-col">
                    <DatePicker onDateChange={setDate} className={"my-3"} />
                    <div className="flex min-h-[200px] items-center justify-center"> {/* Remplacer h-screen par min-h-[200px] */}
                        <LoaderSpinner />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardTitle className={"text-black flex justify-self-center m-3"}>Prendre un rendez-vous</CardTitle>
            <hr/>
            <CardContent className="flex flex-col ">
                <DatePicker onDateChange={setDate} className={"my-3"} />
                <Accordion type="single" collapsible>
                    {jourDeLaSemaine.map(({ date, horaires }, index) => {

                        return (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>{formatDate(date,"short")}</AccordionTrigger>
                                <AccordionContent className="flex flex-wrap gap-1">
                                    {horaires.length > 0 ? (
                                        (() => {
                                            const now = new Date();

                                            const validHoraires = horaires.filter((heure) => {
                                                const rdvDateTime = new Date(`${date} ${heure}`);
                                                return rdvDateTime > now;
                                            });

                                            if (validHoraires.length === 0) {
                                                return <p>La date est passée, impossible de prendre un rendez-vous</p>;
                                            }

                                            return validHoraires.map((heure) => (
                                                <SelectAppointment
                                                    numSecuSocial={numSecuSocial}
                                                    numRpps={numRpps}
                                                    key={heure}
                                                    heure={heure}
                                                    date={date}
                                                />
                                            ));
                                        })()
                                    ) : (
                                        <p>Aucun créneau disponible</p>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}
