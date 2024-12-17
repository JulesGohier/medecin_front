import { Separator } from "@/components/ui/separator.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRight, LucideIcon} from "lucide-react";
import { Link } from "react-router";

export type StatCardProps = {
    icon: LucideIcon;
    title: string;
    value: number | string;
    percentage?: string;
    linkText: string;
    linkTo: string;
};

const StatCard = ({ icon: Icon, title, value, percentage, linkTo }: StatCardProps) => {
    return (
        <Card className="w-full sm:w-1/2 mx-auto mr-0 sm:mr-6 border-2 border-gray-200  mt-5 sm:mt-0 md:mt-0">
            <CardHeader>
                <CardTitle className="text-right w-full text-sm">{percentage}%</CardTitle>
            </CardHeader>
            
            <CardContent className="py-6 flex flex-col sm:flex-row  items-center -mt-4">
                <Icon size={40} className="text-gray-400 mr-0 ml-0 sm:ml-12  sm:mr-12 md:ml-24 md:mr-24" />
                
                <div className="flex flex-col mt-4 sm:mt-0">
                    <h2 className="text-gray-400 text-xl w-18">{title}</h2>
                    <span className="text-xl sm:text-2xl text-black font-bold">{value}</span>
                </div>
            </CardContent>
            
            <Separator className="border bg-gray-200" />
            
            <CardFooter className="bg-[#FBFBFB] py-4 rounded-b-lg">
                <div className="flex flex-row justify-between sm:justify-start items-center">
                    <Link to={linkTo} className="text-red-800 text-sm">
                        Voir les détails
                    </Link>
                    <ArrowRight size={12} className="text-red-800 ml-4" />
                </div>
            </CardFooter>
        </Card>
    );
};

export default StatCard;