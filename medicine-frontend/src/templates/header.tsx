import logo from "@/assets/icon-medicine.png"
import { useState } from "react";

/* Les bouttons */
export interface ButtonConfig {
    label: string;
    className: string;
  }
  
  export const buttonConfig: ButtonConfig[] = [
    { label: "Connexion", className: "bg-red-500 hover:bg-red-600" },
    { label: "Inscription", className: "bg-red-500 hover:bg-red-600" },
  ];
  
/* Le reste du header */
  export interface HeaderConfig {
    title: string;
    logo: string;
  }
  
  export const headerConfig: HeaderConfig = {
      title: "Médecine",
      logo: logo,
  };

const Header: React.FC = () => {

  /* Pour gérer le pop-up de connexion et d'inscription ( ouvrir ou fermer ) */
  const [isLoginModalOpen, setIsLoginModalOpen , ] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); 

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false); 
  };

  // Champs pour la connexion
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Champs pour l'inscription
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fonction pour le formulaire de connexion
  const seConnecter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion avec :", username, password);
    // ASKIP C'EST ICI POUR VERIFIER LA CONNEXION ------------------------------------------------
    closeLoginModal();
  };


  // Fonction pour le formulaire d'inscription
  const inscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Inscription avec :", signupUsername, signupPassword);
    // ASKIP C'EST ICI POUR FAIRE L'INSCRIPTION -------------------------------------------------
    closeSignupModal();
  };


  return (
      
    // Affichage du header
      <>
      <header className="flex items-center justify-between p-4 bg-grey shadow-lg">
        <div className="flex items-center text-2xl font-bold text-red-600">
          <img className="font-bold w-11 h-11" src={headerConfig.logo} alt="Logo" />
          {headerConfig.title}
        </div>

        <div className="flex gap-2">
          {buttonConfig.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-2 text-white rounded-lg shadow-lg transition duration-300 ${button.className}`}
              onClick={button.label === "Connexion" ? openLoginModal : openSignupModal}
            >
              {button.label}
            </button>
          ))}
        </div>
      </header>

      {/* Pop-up pour se connecter */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
            <form onSubmit={seConnecter}>

              {/* Bouton pour le nom d'utilisateur */}
              <div>
                <label htmlFor="username" className="block text-sm mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état
                />
              </div>

              {/* Bouton pour le mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
                />
              </div>

              <div className="flex justify-between">
                {/* Bouton pour fermer le pop-up sans remplir le formulaire */}
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="px-6 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Fermer
                </button>

                {/* Bouton pour submit */}
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pop-up pour s'inscrire */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
            <form onSubmit={inscription}>

              {/* Bouton pour le nom d'utilisateur */}
              <div>
                <label htmlFor="signupUsername" className="block text-sm mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="signupUsername"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)} // Mise à jour de l'état
                />
              </div>

              {/* Bouton pour le mot de passe */}
              <div>
                <label htmlFor="signupPassword" className="block text-sm mb-2">Mot de passe</label>
                <input
                  type="password"
                  id="signupPassword"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)} // Mise à jour de l'état
                />
              </div>

              {/* Bouton pour le second mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-2">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Mise à jour de l'état
                />
              </div>
              <div className="flex justify-between">

                {/* Bouton pour fermer le pop-up sans remplir le formulaire */}
                <button
                  type="button"
                  onClick={closeSignupModal}
                  className="px-6 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Fermer
                </button>

                {/* Bouton pour submit */}
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
  
  export default Header;