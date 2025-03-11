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
import {createNewRDV} from "@/templates/patientPage/actions/patient-action.ts";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const SelectAppointment = ({heure, date, patient, numRpps}: {heure: string, date: string, patient: any, numRpps: string})=> {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();


    const dateRDV = new Date(date);
    const formattedDate = dateRDV.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

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
            await queryClient.invalidateQueries({queryKey: ["medicinAllRdv"]});
            await queryClient.invalidateQueries({queryKey: ["nextRDV"]});

            toast({
                title: "Rendez-vous confirmé",
                description: `Votre rendez-vous pour le ${date} à ${heure} a été confirmé.`
            });

            setIsOpen(false);
        },
        onError: () => {
            toast({
                title: "Erreur lors de la réservation",
                description: `Veuillez recommencer.`
            });
        }
    });

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className={"bg-red-500 hover:bg-red-600 w-14"}>{heure}</Button>
                </DialogTrigger>
                <DialogContent className="z-[99999] pointer-events-auto">
                    <DialogHeader>
                        <DialogTitle>Confirmation de votre rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="mt-5 mb-5">
                        <p>
                            Vous avez un rendez-vous prévu pour le <strong>{formattedDate}</strong> à <strong>{heure}</strong>.
                            <br />
                            Veuillez confirmer si vous êtes disponible à ce moment.
                        </p>
                    </div>
                    <DialogFooter className={"gap-3"}>
                        <Button
                            onClick={() => mutation.mutate()}
                            className={"bg-red-500 hover:bg-red-600 w-full flex items-center"}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Confirmer..." : "Confirmer le rendez-vous"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className={"w-full flex items-center bg-gray-300 hover:bg-gray-400"}
                            disabled={mutation.isPending}
                        >
                            Annuler
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster />
        </>
    );
}