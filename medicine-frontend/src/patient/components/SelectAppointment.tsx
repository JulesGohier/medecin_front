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
import {createNewRDV, fetchMedecinsRDV} from "@/patient/actions/patient-action.ts";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const SelectAppointment = ({heure, date, patient, numRpps}: {heure: string, date: string, patient: any, numRpps: string})=> {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();


    const dateRDV = new Date(date);
    const year = dateRDV.getFullYear();
    const month = dateRDV.getMonth()+1;
    const day = dateRDV.getDate();

    const rdvObject = {
        "date": `${year}-${month}-${day}T${heure}:00+00:00`,
        "idMedecin": `api/medecins/${numRpps}`,
        "idPatient": `api/patients/${patient.num_secu_sociale}`,
        "state": "réservé"
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => await createNewRDV(rdvObject),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["medicinAllRdv", numRpps]);

            toast({
                title: "Rendez-vous confirmé",
                description: `Votre rendez-vous pour le ${date} à ${heure} a été confirmé.`
            });

            setIsOpen(false);
        },
        onError: () => {
            console.log("Error");
            toast({
                title: "Erreur lors de la réservation",
                description: `Veuillez recommencer.`
            });
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={"bg-red-500 hover:bg-red-600 hover:text-white text-white w-14"}> {heure}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Votre rendez-vous</DialogTitle>
                </DialogHeader>
                <div className="mt-5 mb-5">
                    <p>Votre rendez-vous est programmé pour le <br /> {date} à {heure}</p>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => mutation.mutate()}
                        className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-4"}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Réservation..." : "Confirmer le RDV"}
                    </Button>
                </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
}
