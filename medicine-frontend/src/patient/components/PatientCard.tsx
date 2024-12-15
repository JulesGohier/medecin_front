import {
    Card,
    CardContent,
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
import {InfoSection} from "@/patient/components/InfoSection.tsx";


export const PatientCard = () => {
    const MedecinInfo = {
        image: "src/assets/medecin-300x300.jpg",
        nom: "Dr. Tirbois Romain",
        specialite: "Médecin généraliste",
        horaires: "Disponible du lundi au vendredi, de 9h à 18h",
        adresse: {rue: "11 Rue Contrescarpe", ville: "44000 Nantes", complement: "1er étage sans ascenseur"},
        paiement: ["Chèques", "espèces", "cartes bancaires"],
        telephone: "0651301290",
        email: "jules.reihog5@gmail.com",
    };


    return (
        <Card className={"w-1/3 mt-7"}>
            <CardTitle className={"text-black text-1xl flex justify-self-center"}>Votre médecin</CardTitle>
            <hr/>
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
            <CardContent className={"mt-3"}>
                <div className={"flex flex-col gap-5"}>
                    <InfoSection title="Horaire :">
                        <p>{MedecinInfo.horaires}</p>
                    </InfoSection>
                    <InfoSection title="Localisation du cabinet :">
                        <p>{MedecinInfo.adresse.rue}</p>
                        <p>{MedecinInfo.adresse.ville}</p>
                        <p>{MedecinInfo.adresse.complement}</p>
                    </InfoSection>
                    <InfoSection title="Moyens de paiement :">
                        <p>{MedecinInfo.paiement.join(", ")}</p>
                    </InfoSection>
                </div>
            </CardContent>
            <hr/>
            <CardFooter className={"flex flex-col mt-5 gap-3"}>
                <ContactButton Icon={Phone} href={"tel:+33" + MedecinInfo.telephone} label={MedecinInfo.telephone}/>
                <ContactButton Icon={Mails} href={"mailto:" + MedecinInfo.email} label={MedecinInfo.email}/>
            </CardFooter>
        </Card>
    );
}