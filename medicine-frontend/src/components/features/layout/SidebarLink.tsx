import React from 'react';
import {Icon, LucideIcon} from "lucide-react";
import {Link} from "react-router";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {

    return (
        <Link to={href} className={"text-[12px] group"}>
            <div className="cursor-pointer flex items-center rounded-lg justify-start px-4 py-2 hover:bg-gray-100 gap-3 transition-colors">
                <Icon className={"h-5 w-5 transition-colors text-gray-700 group-hover:text-red-600"} />
                <span
                    className="block font-medium transition-colors text-gray-700 group-hover:text-red-600"
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default SidebarLink;