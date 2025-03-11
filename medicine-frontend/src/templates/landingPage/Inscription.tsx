import { useState } from "react";
import { Footer } from "@/templates/landingPage/Footer.tsx";
import { Tabs } from "@/components/ui/tabs";
import { SelectMedecin } from "@/templates/landingPage/SelectMedecin.tsx";
import SexeSelection from "@/templates/landingPage/SexeSelection.tsx";
import { useMutation } from "@tanstack/react-query";
import { registerPatient } from "@/templates/landingPage/actions/landing-action.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { registerPatientType } from "@/templates/patientPage/actions/type.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoaderSpinner } from "@/templates/patientPage/components/LoaderSpinner.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

export function Inscription() {
  const [informationInscription, setInformationInscription] = useState<registerPatientType>({
    password: "",
    email: "",
    nom: "",
    prenom: "",
    sexe: "",
    num_tel: "",
    date_naissance: "",
    num_secu_sociale: "",
    medecin_perso: "",
  });

  const { toast } = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  const validateFields = () => {
    let newErrors: { [key: string]: string } = {};

    if (!informationInscription.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Email invalide";
    }

    if (!informationInscription.num_tel.match(/^\d{10}$/)) {
      newErrors.num_tel = "Numéro de téléphone invalide (10 chiffres)";
    }

    if (!informationInscription.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      newErrors.password = "Mot de passe trop faible (8 caractères, 1 majuscule, 1 chiffre)";
    }

    if (!informationInscription.num_secu_sociale.match(/^\d{15}$/)) {
      newErrors.num_secu_sociale = "Numéro de sécurité sociale invalide (15 chiffres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    if (typeof e === "string") {
      setInformationInscription((prev) => ({ ...prev, sexe: e }));
    } else {
      setInformationInscription((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    register.mutate(informationInscription);
  };

  const register = useMutation({
    mutationFn: async (informationInscription: registerPatientType) => registerPatient(informationInscription),
    onSuccess: () => {
      window.location.href = "/Connexion";
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Erreur d'inscription`,
        description: `${error}`,
      });
    },
  });

  return (
      <>
        <Dialog open={register.isPending}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inscription en cours...</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg">Vous allez être redirigé vers la page de connexion</p>
              <LoaderSpinner />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>

              <Tabs>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <SelectMedecin informationInscription={informationInscription} handleInputChange={handleInputChange} />

                  <input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      value={informationInscription.nom}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      value={informationInscription.prenom}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <SexeSelection handleInputChange={handleInputChange} />

                  <input
                      type="text"
                      name="num_tel"
                      placeholder="Numéro de téléphone"
                      value={informationInscription.num_tel}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  {errors.num_tel && <p className="text-red-500 text-sm">{errors.num_tel}</p>}

                  <input
                      type="date"
                      name="date_naissance"
                      placeholder="Date de naissance"
                      value={informationInscription.date_naissance}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />

                  <input
                      type="text"
                      name="num_secu_sociale"
                      placeholder="Numéro de sécurité sociale"
                      value={informationInscription.num_secu_sociale}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  {errors.num_secu_sociale && <p className="text-red-500 text-sm">{errors.num_secu_sociale}</p>}

                  <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={informationInscription.email}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                  <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={informationInscription.password}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                  <button
                      type="submit"
                      className="p-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition"
                      disabled={register.isPending}
                  >
                    {register.isPending ? "Inscription en cours..." : "S'inscrire"}
                  </button>
                </form>
              </Tabs>
            </div>
          </div>
          <Footer />
          <Toaster/>
        </div>
      </>
  );
}
