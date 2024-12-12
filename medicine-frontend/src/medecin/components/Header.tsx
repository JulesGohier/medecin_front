import React from "react";
import { Bell } from "lucide-react";
import waveLogo from '@/assets/icons/waving-hand.png';

const Header = () => {
    return (
        <div className="flex items-center w-full">
            <h1 className="text-4xl">Bonjour, Dr Nom Prénom</h1>
            <img
                src={waveLogo}
                width={65}
                height={65}
                alt={"Wave Logo"}
                className="ml-12"
            />
            <div className="relative inline-flex p-2.5 hover:bg-gray-100 transition-all duration-200 rounded-full ml-auto">
                <Bell size={20} />
                <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
                >
                    0
                </span>
            </div>
        </div>
    );
};

export default Header;
