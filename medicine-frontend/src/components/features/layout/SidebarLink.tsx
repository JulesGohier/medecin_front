import {
    LucideIcon
} from "lucide-react";
import {Link} from "react-router";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {

    return (
        <Link to={href} className={"text-xl"}>
            <div className="cursor-pointer flex items-center  rounded-lg justify-start px-4 py-2 hover:bg-gray-100 hover:border-gray-700 gap-3 transition-colors">
                <Icon className={"h-5 w-5 transition-colors text-gray-700"} />
                <span
                    className="block font-medium transition-colors text-gray-700"
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default SidebarLink;