import { Bell } from "lucide-react";
import waveLogo from '@/assets/icons/waving-hand.png';

export const Header = () => {
    return (
        <div className="flex items-center w-full">
            <h1 className="text-3xl">Bonjour, Gohier Jules</h1>
            <img
                src={waveLogo}
                width={45}
                alt={"Wave Logo"}
                className="ml-12"
            />
            <div className="relative inline-flex p-2.5 hover:bg-gray-100 transition-all duration-200 rounded-full ml-auto">
                <Bell size={25} />
                <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
                >
                    0
                </span>
            </div>
        </div>
    );
};