
import { Bell } from "lucide-react";
import waveLogo from '@/assets/icons/waving-hand.png';

const HeaderMedecin = ({ user }: { user: any }) => {
    
    
    return (
        <div className="flex items-center w-full sm:justify-between sm:flex-row">
            <div className="flex items-center sm:ml-12">
                <img
                    src={waveLogo}
                    width={50}
                    height={50}
                    alt={"Wave Logo"}
                    className="hidden sm:block"
                />
                <h1 className="text-2xl sm:text-4xl text-center sm:text-left ml-4">Bonjour, Dr {user?.prenom} {user?.nom}</h1>
            </div>
            <div className="relative inline-flex p-2.5 hover:bg-gray-100 transition-all duration-200 rounded-full mt-2 sm:mt-0">
                <Bell size={20} />
                <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-800 rounded-full"
                >
                    0
                </span>
            </div>
        </div>
    );
};

export default HeaderMedecin;