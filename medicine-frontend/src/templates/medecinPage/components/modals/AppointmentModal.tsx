import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Patient} from "@/templates/medecinPage/components/cards/NextAppointmentCard.tsx";
import {LoaderSpinner} from "@/templates/medecinPage/components/LoaderSpinner.tsx";
import {formatDate} from "@/templates/medecinPage/format/format.ts";
import {Calendar, NotebookText, User} from "lucide-react";
import React, {useState, useTransition} from "react";

export interface AppointmentModalProps {
    children?: React.ReactNode;
    patientData: Patient;
    appointment: Appointment
}

export interface Appointment {
    appointmentDate: string;
    appointmentState: string;
}

export const AppointmentModal = (props: AppointmentModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    const handleClick = () => {
        setIsOpen(false);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Récapitulatif du rendez-vous</DialogTitle>
                </DialogHeader>
                <div className="my-2 flex items-center">
                    <Calendar size={20} className={"mr-2"}/>
                    <p>Date : {formatDate(props.appointment?.appointmentDate)}</p>
                </div>
                <div className="my-2 flex items-center">
                    <User size={20} className={"mr-2"}/>
                    <h2>Prénom, Nom : {props.patientData.prenom} {props.patientData.nom}</h2>
                </div>
                <div className="my-2 flex items-center">
                    <NotebookText size={20} className={"mr-2"}/>
                    <h2>État: {props.appointment?.appointmentState}</h2>
                </div>
                
                <DialogFooter>
                    <Button
                        type="submit"
                        className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                        onClick={() => {
                            startTransition(() => {
                                handleClick();
                            });
                        }}
                    >
                        {isPending ? <LoaderSpinner/> : <>Quitter</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

