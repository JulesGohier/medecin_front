import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    deletePatient,
    fetchAllMedecins,
    updateInformationPatient
} from "@/templates/patientPage/actions/patient-action.ts";
import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { LoaderSpinner } from "@/templates/patientPage/components/LoaderSpinner.tsx";
import { SelecteurMedecin } from "@/templates/patientPage/components/SelecteurMedecin.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import {parseurJSON} from "@/parseurJson.ts";
import {DeletePatientModal} from "@/templates/patientPage/components/modal/DeletePatientModal.tsx";

interface Patient {
    nom?: string;
    prenom?: string;
    num_secu_sociale?: string;
    email?: string;
    medecin_perso?: string;
    num_tel?: string;
    sexe?: string;
    date_naissance?: string;
    password?: string;
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [deleteDialog, setDeleteDialog] = useState(false);
    const { toast } = useToast();

    const {
        data: patientData,
        isLoading: isAuthLoading,
    } = useQuery({
        queryKey: ["patientData"],
        queryFn: async () => {
            return parseurJSON('patient');
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (modifiedFields: Patient) => {
            return await updateInformationPatient(modifiedFields, patientData.num_secu_sociale);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['patientData'] });

            toast({
                title: "Modification",
                description: `Votre information a bien été modifiée !`
            });

            setModifiedFields({});
        },
        onError: (error) => {
            console.error("Erreur lors de la mise à jour :", error);
            toast({
                variant: "destructive",
                title: "Modification",
                description: `Erreur lors de la modification`
            });
        }
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

            console.log(patientData);

            setFormData(informationPatient);
            setOriginalData(informationPatient);
            setModifiedFields({});
        }
    }, [patientData]);

    const validateFields = () => {
        let newErrors: { [key: string]: string } = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof Patient] && key !== 'password' && key !== 'antecedent') {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} est requis`;
            }
        });

        if (formData.email && !formData.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = "Email invalide";
        }

        if (formData.num_tel && !formData.num_tel.match(/^\d{10}$/)) {
            newErrors.num_tel = "Numéro de téléphone invalide (10 chiffres)";
        }

        if (formData.num_secu_sociale && !formData.num_secu_sociale.match(/^\d{15}$/)) {
            newErrors.num_secu_sociale = "Numéro de sécurité sociale invalide (15 chiffres)";
        }

        if (formData.password && formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        }

        setErrors(newErrors);
        console.log(errors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFields()) return;

        if (Object.keys(modifiedFields).length !== 0) {
            mutation.mutate(modifiedFields);
        }
    };

    const handleDelete = async () => {
        if (patientData?.num_secu_sociale) {
            try {
                await deletePatient(patientData.num_secu_sociale);
                window.location.href = "/";
            } catch (error) {
                console.error("Erreur lors de la suppression du patient", error);
            }
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

    if (isAuthLoading || isLoading || !formData) {
        return (
            <DashboardWrapper user={patientData}>
                <div className="flex w-full h-[80vh] items-center justify-center">
                    <LoaderSpinner />
                </div>
            </DashboardWrapper>
        );
    }

    return (
        <DashboardWrapper user={patientData}>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6">
                <h2 className="text-xl font-semibold">Modifier vos informations</h2>

                <div className="flex flex-col">
                    <label htmlFor="nom" className="font-medium text-sm">Nom</label>
                    <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        type="text"
                    />
                    {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="prenom" className="font-medium text-sm">Prénom</label>
                    <Input
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        type="text"
                    />
                    {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="num_secu_sociale" className="font-medium text-sm">Numéro de sécurité sociale</label>
                    <Input
                        id="num_secu_sociale"
                        name="num_secu_sociale"
                        value={formData.num_secu_sociale}
                        onChange={handleChange}
                        placeholder="Votre numéro de sécurité sociale"
                        type="text"
                    />
                    {errors.num_secu_sociale && <p className="text-red-500 text-sm">{errors.num_secu_sociale}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="font-medium text-sm">Email</label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Votre email"
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-medium text-sm">Mot de passe</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Votre nouveau mot de passe"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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


                <div className="flex flex-col">
                    <label htmlFor="num_tel" className="font-medium text-sm">Téléphone</label>
                    <Input
                        id="num_tel"
                        name="num_tel"
                        value={formData.num_tel}
                        onChange={handleChange}
                        placeholder="Votre téléphone"
                        type="tel"
                    />
                    {errors.num_tel && <p className="text-red-500 text-sm">{errors.num_tel}</p>}
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
                        value={formData.date_naissance}
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit" className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-4"} disabled={Object.keys(modifiedFields).length === 0 || mutation.isPending}>
                    {mutation.isPending ? "Modification en cours..." : "Enregistrer les modifications"}
                </Button>
                <Button
                    className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-4"}
                    onClick={() => setDeleteDialog(true)}
                >
                    Supprimer le compte patient
                </Button>
                {deleteDialog && (
                    <DeletePatientModal
                        isOpen={deleteDialog}
                        setIsOpen={setDeleteDialog}
                        num_secu_sociale={patientData?.num_secu_sociale}
                    />
                )}
                <Toaster/>
            </form>
        </DashboardWrapper>
    );
};
