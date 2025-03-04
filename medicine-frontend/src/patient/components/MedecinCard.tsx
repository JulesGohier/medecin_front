import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import {Mails, Phone} from "lucide-react";
import {ContactButton} from "@/patient/components/ContactButton.tsx";
import {DialogBookingAppointment} from "@/patient/components/DialogBookingAppointment.tsx";


export const MedecinCard = ({ className }: { className?: string }) => {
    const MedecinInfo = {
        image: "src/assets/medecin-300x300.jpg",
        nom: "Dr. Tirbois Romain",
        specialite: "Médecin généraliste",
        telephone: "0651301290",
        email: "jules.reihog5@gmail.com",
    };

    const PhoneWithSpace = MedecinInfo.telephone.replace(/(\d{2})/g, '$1 ');

    return (
        <div className={className}>
            <Card >
                <CardHeader className={"flex flex-row items-center"}>
                    <Avatar className="w-1/3 h-1/3">
                        <AvatarImage src={MedecinInfo.image} alt="Avatar"/>
                    </Avatar>
                    <div className={"ml-8"}>
                        <CardTitle className={"text-red-500 text-2xl"}>{MedecinInfo.nom}</CardTitle>
                        <CardDescription>{MedecinInfo.specialite}</CardDescription>
                    </div>
                </CardHeader>
                <hr/>
                <CardFooter className={"flex flex-col mt-5 gap-3"}>
                    <ContactButton Icon={Phone} href={"tel:+33" + MedecinInfo.telephone} label={PhoneWithSpace}/>
                    <ContactButton Icon={Mails} href={"mailto:" + MedecinInfo.email} label={MedecinInfo.email}/>
                    <DialogBookingAppointment/>
                </CardFooter>
            </Card>
        </div>
    );
}