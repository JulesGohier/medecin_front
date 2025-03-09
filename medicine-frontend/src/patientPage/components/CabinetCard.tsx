import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card.tsx";
import {InfoSection} from "@/patientPage/components/InfoSection.tsx";


export const CabinetCard = ({ className }: { className?: string }) => {

    const CabinetInfo = {
        horaires: "Disponible du lundi au vendredi, de 9h à 18h",
        adresse: {rue: "11 Rue Contrescarpe", ville: "44000 Nantes", complement: "1er étage sans ascenseur"},
        paiement: ["Chèques", "espèces", "cartes bancaires"],
    }

    return (
        <div className={className}>
            <Card>
                <CardTitle className={"text-black flex justify-self-center m-3"}>Votre cabinet</CardTitle>
                <hr/>
                <CardContent className={"mt-3"}>
                    <div className={"flex flex-col gap-5"}>
                        <InfoSection title="Horaire :">
                            <p>{CabinetInfo.horaires}</p>
                        </InfoSection>
                        <InfoSection title="Localisation du cabinet :">
                            <p>{CabinetInfo.adresse.rue}</p>
                            <p>{CabinetInfo.adresse.ville}</p>
                            <p>{CabinetInfo.adresse.complement}</p>
                        </InfoSection>
                        <InfoSection title="Moyens de paiement :">
                            <p>{CabinetInfo.paiement.join(", ")}</p>
                        </InfoSection>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}