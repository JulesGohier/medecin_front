import React from "react";
import DiscordIcon from "@/assets/discord-icon-svgrepo-com.svg";
import logo from "@/assets/icon-medicine.png";
import { Twitter, Github } from "lucide-react";
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

                <img className="font-bold w-11 h-11" src={logo} alt="Logo"/> Médecine
                
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
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"> Connexion </button>
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"> Inscription </button>
            </div>
        </header>



        {/* Section Projet */}
        <section id="SectionProjet" className="flex flex-col-reverse lg:flex-row items-center p-20 bg-grey">

            <div className="w-full lg:w-1/2">
                    <p className="w-100 h-150 text-lg font-bold text-red-600 mb-4 mr-auto pr-16">application de gestion de cabinet médical</p>
                    <p> Cette application permettra : <br></br>
                            - Aux patients de consulter les créneaux disponibles et de réserver un rendez-vous. <br></br>
                            - Au médecin de visualiser la liste des rendez-vous programmés pour la journée.</p>
            </div>
            <div w-full className="lg:w-1/2 flex justify-end">
                <img className="h-300 items-right rounded-md shadow-sm" src={imageSectionProjet} alt="imageSectionProjet"/>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Médecin */}
        <section id="SectionMedecin" className="flex flex-col lg:flex-row items-center p-20 bg-gray-200">

            <img className="w-100 h-150 rounded-md mr-auto pr-16 shadow-md" src={imageSectionMedecin} alt="imageSectionMedecin"/>
            <div className="w-full lg:w-1/2 text-right ml-auto">
                <p className="text-lg font-bold text-red-600 mb-4">Nos Médecins</p>
                <p className="text-lg">
                    Ils sont qualifié<br></br>
                    - Visualiser la liste des rendez-vous du jour (nom du patient, horaire, état). <br></br>
                    - Créer manuellement les créneaux disponibles avec une durée de 20 minutes
                </p>
            </div>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>





        {/* Section Patient */}
        <section id="SectionPatient" className="flex flex-col-reverse lg:flex-row items-center p-8 bg-grey">
            <div className="w-full lg:w-1/2 mr-auto pr-16">
                <p className="text-lg font-bold text-red-600 mb-16">Les patients</p>
                <p className="text-lg">
                    - Réserver un créneau parmi les disponibilités proposées. <br></br>
                    - Annuler un rendez-vous existant
                </p>
            </div>
            <img className="w-100 h-150 rounded-md ml-auto shadow-sm" src={imageSectionPatient} alt="imageSectionPatient"/>
        </section>
        <div>
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>
  
        

        {/* Section Équipe */}

        <section id="SectionEquipe" className="p-8 bg-gray-200">
            <h2 className="text-center text-2xl font-bold mb-6">Équipe</h2>

            <div className="flex justify-center gap-12">

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                <img
                    src={"https://avatars.githubusercontent.com/u/117635603?v=4"}
                    alt="CAFFIER Lilian"
                    className="w-40 h-40 rounded-full object-cover"
                />
                </div>
                <p className="font-bold text-gray-700">CAFFIER Lilian</p>
                <p className="text-xs text-red-500">lilian.caffier@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/LilianCAFFIER" target="_blank" rel="noopener noreferrer">
                        <Github size={32} className="text-gray-800 hover:text-gray-600" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter size={32} className="text-sky-500 hover:text-sky-700" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={"https://avatars.githubusercontent.com/u/100484696?v=4"}
                    alt="GOHIER Jules"
                    className="w-40 h-40 rounded-full object-cover"
                />
                </div>
                <p className="font-bold text-gray-700">GOHIER Jules</p>
                <p className="text-xs text-red-500">jules.gohier@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/JulesGohier" target="_blank" rel="noopener noreferrer">
                        <Github size={32} className="text-gray-800 hover:text-gray-600" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter size={32} className="text-sky-500 hover:text-sky-700" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={"https://avatars.githubusercontent.com/u/112930218?v=4"}
                    alt="TIRBOIS Romain"
                    className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-700">TIRBOIS Romain</p>
                <p className="text-xs text-red-500">romain.tirbois@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/RomainTrbs" target="_blank" rel="noopener noreferrer">
                        <Github size={32} className="text-gray-800 hover:text-gray-600" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter size={32} className="text-sky-500 hover:text-sky-700" />
                    </a>
                </div>
            </div>

            
            <div className="w-40 text-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full mb-2">
                    <img
                    src={"https://avatars.githubusercontent.com/u/104348335?v=4"}
                    alt="KERHERVE Thomas"
                    className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-700">KERHERVE Thomas</p>
                <p className="text-xs text-red-500">thomas.kerherve@etud.univ-angers.fr</p>

                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/ThomasKERHERVE" target="_blank" rel="noopener noreferrer">
                        <Github size={32} className="text-gray-800 hover:text-gray-600" />
                    </a>
                    <a href="https://x.com/PouletBlanc00" target="_blank" rel="noopener noreferrer">
                        <Twitter size={32} className="text-sky-500 hover:text-sky-700" />
                    </a>
                </div>
            </div>

            </div>
        </section>


        {/* footer */}

        <footer className="p-4 bg-gray-800 text-white text-center">
            <p>© 2024 Médecine. Tous droits réservés.</p>
        </footer>






      </div>
    );
  };
  
  export default Homepage;