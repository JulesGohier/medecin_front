import { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "./Footer";

const Inscription: React.FC = () => {
  const [type, setType] = useState<"patient" | "medecin">("patient");
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
    nom: "",
    prenom: "",
    sexe: "",
    num_tel: "",
    date_naissance: "",
    num_secu_sociale: "",
    email: "",
    num_rpps: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Définir l'endpoint en fonction du type d'utilisateur
    const endpoint = type === "patient" ? "/api/patients" : "/api/medecins";

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Inscription réussie :", response.data);
      // Ici pour rediriger vers une page !!!
    } catch (error) {
      console.error("Erreur d'inscription :")
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>

          <Tabs value={type} onValueChange={(value) => setType(value as "patient" | "medecin")}>
            <TabsList className="flex justify-between mb-4">
              <TabsTrigger value="patient" className="w-full py-2 text-center white text-bg-blue-500 rounded-t-lg hover:white">
                Patient
              </TabsTrigger>
              <TabsTrigger value="medecin" className="w-full py-2 text-center white text-bg-blue-500 rounded-t-lg hover:white">
                Médecin
              </TabsTrigger>
            </TabsList>

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

            {/* Formulaire Médecin */}
            <TabsContent value="medecin">
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
                  name="num_rpps"
                  placeholder="Numéro RPPS"
                  value={formData.num_rpps}
                  onChange={handleInputChange}
                  required
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
