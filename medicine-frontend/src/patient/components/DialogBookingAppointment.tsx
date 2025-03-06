import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingAppointment } from "@/patient/components/BookingAppointment";

export const DialogBookingAppointment = ({patient, numRpps} : {patient :any, numRpps: string}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 w-full flex items-center gap-2 hover:text-white text-white">Prendre un rendez-vous</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <BookingAppointment patient={patient} numRpps={numRpps}/>

            </DialogContent>
        </Dialog>
    )
}