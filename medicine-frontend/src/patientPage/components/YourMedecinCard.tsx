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
import {formatPhoneNumber} from "@/patientPage/components/format.ts";


export const YourMedecinCard = ({ className, medecin }: {className?: string, medecin: any}) => {
    const MedecinInfo = {
        image: "src/assets/medecin-300x300.jpg",
    };

    return (
        <div className={className}>
            <Card>
                <CardTitle className={"text-black flex justify-self-center m-3"}>Votre médecin</CardTitle>
                <hr />
                <CardHeader className={"flex flex-row items-center"}>
                    <Avatar className="w-1/3 h-1/3">
                        <AvatarImage src={MedecinInfo.image} alt="Avatar" />
                    </Avatar>
                    <div className={"ml-8"}>
                        <CardTitle className={"text-red-500 text-2xl"}>{`Dr. ${medecin.nom} ${medecin.prenom}`}</CardTitle>
                        <CardDescription>{medecin.specialite}</CardDescription>
                    </div>
                </CardHeader>
                <hr />
                <CardFooter className={"flex flex-col mt-5 gap-3"}>
                    <ContactButton Icon={Phone} href={"tel:+33" + medecin.numTel} label={formatPhoneNumber(medecin.numTel)} />
                    <ContactButton Icon={Mails} href={"mailto:" + medecin.email} label={medecin.email} />
                </CardFooter>
            </Card>
        </div>
    );
};