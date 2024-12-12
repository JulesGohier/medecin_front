import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ArrowRight, CalendarCheck, User} from "lucide-react";
import {Link} from "react-router";

const AppointmentsCard = () => {
    return (
        <Card className="w-1/3 mr-96 border-2 border-gray-200">
            <CardHeader>
                <CardTitle className="text-right w-full">+3%</CardTitle>
            </CardHeader>
            <CardContent className="py-11 flex flex-row items-center px-20 -mt-12">
                <CalendarCheck size={60} className={"text-gray-400 p-2 border-2 border-gray-200 rounded-lg"} />
                <div className={"flex flex-col ml-44"}>
                    <h2 className={"text-gray-400 text-3xl"}>Rendez-vous</h2>
                    <span className={"text-3xl text-black font-bold"}>27</span>
                </div>
            </CardContent>
            <CardFooter className="bg-[#FBFBFB] py-5 border-2 border-gray-200 rounded-b-lg">
                <div className="flex flex-row items-center">
                    <Link to={"/appointments"} className="text-red-800">Voir les détails</Link>
                    <ArrowRight size={14} className="text-red-800 ml-6" />
                </div>
            </CardFooter>
        </Card>
    );
};

export default AppointmentsCard;