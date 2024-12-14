import React from "react";
import logo from "@/assets/icon-medicine.png";
import {SidebarLayout} from "@/components/features/layout/SidebarLayout.tsx";
import {Button} from "@/components/ui/button.tsx";


const Homepage = () => {
    return (
      <div className="font-sans bg-gray-100">
        {/* En-Tete */}
        <header className="flex items-center justify-between p-4 bg-grey shadow-lg">
        <div className="flex items-center text-2xl font-bold text-red-600">
            <img className="font-bold w-20 h-20" src={logo} alt="Logo"/>Médecine
        </div>
        
          <nav className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-black">Accueil</a>
            <div className="text-gray-600 hover:text-black" >|</div>
            <a href="#" className="text-gray-600 hover:text-black">Médecin</a>
            <div className="text-gray-600 hover:text-black" >|</div>
            <a href="#" className="text-gray-600 hover:text-black">Patient</a>
            <div className="text-gray-600 hover:text-black" >|</div>
            <a href="#" className="text-gray-600 hover:text-black">Notre Équipe</a>
          </nav>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-white bg-red-500 rounded-md">Connexion</button>
            <button className="px-4 py-1 text-white bg-red-500 rounded-md">Inscription</button>
          </div>
        </header>
        
  
      </div>
    );
  };
  
  export default Homepage;