import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {PatientsAppointment} from "@/medecin/components/cards/NextAppointmentCard.tsx";
import {LoaderSpinner} from "@/medecin/components/LoaderSpinner.tsx";
import {useTransitionStore} from "@/medecin/stores/TransitionStore.tsx";
import {DialogTrigger} from "@radix-ui/react-dialog";
import {Calendar, Mail} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router";

export const NextAppointmentModal = ({ firstName, lastName, email, day, hours }: PatientsAppointment) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isPending, startTransition } = useTransitionStore();
    
    
    const handleClick = () => {
        console.log("Transition started");
        startTransition(() => {
            setIsOpen(!isOpen);
            console.log("Transition finished");
        });
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-red-800 hover:bg-red-700 rounded-lg text-white text-sm"
                    onClick={() => {
                        startTransition(handleClick);
                    }}
                >
                    Voir
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rendez vous de {firstName} {lastName}</DialogTitle>
                </DialogHeader>
                <div className="my-2 flex items-center">
                    <Calendar size={20} className={"mr-2"}/>
                    <p>Heure programmé : {day} à {hours.replace(":", 'h')}</p>
                </div>
                <div className="my-2 flex items-center">
                    <Mail size={20} className={"mr-2"}/>
                    <p>Contacter le patient : <Link to={`mailto:${email}`} className={"underline text-red-800 hover:text-red-700"}>{email}</Link></p>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                        onClick={() => {
                            startTransition(handleClick)
                        }}
                    >
                        {isPending ? <LoaderSpinner /> : <>Quitter</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

