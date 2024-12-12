import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link to={href} className="text-xl">
            <div
                className={`cursor-pointer flex items-center rounded-lg justify-start px-4 py-2 gap-3 transition-colors ${
                    isActive
                        ? "bg-gray-100 border-gray-700 text-gray-900"
                        : "hover:bg-gray-100 text-gray-700"
                }`}
            >
                <Icon
                    className={`h-5 w-5 transition-colors ${
                        isActive ? "text-gray-900" : "text-gray-700"
                    }`}
                />
                <span
                    className={`block font-medium transition-colors ${
                        isActive ? "text-gray-900" : "text-gray-700"
                    }`}
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default SidebarLink;
