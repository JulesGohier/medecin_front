import React from "react";
import logo from "@/assets/icon-medicine.png";
import imageSectionProjet from "@/assets/Medecin.png";
import imageSectionMedecin from "@/assets/hide-the-pain-harold-meme.png";
import imageSectionPatient from "@/assets/Patient-Journey-Mapping-cvr.jpg";
import {SidebarLayout} from "@/components/features/layout/SidebarLayout.tsx";
import {Button} from "@/components/ui/button.tsx";


const Homepage = () => {
    return (

      <div className="font-sans bg-gray-100">


        {/* En-Tete */}
        <header className="flex items-center justify-between p-4 bg-grey shadow-lg">

            <div className="flex items-center text-2xl font-bold text-red-600">
                <img className="font-bold w-11 h-11" src={logo} alt="Logo"/>Médecine
            </div>
        
            <nav className="flex gap-4">
                <a href="#SectionProjet" className="text-gray-600 hover:text-black">Accueil</a>
                <div className="text-gray-600 hover:text-black" >|</div>
                <a href="#SectionMedecin" className="text-gray-600 hover:text-black">Médecin</a>
                <div className="text-gray-600 hover:text-black" >|</div>
                <a href="#SectionPatient" className="text-gray-600 hover:text-black">Patient</a>
                <div className="text-gray-600 hover:text-black" >|</div>
                <a href="#" className="text-gray-600 hover:text-black">Notre Équipe</a>
            </nav>
            <div className="flex gap-2">
                <button className="px-4 py-1 text-white bg-red-500 rounded-md">Connexion</button>
                <button className="px-4 py-1 text-white bg-red-500 rounded-md">Inscription</button>
            </div>
        </header>



        {/* Section Projet */}
        <section id="SectionProjet" className="flex flex-col-reverse lg:flex-row items-center p-20 bg-grey-500">

            <div className="w-full lg:w-1/2">
                    <p className="text-lg font-bold text-red-600 mb-4">La gestion d'un cabinet médical</p>
                    <p> Desciption du projet </p>
            </div>
            <div>
                <img className="w-100 h-80 rounded-md " src={imageSectionProjet} alt="imageSectionProjet"/>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Médecin */}
        <section id="SectionMedecin" className="flex flex-col lg:flex-row items-center p-20 bg-gray-50">

            <img className="w-100 h-80 rounded-md" src={imageSectionMedecin} alt="imageSectionMedecin"/>
            <div className="w-full lg:w-1/2 text-right">
                <p className="text-lg font-bold text-red-600 mb-4">Nos Médecins</p>
                <p className="text-lg">Ils sont qualifié</p>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Patient */}
        <section id="SectionPatient" className="flex flex-col-reverse lg:flex-row items-center p-8 bg-white">
            <div className="w-full lg:w-1/2">
                <p className="text-lg font-bold text-red-600 mb-4">Les patients</p>
                <p className="text-lg">Vous avez le droit d'être malade </p>
            </div>
            <img className="w-100 h-80 rounded-md" src={imageSectionPatient} alt="imageSectionPatient"/>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>
  
        
      </div>
    );
  };
  
  export default Homepage;