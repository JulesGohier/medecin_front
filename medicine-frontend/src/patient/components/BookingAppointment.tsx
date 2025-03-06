import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {SelectAppointment} from "@/patient/components/SelectAppointment.tsx";
import { DatePicker } from "@/components/ui/datepicker";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchMedecinsRDV} from "@/patient/actions/patient-action.ts";
import {LoaderSpinner} from "@/patient/components/LoaderSpinner.tsx";

type dayObject = {
    date: string;
    horaires: string[];
};

export const BookingAppointment = ({ className, patient, numRpps }: { className?: string, patient: object,numRpps: string}) => {
    const [date, setDate] = useState<Date | any>(new Date())
    const [jourDeLaSemaine, setJourDeLaSemaine] = useState<
        { date: string; horaires: string[] }[]
    >([]);

    const {
        data: medicinAllRdv,
        isLoading: isMedecinLoading,
        error: medecinError,
    } = useQuery({
        queryKey: ["medicinAllRdv"],
        queryFn: async () => {
            return await fetchMedecinsRDV(numRpps);
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    const generateHoraires = (): string[] => {
        const horaires = [];
        for (let i = 9; i <= 18; i++) {
            const hour = i < 10 ? `0${i}:00` : `${i}:00`;
            horaires.push(hour);
            horaires.push(hour.replace(':00', ':30'));
        }
        return horaires;
    };

    useEffect(()=>{
        if(!medicinAllRdv) return;

        const horairesBase = generateHoraires();
        const rdvsReserves = Array.from(medicinAllRdv).filter((rdv: any) => rdv.state == "réservé");


        const lundi = new Date(date);
        lundi.setDate(date?.getDate()-date.getDay()+ 1);

        const defaultObject: dayObject = {
            date: "",
            horaires: [],
        };

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
                ...defaultObject,
                date: currentDayFr,
                horaires: disponibilites
            };
        });

        setJourDeLaSemaine(disponibilite);
    },[medicinAllRdv,isMedecinLoading,date])

    if(isMedecinLoading){
        return (
            <Card className={className}>
                <CardTitle className={"text-black flex justify-self-center m-3"}>Prendre un rendez-vous</CardTitle>
                <hr/>
                <CardContent className="flex flex-col ">
                    <DatePicker onDateChange={setDate} className={"my-3"}/>
                    <div className="flex w-full h-screen items-center justify-center">
                        <LoaderSpinner />
                    </div>
                </CardContent>
            </Card>
        );
    }


    return (
        <Card className={className}>
            <CardTitle className={"text-black flex justify-self-center m-3"}>Prendre un rendez-vous</CardTitle>
            <hr />
            <CardContent className="flex flex-col ">
                <DatePicker onDateChange={setDate} className={"my-3"} />
                <Accordion type="single" collapsible>
                    {jourDeLaSemaine.map(({ date, horaires }, index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>{new Date(date).toLocaleDateString("fr-FR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}</AccordionTrigger>
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
                                                    patient={patient}
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