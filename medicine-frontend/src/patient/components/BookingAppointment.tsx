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

type dayObject = {
    date: string;
    horaires: string[];
};

export const BookingAppointment = ({ className, patient, numRpps }: { className?: string, patient: object,numRpps: string}) => {
        const [date, setDate] = useState<Date | any>(new Date())
        const [jourDeLaSemaine, setJourDeLaSemaine] = useState<
            { date: string; horaires: string[] }[]
        >([]);

        useEffect(()=>{

            const lundi = new Date(date);
            lundi.setDate(date?.getDate()-date.getDay()+ 1);

            const defaultObject: dayObject = {
                date: "",
                horaires: [],
            };

            const disponibilite: dayObject[] = Array.from({ length: 5 }, (_, index) => {
                const currentDay = new Date(lundi);
                currentDay.setDate(lundi.getDate() + index);

                return {
                    ...defaultObject,
                    date: currentDay.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                    }),
                    horaires: Math.random() > 0.5
                        ? Array.from({ length: 10 }, (_, i) => `${9 + i}:00`)
                        : [],
                };
            });

            setJourDeLaSemaine(disponibilite);
        },[date])

        return (
                <Card className={className}>
                    <CardTitle className={"text-black flex justify-self-center m-3"}>Prendre un rendez-vous</CardTitle>
                    <hr/>
                    <CardContent className="flex flex-col ">
                        <DatePicker onDateChange={setDate} className={"my-3"}/>
                        <Accordion type="single" collapsible>
                            {jourDeLaSemaine.map(({ date, horaires }, index) => (
                                <AccordionItem key={index} value={`item-${index + 1}`}>
                                    <AccordionTrigger>{date}</AccordionTrigger>
                                    <AccordionContent className={"flex flex-wrap gap-3"}>
                                        {horaires.length > 0 ? (
                                            horaires.map((heure) => (
                                                <SelectAppointment patient={patient} numRpps={numRpps} key={heure} heure={heure} date={date}/>
                                            ))
                                        ) : (
                                            <p>Aucun créneau disponible</p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
        );
}