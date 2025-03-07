import { useState, useEffect } from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    authenticateMedecin,
    createNewRDV,
    fetchAllMedecins,
    updateInformationPatient
} from "@/patient/actions/patient-action.ts";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { LoaderSpinner } from "@/patient/components/LoaderSpinner.tsx";
import { SelecteurMedecin } from "@/patient/components/SelecteurMedecin.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

export const PatientSettings = () => {
    // On initialise formData et originalData avec un objet vide
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [modifiedFields, setModifiedFields] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (modifiedFields) => {
            console.log(modifiedFields);
            return await updateInformationPatient(modifiedFields, patientData.num_secu_sociale);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(["medicinAllRdv","nextRDV"]);
            toast({
                title: "Modification",
                description: `Votre information on bien été modifier !`
            });

            setIsOpen(false);
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
        error: authError
    } = useQuery({
        queryKey: ["authenticateMedecin"],
        queryFn: async () => {
            const { patient } = await authenticateMedecin();
            return patient;
        },
        retry: 2,
    });

    const { data: medecins, isLoading, error } = useQuery({
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
                <div className="flex w-full h-screen items-center justify-center">
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }

    if (authError) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="text-red-500">
                    Une erreur est survenue lors de la récupération des données.
                </div>
            </DashboardWrapper>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(modifiedFields).length != 0){
            mutation.mutate(modifiedFields);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setModifiedFields((prev) => {
            if (originalData[name] !== value) {
                return { ...prev, [name]: value };
            } else {
                const { [name]: removed, ...rest } = prev;
                return rest;
            }
        });
    };

    const handleMedecinChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            medecin_perso: value,
        }));

        setModifiedFields((prev) => {
            if (originalData[name] !== value) {
                return { ...prev, [name]: value };
            } else {
                const { [name]: removed, ...rest } = prev;
                return rest;
            }
        });
    };

    console.log()
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

                <Button type="submit" variant="themed" disabled={Object.keys(modifiedFields).length === 0}>
                    {mutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
                </Button>
                <Toaster />
            </form>
        </DashboardWrapper>
    );
};
