import { Separator } from "@/components/ui/separator.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router";

const AppointmentsCard = ({ className }: { className?: string }) => {
    return (
        <Card
            className={cn(
                "w-1/2 mx-auto mr-0 md:mr-6 border-2 border-gray-200",
                className
            )}
        >
            <CardHeader>
                <CardTitle className="text-right w-full text-sm">+3%</CardTitle>
            </CardHeader>
            <CardContent className="py-6 flex flex-col sm:flex-row items-center px-6 sm:px-12 -mt-4">
                <CalendarCheck
                    size={50}
                    className={"text-gray-400 p-1 border-2 border-gray-200 rounded-lg"}
                />
                <div className={"flex flex-col mt-4 sm:mt-0 sm:ml-8 md:ml-16"}>
                    <h2 className={"text-gray-400 text-xl sm:text-2xl"}>Rendez-Vous</h2>
                    <span className={"text-xl sm:text-2xl text-black font-bold"}>300</span>
                </div>
            </CardContent>
            <Separator className="border bg-gray-200" />
            <CardFooter className="bg-[#FBFBFB] py-4 rounded-b-lg">
                <div className="flex flex-row justify-between sm:justify-start items-center">
                    <Link to={"/patients"} className="text-red-800 text-sm">
                        Voir les détails
                    </Link>
                    <ArrowRight size={12} className="text-red-800 ml-4" />
                </div>
            </CardFooter>
        </Card>
    );
};

export default AppointmentsCard;