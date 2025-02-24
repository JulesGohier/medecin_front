import React from "react";
import DiscordIcon from "@/assets/discord-icon-svgrepo-com.svg";
import logo from "@/assets/icon-medicine.png";
import { Twitter, Github } from "lucide-react";
import imageSectionPatient from "@/assets/Patient-Journey-Mapping-cvr.jpg";
import {SidebarLayout} from "@/components/features/layout/SidebarLayout.tsx";
import {Button} from "@/components/ui/button.tsx";

import Header from "./Header";
import Footer from "./Footer";
import LesBox from "./BoxLandingPage";

const Homepage = () => {
    return (

      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">

        {/* En-Tete */}
            <Header/>



        {/* Section Principale */}
        <section id="SectionProjet" className="flex flex-col-reverse lg:flex-row items-center p-20 bg-gray-200">

            <div className="w-full lg:w-1/2">
                    <p className="text-2xl font-bold text-black mb-4 mr-auto pr-16">Simplifiez vos rendez-vous médicaux</p>
                    <p>
                        Gérer facilement vos rendez-vous en ligne avec seulement quelque clics !
                        <br></br>
                        Vous avez juste à vous connecter pour accèder à vos informations                    
                    </p>
            </div>

            <div w-full className="lg:w-1/2 flex justify-end">
                <img className="w-100 h-150 rounded-md ml-auto shadow-L" src={imageSectionPatient} alt="imageSectionPatient"/>
            </div>

        </section>
        <div className="bg-gray-100">
            <hr className="border-t-2 border-gray-500 w-3/4 mx-auto" />
        </div>

        {/* Section Description */}
        <div className="p-4">
            <p className="text-2xl text-center font-bold text-black p-4">
                Les principaux avantages :
            </p>
            <LesBox/>
        </div>
  


        {/* footer */}
            <Footer/>



      </div>
    );
  };
  
  export default Homepage;