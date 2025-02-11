import { headerConfig } from "@/templates/headerLandingPageConfig.ts";
import { buttonConfig } from "@/templates/buttonLandingPageConfig.ts";

const Header: React.FC = () => {
    return (
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
            >
              {button.label}
            </button>
          ))}
        </div>
      </header>
    );
  };
  
  export default Header;