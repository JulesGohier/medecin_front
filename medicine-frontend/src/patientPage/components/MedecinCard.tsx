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
import {ContactButton} from "@/patientPage/components/ContactButton.tsx";
import {DialogBookingAppointment} from "@/patientPage/components/DialogBookingAppointment.tsx";



export const MedecinCard = ({ className, medecin, patient }: {className?: string, medecin: any, patient: any}) => {
    const MedecinInfo = {
        image: "src/assets/medecin-300x300.jpg",
    };

    const PhoneWithSpace = medecin?.numTel.replace(/(\d{2})/g, '$1 ');

    console.log(medecin);
    return (
        <div className={className}>
            <Card >
                <CardHeader className={"flex flex-row items-center"}>
                    <Avatar className="w-1/3 h-1/3">
                        <AvatarImage src={MedecinInfo.image} alt="Avatar"/>
                    </Avatar>
                    <div className={"ml-8"}>
                        <CardTitle className={"text-red-500 text-2xl"}>{`Dr. ${medecin?.nom} ${medecin?.prenom}`}</CardTitle>
                        <CardDescription>{medecin?.specialite}</CardDescription>
                    </div>
                </CardHeader>
                <hr/>
                <CardFooter className={"flex flex-col mt-5 gap-3"}>
                    <ContactButton Icon={Phone} href={"tel:+33" + PhoneWithSpace} label={PhoneWithSpace}/>
                    <ContactButton Icon={Mails} href={"mailto:" + medecin?.email} label={medecin?.email}/>
                    <DialogBookingAppointment patient={patient} numRpps={medecin.numRpps}/>
                </CardFooter>
            </Card>
        </div>
    );
}