import {cn} from "@/lib/utils.ts";
import {LucideIcon} from "lucide-react";

export const TableActions = ({ icon: Icon, size, className }: {  icon: LucideIcon, size?: number, className?: string }) => {
    return <Icon className={cn("cursor-pointer", className)} size={size ? size : 20} />
};

