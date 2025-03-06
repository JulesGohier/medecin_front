import { Separator } from "@/components/ui/separator.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRight, LucideIcon} from "lucide-react";
import { Link } from "react-router";

export type StatCardProps = {
    icon: LucideIcon;
    title: string;
    value: number | string;
};

const StatCard = ({ icon: Icon, title, value }: StatCardProps) => {
    return (
        <Card className="w-full border-2 border-gray-200 mt-5 flex items-center justify-center">
            <CardContent className="py-6 flex flex-col items-center">
                <Icon size={40} className="text-gray-400 mb-4" />
                <div className="flex flex-col items-center">
                    <h2 className="text-gray-400 text-xl mb-2">{title}</h2>
                    <span className="text-xl sm:text-2xl text-black font-bold">{value}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard;