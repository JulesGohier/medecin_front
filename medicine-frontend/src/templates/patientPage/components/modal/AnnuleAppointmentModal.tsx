import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {annuleAppointement} from "@/templates/patientPage/actions/patient-action.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";



export const AnnuleAppointmentModal = ({ children, appointmentId }: { children: React.ReactNode, appointmentId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            await annuleAppointement({state: "annulé", annule_par: "medecin"}, id);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['patientAllRdv'] });

            toast({
                title: "Modification",
                description: "Votre rendez-vous a bien été annulé !",
            });

            setIsOpen(false);
        },
        onError: () => {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'annulation du rendez-vous.",
            });
        }
    });

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer l'annulation</DialogTitle>
                    </DialogHeader>
                    <div className="my-2 flex items-center">
                        <p>Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est irréversible.</p>
                    </div>

                    <DialogFooter className={"gap-3"}>
                        <Button
                            className={"bg-red-500 hover:bg-red-600 w-full flex items-center"}
                            onClick={() => {mutation.mutate(appointmentId)}}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Annulation en cours..." : "Confirmer l'annulation"}
                        </Button>

                        <Button
                            variant={"outline"}
                            className={"w-full flex items-center bg-gray-300 hover:bg-gray-400"}
                            onClick={() => {setIsOpen(false)}}
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