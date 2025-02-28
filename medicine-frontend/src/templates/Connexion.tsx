import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const Connexion: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  const [errorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/login_token", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        
        localStorage.setItem("authToken", response.data.token); // Sauvegarder le token d'authentification

        // Ici pour rediriger vers une page !!!
        
      }
    } catch (error) {
      console.error("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow bg-gray-100 py-6">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>

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

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Connexion;
