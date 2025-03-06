import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authenticateMedecin } from "@/patient/actions/patient-action.ts";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

export const PatientSettings = () => {

    const {
        data: patientData,
        isLoading: isAuthLoading,
        error: authError
    } = useQuery({
        queryKey: ["authenticateMedecin"],
        queryFn: async () => {
            const { patient } = await authenticateMedecin();
            return patient;
        },
        retry: 2,
    });

    return (
        <DashboardWrapper user={patientData}>
            <form className="flex flex-col space-y-4 p-6">
                <h2 className="text-xl font-semibold">Modifier vos informations</h2>

                <Input
                    label="Nom"
                    name="nom"
                    value={patientData.nom}
                    placeholder="Votre nom"
                />

                <Input
                    label="Prénom"
                    name="prenom"
                    value={patientData.prenom}
                    placeholder="Votre prénom"
                />

                <Input
                    label="Numéro de Sécurité Sociale"
                    name="numero_secu_sociale"
                    value={patientData.numero_secu_sociale}
                    placeholder="Votre numéro de sécurité sociale"
                />

                {/*<Input*/}
                {/*    label="Médecin Personnel"*/}
                {/*    name="medecin_perso"*/}
                {/*    value={formData.medecin_perso || medecin_perso || ""}*/}
                {/*    onChange={handleInputChange}*/}
                {/*    placeholder="Nom de votre médecin personnel"*/}
                {/*/>*/}

                <Button type="submit" variant="themed">
                    Enregistrer les modifications
                </Button>
            </form>
        </DashboardWrapper>
    );
};

// Fonction pour mettre à jour les informations (exemple, à adapter)
const updatePatientInfo = async (data: any) => {
    // Effectuer un appel API pour envoyer les données du patient vers votre backend
    // Assurez-vous de remplacer cette logique par votre appel réel à l'API.
    console.log("Mise à jour des informations du patient:", data);
    // Exemple de code à utiliser pour envoyer les données :
    // await axios.put("/api/patients", data);
};
