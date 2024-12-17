import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {DialogTrigger} from "@radix-ui/react-dialog";
import {Calendar, Mail} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router";

export const NextAppointmentModal = ({ firstName, lastName, email, day, hours }: { firstName: string, lastName: string, email: string, day: string, hours: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleClick = () => {
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-800 hover:bg-red-700 rounded-lg text-white text-sm">
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
                    <Button type="submit" onClick={handleClick}
                            className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}>
                        Quitter
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

