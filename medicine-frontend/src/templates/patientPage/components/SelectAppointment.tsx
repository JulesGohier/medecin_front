import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { createNewRDV, fetchRDVPatient } from "@/templates/patientPage/actions/patient-action.ts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "@/templates/patientPage/components/format.ts";

export const SelectAppointment = ({ heure, date, numSecuSocial, numRpps }: { heure: string, date: string, numSecuSocial: string, numRpps: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const {
        data: patientAllRdv,
        isLoading: isPatientLoading,
    } = useQuery({
        queryKey: ["patientAllRdv"],
        queryFn: async () => {
            return await fetchRDVPatient(patient.num_secu_sociale);
        },
    });

    const dateRDV = new Date(date);
    const formattedDate = formatDate(`${dateRDV}`,"short")

    const year = dateRDV.getFullYear();
    const month = dateRDV.getMonth() + 1;
    const day = dateRDV.getDate();

    const rdvObject = {
        "date": `${year}-${month}-${day}T${heure}:00+00:00`,
        "idMedecin": `api/medecins/${numRpps}`,
        "idPatient": `api/patients/${numSecuSocial}`,
        "state": "réservé"
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const isAlreadyReserved = patientAllRdv
                ?.filter((rdv: any) => rdv.state !== "annulé")
                .some((rdv: any) => {
                    const existingRdvDate = new Date(rdv.date).toLocaleString("fr-FR", { timeZone: "UTC" });
                    const targetRdvDate = new Date(`${date} ${heure}`).toLocaleString("fr-FR");
                    console.log(existingRdvDate, targetRdvDate);
                    return existingRdvDate === targetRdvDate;
                });

            if(isAlreadyReserved){
                setIsOpen(false);
                throw new Error("Vous avez déjà un rendez-vous à cette date et heure.");
            }


            return await createNewRDV(rdvObject);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["medicinAllRdv"] });
            await queryClient.invalidateQueries({ queryKey: ["nextRDV"] });

            toast({
                title: "Rendez-vous confirmé",
                description: `Votre rendez-vous pour le ${date} à ${heure} a été confirmé.`
            });

            setIsOpen(false);
        },
        onError: (error: any) => {
            toast({
                title: "Erreur lors de la réservation",
                description: error.message || `Veuillez recommencer.`
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
};
