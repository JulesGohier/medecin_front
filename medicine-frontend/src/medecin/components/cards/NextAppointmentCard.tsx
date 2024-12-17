import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

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
        <Card className={"w-full mx-auto md:w-1/2 md:mr-6 border-2 border-gray-200"}>
            <CardHeader>
                <CardTitle>Vos prochains rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-col px-4 text-lg"}>
                {nextAppointment.map((item, key) => {
                    return (
                        <div key={key} className="flex flex-col py-2">
                            <div className={"flex flex-row flex-wrap items-center ml-3"}>
                                <Avatar className={"mr-6"}>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>JG</AvatarFallback>
                                </Avatar>
                                <div className={"flex flex-col min-w-0"}>
                                    <h1 className={"truncate"}>
                                        {item.firstName} {item.lastName}
                                    </h1>
                                    <h2 className={"truncate"}>{item.email}</h2>
                                </div>
                                <div className={"flex flex-col ml-auto text-center w-24 items-center justify-center min-w-0"}>
                                    <h2 className={"font-semibold text-gray-300"}>{item.day}</h2>
                                    <h2 className={"font-bold"}>{item.hours}</h2>
                                </div>
                            </div>
                            {key < nextAppointment.length - 1 && (
                                <Separator className={"mt-2 border-gray-300"} />
                            )}
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};