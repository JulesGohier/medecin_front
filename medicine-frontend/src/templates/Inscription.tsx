import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const Inscription: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
    email: "",
    nom: "",
    prenom: "",
    sexe: "",
    num_tel: "",
    date_naissance: "",
    num_secu_sociale: "",
    num_rpps: "", // Seulement pour les médecins
  });

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour envoyer les données d'inscription
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let dataToSend: any;
    
    dataToSend = {
        type: "patient",
        username: formData.username,
        password: formData.password,
        nom: formData.nom,
        prenom: formData.prenom,
        sexe: formData.sexe.toLowerCase(),
        num_tel: formData.num_tel,
        date_naissance: formData.date_naissance,
        num_secu_sociale: formData.num_secu_sociale,
        email: formData.email,
      };

    let url = "http://localhost:9000/api/register/patient";

    console.log("Données envoyées :", dataToSend);

    try {
      const response = await axios.post(url, dataToSend);
      console.log(response.data);
      window.location.href = "/Connexion"; // Envoie vers la page de connection si c'est bon
      } catch (error) {
      console.error("Erreur lors de l'inscription:");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>

          <Tabs>
            {/* Formulaire Patient */}
            <TabsContent value="patient">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="rpps_medecin"
                  name="rpps_medecin"
                  placeholder="rpps_medecin"
                  value={formData.rpps_medecin}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="sexe"
                  placeholder="Sexe"
                  value={formData.sexe}
                  onChange={handleInputChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="num_tel"
                  placeholder="Numéro de téléphone"
                  value={formData.num_tel}
                  onChange={handleInputChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="date"
                  name="date_naissance"
                  placeholder="Date de naissance"
                  value={formData.date_naissance}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="num_secu_sociale"
                  placeholder="Numéro de sécurité sociale"
                  value={formData.num_secu_sociale}
                  onChange={handleInputChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  S'inscrire
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Inscription;