import {cn} from "@/lib/utils.ts";
import {Loader2} from "lucide-react";

export const LoaderSpinner = ({ size, className } : { size?: number, className?: string }) => {
    return <Loader2 className={cn('animate-spin', className)} size={size} />
}
