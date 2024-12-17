import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {DialogTrigger} from "@radix-ui/react-dialog";
import {Calendar} from "lucide-react";
import {useState} from "react";

export const NextAppointmentModal = ({ firstName, lastName, day, hours }: { firstName: string, lastName: string, day: string, hours: string }) => {
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
                <div className="mt-5 mb-5 flex">
                    <Calendar size={20} className={"mr-2"} />
                    <p>Heure programmé : {day} à {hours}</p>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleClick} className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}>
                        Quitter
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

