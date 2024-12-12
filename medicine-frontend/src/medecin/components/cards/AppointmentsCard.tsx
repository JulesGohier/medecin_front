import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ArrowRight} from "lucide-react";

const AppointmentsCard = () => {
    return (
        <Card className="w-1/2 mr-16">
            <CardHeader>
                <CardTitle>Rendez-Vous</CardTitle>
            </CardHeader>
            <CardContent>
                Test
            </CardContent>
            <CardFooter className={"bg-[#FBFBFB] py-5"}>
                <div className={"flex flex-row items-center"}>
                    <p className={"text-red-800"}>
                        Voir les détails
                    </p>
                    <ArrowRight size={14} className="text-red-800 ml-6" />
                </div>
            </CardFooter>
        </Card>
    );
};

export default AppointmentsCard;