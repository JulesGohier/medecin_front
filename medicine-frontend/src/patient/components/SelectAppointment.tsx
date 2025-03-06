import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import { useToast } from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";


export const SelectAppointment = ({heure, date, patient, numRpps}: {heure: string, date: string, patient: any, numRpps: string})=> {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const rdvObject = {
        date : `${new Date(date).toISOString().split('.')[0]}+00:00`,
        idMedecin : numRpps,
        idPatient : patient.num_secu_sociale,
        state: "réservé"
    }

    const handClick = () =>{
        setIsOpen(false);
        console.log(rdvObject);
        toast({
            title: "Rendez-vous confirmé",
            description: `Votre rendez-vous pour le ${date} à ${heure} a été confirmé.`
        });
    }



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={"bg-red-500 hover:bg-red-600 hover:text-white text-white"}> {heure}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Votre rendez-vous</DialogTitle>
                </DialogHeader>
                <div className="mt-5 mb-5">
                    <p>Votre rendez-vous est programmé pour le <br /> {date} à {heure}</p>
                </div>
                <DialogFooter>
                    <Button onClick={handClick} className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-2"}>
                        Confirmer le RDV
                    </Button>
                </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
}