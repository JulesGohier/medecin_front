import React from "react";
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
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
                <a href="#SectionEquipe" className="text-gray-600 hover:text-black">Notre Équipe</a>
            </nav>
            <div className="flex gap-2">
                <button className="px-4 py-1 text-white bg-red-500 rounded-md">Connexion</button>
                <button className="px-4 py-1 text-white bg-red-500 rounded-md">Inscription</button>
            </div>
        </header>



        {/* Section Projet */}
        <section id="SectionProjet" className="flex flex-col-reverse lg:flex-row items-center p-20 bg-grey-500">

            <div className="w-full lg:w-1/2">
                    <p className="text-lg font-bold text-red-600 mb-4 mr-auto pr-16">La gestion d'un cabinet médical</p>
                    <p> Desciption du projet </p>
            </div>
            <div>
                <img className="w-100 h-80 rounded-md ml-auto pr-16" src={imageSectionProjet} alt="imageSectionProjet"/>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Médecin */}
        <section id="SectionMedecin" className="flex flex-col lg:flex-row items-center p-20 bg-gray-50">

            <img className="w-100 h-80 rounded-md mr-auto pr-16" src={imageSectionMedecin} alt="imageSectionMedecin"/>
            <div className="w-full lg:w-1/2 text-right ml-auto pr-16">
                <p className="text-lg font-bold text-red-600 mb-4">Nos Médecins</p>
                <p className="text-lg">Ils sont qualifié</p>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Patient */}
        <section id="SectionPatient" className="flex flex-col-reverse lg:flex-row items-center p-8 bg-white">
            <div className="w-full lg:w-1/2 mr-auto pr-16">
                <p className="text-lg font-bold text-red-600 mb-16">Les patients</p>
                <p className="text-lg">Vous avez le droit d'être malade </p>
            </div>
            <img className="w-100 h-80 rounded-md ml-auto pr-4" src={imageSectionPatient} alt="imageSectionPatient"/>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>
  
        

        {/* Section Équipe */}


        <section id="SectionEquipe" className="p-8 bg-gray-50">
            <h2 className="text-center text-2xl font-bold mb-6">Équipe</h2>

            <div className="flex justify-center gap-12">

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                <img
                    src={"https://avatars.githubusercontent.com/u/117635603?v=4"}
                    alt="Nom 1"
                    className="w-40 h-40 rounded-full object-cover"
                />
                </div>
                <p className="font-bold text-gray-700">CAFFIER Lilian</p>
                <p className="text-xs text-red-500">lilian.caffier@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/LilianCAFFIER" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-gray-600 hover:text-black" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={"https://avatars.githubusercontent.com/u/100484696?v=4"}
                    alt="Nom 2"
                    className="w-40 h-40 rounded-full object-cover"
                />
                </div>
                <p className="font-bold text-gray-700">GOHIER Jules</p>
                <p className="text-xs text-red-500">jules.gohier@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/JulesGohier" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-gray-600 hover:text-black" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={""}
                    alt="Nom 3"
                    className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-700">TIRBOIS Romain</p>
                <p className="text-xs text-red-500">romain.tirbois@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-gray-600 hover:text-black" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={"https://avatars.githubusercontent.com/u/104348335?v=4"}
                    alt="Nom 4"
                    className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-700">KERHERVE Thomas</p>
                <p className="text-xs text-red-500">thomas.kerherve@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/ThomasKERHERVE" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-600 hover:text-black" />
                    </a>
                    <a href="https://x.com/PouletBlanc00" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-600 hover:text-black" />
                    </a>
                    <a  title="poulet_blanc" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-gray-600 hover:text-black" />
                    </a>
                </div>
            </div>

            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>






      </div>
    );
  };
  
  export default Homepage;