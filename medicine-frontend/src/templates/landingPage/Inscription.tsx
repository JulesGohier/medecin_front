import { useState } from "react";
import {Footer} from "@/templates/landingPage/Footer.tsx";
import { Tabs  } from "@/components/ui/tabs";
import {SelectMedecin} from "@/templates/landingPage/SelectMedecin.tsx";
import SexeSelection from "@/templates/landingPage/SexeSelection.tsx";
import {useMutation} from "@tanstack/react-query";
import {registerPatient} from "@/templates/landingPage/actions/landing-action.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {registerPatientType} from "@/templates/patientPage/actions/type.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {LoaderSpinner} from "@/templates/patientPage/components/LoaderSpinner.tsx";

export function Inscription () {
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
  const {toast} = useToast();

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    console.log(informationInscription);
    if (typeof e === "string") {
      // Cas spécial pour RadioGroup de ShadCN (e est directement la valeur)
      setInformationInscription((prev) => ({...prev, sexe: e}));
    } else {
      // Cas général pour les champs de formulaire normaux
      setInformationInscription((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
  };


  // Fonction pour envoyer les données d'inscription
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(informationInscription);
    register.mutate(informationInscription)
  };

  const register = useMutation({
    mutationFn: async (informationInscription: registerPatientType) => registerPatient(informationInscription),
    onSuccess: () => {
      window.location.href = "/Connexion";
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Connexion erreur`,
        description: `${error.message}`
      });
    }
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
              <LoaderSpinner/>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>

              <Tabs>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <SelectMedecin informationInscription={informationInscription} handleInputChange={handleInputChange}/>

                  <input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      value={setInformationInscription?.nom}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      value={setInformationInscription.prenom}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <SexeSelection handleInputChange={handleInputChange}/>
                  <input
                      type="text"
                      name="num_tel"
                      placeholder="Numéro de téléphone"
                      value={setInformationInscription.num_tel}
                      onChange={handleInputChange}
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="date"
                      name="date_naissance"
                      placeholder="Date de naissance"
                      value={setInformationInscription.date_naissance}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="text"
                      name="num_secu_sociale"
                      placeholder="Numéro de sécurité sociale"
                      value={setInformationInscription.num_secu_sociale}
                      onChange={handleInputChange}
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={setInformationInscription.email}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border border-gray-300 rounded"
                  />
                  <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={setInformationInscription.password}
                      onChange={handleInputChange}
                      required
                      className="p-2 w-full border borer-gray-300 rounded"
                  />
                  <button type="submit" className="p-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition"
                          disabled={register.isPending}>
                    {register.isPending ? "Inscription en cours..." : "S'inscrire"}
                  </button>
                </form>
              </Tabs>
            </div>
          </div>
          <Footer/>
        </div>
      </>
  );
}