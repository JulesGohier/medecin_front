import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {SelectAppointment} from "@/patient/components/SelectAppointment.tsx";

export const BookingAppointment = ({ className }: { className?: string }) => {
    const joursDisponibles = [
        { date: "Lundi 10 Janvier", horaires: ["9:00", "9:20", "9:40", "10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"] },
        { date: "Mardi 11 Janvier", horaires: ["10:00", "10:20", "10:40", "11:00"] },
        { date: "Mercredi 12 Janvier", horaires: [] },
        { date: "Jeudi 13 Janvier", horaires: [] },
        { date: "Vendredi 14 Janvier", horaires: [] }
    ];

    return (
        <Card className={className}>
            <CardTitle className={"text-black text-1xl flex justify-self-center m-2"}>Prendre un RDV</CardTitle>
            <hr/>
            <CardContent>
                <Accordion type="single" collapsible>
                    {joursDisponibles.map(({ date, horaires }, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`} >
                            <AccordionTrigger>{date}</AccordionTrigger>
                            <AccordionContent className={"flex flex-wrap gap-3"}>
                                {horaires.length > 0 ? (
                                    horaires.map((heure) => (
                                        <SelectAppointment key={heure} heure={heure} date={date}/>
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