import { useState, useEffect } from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    authenticateMedecin,
    fetchAllMedecins,
    updateInformationPatient
} from "@/patientPage/actions/patient-action.ts";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { LoaderSpinner } from "@/patientPage/components/LoaderSpinner.tsx";
import { SelecteurMedecin } from "@/patientPage/components/SelecteurMedecin.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

interface Patient {
    nom?: string;
    prenom?: string;
    num_secu_sociale?: string;
    email?: string;
    medecin_perso?: string;
    num_tel?: string;
    sexe?: string;
    date_naissance?: string;
}

interface Medecin {
    numRpps: string;
    nom: string;
    prenom: string;
    specialite: string;
}

export const PatientSettings = () => {
    const [formData, setFormData] = useState<Patient>({});
    const [originalData, setOriginalData] = useState<Patient>({});
    const [modifiedFields, setModifiedFields] = useState<Patient>({});
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (modifiedFields: Patient) => {
            return await updateInformationPatient(modifiedFields, patientData.num_secu_sociale);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['authenticateMedecin'] });

            toast({
                title: "Modification",
                description: `Votre information on bien été modifier !`
            });

            setModifiedFields({});
        },
        onError: (error) => {
            console.error("Erreur lors de la mise à jour :", error);
            toast({
                title: "Modification",
                description: `Erreur lors de la modification`
            });
        }
    });

    const {
        data: patientData,
        isLoading: isAuthLoading,
    } = useQuery({
        queryKey: ["authenticateMedecin"],
        queryFn: async () => {
            const { patient } = await authenticateMedecin();
            return patient;
        },
        retry: 2,
    });

    const { data: medecins, isLoading } = useQuery<Medecin[]>({
        queryKey: ["medecins"],
        queryFn: async () => {
            const tmp = await fetchAllMedecins();
            return tmp;
        },
        enabled: !!patientData,
        retry: 2,
    });

    useEffect(() => {
        if (patientData) {
            const informationPatient = { ...patientData };
            delete informationPatient.rendez_vous;

            setFormData(informationPatient);
            setOriginalData(informationPatient);
            setModifiedFields({});
        }
    }, [patientData]);

    if (isAuthLoading || isLoading ||!formData) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-[80vh] items-center justify-center">
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.keys(modifiedFields).length != 0){
            mutation.mutate(modifiedFields);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (originalData[name as keyof Patient] !== value) {
            setModifiedFields({
                ...modifiedFields,
                [name]: value,
            });
        } else {
            const { [name]: _, ...rest } = modifiedFields;
            setModifiedFields(rest);
        }
    };

    const handleMedecinChange = (value: string) => {
        setFormData({
            ...formData,
            medecin_perso: value,
        });

        if (originalData.medecin_perso !== value) {
            setModifiedFields({
                ...modifiedFields,
                medecin_perso: value,
            });
        } else {
            const { medecin_perso, ...rest } = modifiedFields;
            setModifiedFields(rest);
        }
    };


    return (
        <DashboardWrapper user={patientData}>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6">
                <h2 className="text-xl font-semibold">Modifier vos informations</h2>

                <div className="flex flex-col">
                    <label htmlFor="nom" className="font-medium text-sm">Nom</label>
                    <Input
                        id="nom"
                        name="nom"
                        value={formData.nom || ""}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="prenom" className="font-medium text-sm">Prénom</label>
                    <Input
                        id="prenom"
                        name="prenom"
                        value={formData.prenom || ""}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="num_secu_sociale" className="font-medium text-sm">Numéro de sécurité sociale</label>
                    <Input
                        id="num_secu_sociale"
                        name="num_secu_sociale"
                        value={formData.num_secu_sociale || ""}
                        onChange={handleChange}
                        placeholder="Votre numéro de sécurité sociale"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-medium text-sm">Email</label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        placeholder="Votre email"
                        type="email"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="medecin_perso" className="font-medium text-sm">Nom de votre médecin</label>
                    <SelecteurMedecin
                        options={medecins}
                        value={formData.medecin_perso}
                        label="Sélectionnez votre médecin"
                        onChange={handleMedecinChange}
                    />
                </div>

                {/* Téléphone */}
                <div className="flex flex-col">
                    <label htmlFor="num_tel" className="font-medium text-sm">Téléphone</label>
                    <Input
                        id="num_tel"
                        name="num_tel"
                        value={formData.num_tel || ""}
                        onChange={handleChange}
                        placeholder="Votre téléphone"
                        type="tel"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-sm">Sexe</label>
                    <div className="flex items-center space-x-4">
                        <div>
                            <label htmlFor="sexe_homme">
                                <input
                                    type="radio"
                                    id="sexe_homme"
                                    name="sexe"
                                    value="homme"
                                    onChange={handleChange}
                                    checked={formData.sexe === "homme"}
                                />
                                Homme
                            </label>
                        </div>
                        <div>
                            <label htmlFor="sexe_femme">
                                <input
                                    type="radio"
                                    id="sexe_femme"
                                    name="sexe"
                                    value="femme"
                                    onChange={handleChange}
                                    checked={formData.sexe === "femme"}
                                />
                                Femme
                            </label>
                        </div>
                        <div>
                            <label htmlFor="sexe_autre">
                                <input
                                    type="radio"
                                    id="sexe_autre"
                                    name="sexe"
                                    value="autre"
                                    onChange={handleChange}
                                    checked={formData.sexe === "autre"}
                                />
                                Autre
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="date_naissance" className="font-medium text-sm">Date de naissance</label>
                    <Input
                        id="date_naissance"
                        name="date_naissance"
                        type="date"
                        value={formData.date_naissance || ""}
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit" className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-4"} disabled={Object.keys(modifiedFields).length === 0 || mutation.isPending}>
                    {mutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
                </Button>
                <Toaster />
            </form>
        </DashboardWrapper>
    );
};
