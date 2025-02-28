import logo from "@/assets/icon-medicine.png";
import { Link } from 'react-router';

export const headerConfig = {
  title: "Médecine",
  logo: logo,
};

const Header: React.FC = () => {

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-grey shadow-lg">
        <div className="flex items-center text-2xl font-bold text-red-600">
          <img className="w-11 h-11" src={headerConfig.logo} alt="Logo" />
          {headerConfig.title}
        </div>

        <div className="flex gap-2">
          {/* Utilisation de Link pour la navigation interne */}
          <Link
            to="/Connexion"
            className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition duration-300"
          >
            Connexion
          </Link>
          <Link
            to="/Inscription"
            className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition duration-300"
          >
            Inscription
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;