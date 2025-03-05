import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { Tabs  } from "@/components/ui/tabs";

// Type medecin
type Medecin = {
  num_rpps: string;
  nom: string;
  prenom: string;
};

const SelectMedecin: React.FC<{ formData: any; handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }> = ({ formData, handleInputChange }) => {
  const [medecins, setMedecins] = useState<Medecin[]>([]);

  // Récupérer les médecins depuis l'API
  axios.get("http://localhost:9000/api/medecins")
    .then((res) => {
      setMedecins(Array.isArray(res.data.member) ? res.data.member : []);
    })
    .catch((err) => {
      console.error("Erreur API :", err);
    });

  {/* Pour le menu déroulant des médecins */}
  return (
    <select
      className="p-2 w-full border border-gray-300 rounded"
      name="num_rpps"
      value={formData.num_rpps}
      onChange={handleInputChange}
    >
      <option value="">Sélectionnez un médecin</option>
      {medecins.map((med) => (
        <option key={med.num_rpps} value={med.num_rpps}>
          {med.nom} {med.prenom}
        </option>
      ))}
    </select>
  );
};

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
    num_rpps: "",
  });

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour envoyer les données d'inscription
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      type: "patient",
      username: formData.username,
      password: formData.password,
      num_rpps: formData.num_rpps,
      nom: formData.nom,
      prenom: formData.prenom,
      sexe: formData.sexe.toLowerCase(),
      num_tel: formData.num_tel,
      date_naissance: formData.date_naissance,
      num_secu_sociale: formData.num_secu_sociale,
      email: formData.email,
    };

    const url = "http://localhost:9000/api/register/patient";

    console.log("Données envoyées :", dataToSend);

    try {
      const response = await axios.post(url, dataToSend);
      console.log(response.data);
      window.location.href = "/Connexion"; // Redirection en cas de succès
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>

          <Tabs>
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
                className="p-2 w-full border borer-gray-300 rounded"
              />

              {/* Sélecteur du médecin */}
              <SelectMedecin formData={formData} handleInputChange={handleInputChange} />

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
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inscription;
