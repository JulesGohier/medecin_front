import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface PatientsAppointment {
    firstName: string;
    lastName: string;
    email: string;
    day: string;
    hours: string;
}

export const NextAppointmentCard = () => {
    const nextAppointment: PatientsAppointment[] = [
        {
            firstName: "Julien",
            lastName: "Gohier",
            email: "jules.reihog5@gmail.com",
            day: "Aujourd'hui",
            hours: "10:30",
        },
        {
            firstName: "Julien",
            lastName: "Gohier",
            email: "jules.reihog5@gmail.com",
            day: "Aujourd'hui",
            hours: "10:30",
        },
        {
            firstName: "Julien",
            lastName: "Gohier",
            email: "jules.reihog5@gmail.com",
            day: "Demain",
            hours: "13:00",
        },
        {
            firstName: "Julien",
            lastName: "Gohier",
            email: "jules.reihog5@gmail.com",
            day: "Demain",
            hours: "14:30",
        },
    ];
    
    return (
        <Card className={"w-full sm:w-1/2 mx-0 sm:mx-6 border-2 border-gray-200  mt-5 sm:mt-0 md:mt-0 md:max-h-[1000px] xl:max-h-[400px]"}>
            <CardHeader>
                <CardTitle>Vos prochains rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-col px-4 text-lg"}>
                {nextAppointment.length > 0 ? nextAppointment.map((item, key) => {
                    return (
                        <div key={key} className="flex flex-col py-2">
                            <div className={"flex flex-row flex-wrap items-center ml-3"}>
                                <Avatar className={"mr-6"}>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>{item.firstName[0]} {item.lastName[0]}</AvatarFallback>
                                </Avatar>
                                
                                <div className={"flex flex-col min-w-0 text-sm sm:text-md md:text-lg"}>
                                    <h1>{item.firstName} {item.lastName}</h1>
                                    <h2>{item.email}</h2>
                                </div>
                                
                                <div className={"flex flex-col  text-center w-24 min-w-0 text-lg"}>
                                    <div className="hidden xl:block xl:ml-12">
                                        <h2 className={"font-semibold text-gray-300"}>{item.day}</h2>
                                        <h2 className={"font-bold"}>{item.hours}</h2>
                                    </div>
                                    
                                    <div className="xl:hidden ml-2 flex-col items-center justify-center mt-2">
                                        <Button className="bg-red-800 hover:bg-red-600/90 rounded-lg text-white text-sm">
                                            Voir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Separator */}
                            {key < nextAppointment.length - 1 && (
                                <Separator className={"mt-2 border-gray-300 md:flex"} />
                            )}
                        </div>
                    );
                }) : (
                    <div>
                        Aucun prochain rendez-vous
                    </div>
                )}
            </CardContent>
        </Card>
    );
};