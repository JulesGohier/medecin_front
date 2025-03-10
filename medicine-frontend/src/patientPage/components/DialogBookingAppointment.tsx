import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {BookingAppointment} from "@/patientPage/components/BookingAppointment.tsx";

export function DialogBookingAppointment({ patient, numRpps }: { patient: any, numRpps: any }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDialog = () => setIsOpen(!isOpen);


    return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild className={"w-full"}>
                    <Button
                        className="bg-red-500 hover:bg-red-600 flex items-center gap-2 hover:text-white text-white"
                        onClick={toggleDialog}
                    >
                        Prendre un rendez-vous
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-[1000px] h-auto rounded-md p-4 flex flex-col justify-center items-center">
                    <DialogHeader>
                        <DialogTitle>{`\u00A0`}</DialogTitle>
                    </DialogHeader>

                    <BookingAppointment patient={patient} numRpps={numRpps} className="w-full"/>
                </DialogContent>
            </Dialog>
    );
}