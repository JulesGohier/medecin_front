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

interface MedecinCardProps {
    className?: string;
    nom: string;
    prenom: string;
    specialite: string;
    telephone: string;
    email: string;
}

export const YourMedecinCard: React.FC<MedecinCardProps> = ({ className = "", nom, prenom, specialite, telephone, email }) => {
    const MedecinInfo = {
        image: "src/assets/medecin-300x300.jpg",
    };

    const PhoneWithSpace = telephone.replace(/(\d{2})/g, '$1 ');

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
                        <CardTitle className={"text-red-500 text-2xl"}>{`Dr. ${nom} ${prenom}`}</CardTitle>
                        <CardDescription>{specialite}</CardDescription>
                    </div>
                </CardHeader>
                <hr />
                <CardFooter className={"flex flex-col mt-5 gap-3"}>
                    <ContactButton Icon={Phone} href={"tel:+33" + telephone} label={PhoneWithSpace} />
                    <ContactButton Icon={Mails} href={"mailto:" + email} label={email} />
                </CardFooter>
            </Card>
        </div>
    );
};