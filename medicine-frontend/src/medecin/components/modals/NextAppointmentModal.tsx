import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogTrigger, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {LoaderSpinner} from "@/medecin/components/LoaderSpinner.tsx";
import {AppointmentModalProps} from "@/medecin/components/modals/AppointmentModal.tsx";
import {formatDate, formatPhoneNumber} from "@/medecin/format/format.ts";
import {Phone, Calendar} from "lucide-react";
import {useState, useTransition} from "react";

export const NextAppointmentModal = (props : AppointmentModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    const handleClick = () => {
        setIsOpen(false);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-red-800 hover:bg-red-700 rounded-lg text-white text-sm"
                >
                    Voir
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rendez-vous de {props.prenom} {props.nom}</DialogTitle>
                </DialogHeader>
                <div className="my-2 flex items-center">
                    <Calendar size={20} className={"mr-2"}/>
                    <p>Heure programmée : {formatDate(props.appointmentDate)}</p>
                </div>
                <div className="my-2 flex items-center">
                    <Phone size={20} className={"mr-2"}/>
                    <p>Contacter le patient: {formatPhoneNumber(props.num_tel)}</p>
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
                        {isPending ? <LoaderSpinner /> : <>Quitter</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};