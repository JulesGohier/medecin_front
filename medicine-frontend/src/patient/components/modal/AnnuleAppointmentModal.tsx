import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {annuleAppointement, deleteAppointement, updateInformationPatient} from "@/patient/actions/patient-action.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import React, {useState, useTransition} from "react";
import {LoaderSpinner} from "@/patient/components/LoaderSpinner.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";



export const AnnuleAppointmentModal = ({ children, appointmentId }: { children: React.ReactNode, appointmentId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id) => {
            await annuleAppointement({ state: "annulé" }, id);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(["medecinRDV"]);
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


    const closeModal = () => {
        setIsOpen(false);
    };


    const handleClickConfirm = () => {

        mutation.mutate(appointmentId);
        closeModal();
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirmer Annulation</DialogTitle>
                    </DialogHeader>
                    <div className="my-2 flex items-center">
                        <p>Etes-vous sur de vouloir annuler se rendez-vous ?</p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                            onClick={()=>{
                                handleClickConfirm();
                            }}
                        >
                            {mutation.isPending ? "Annulation en cours..." : "Confirmer"}
                        </Button>

                        <Button
                            type="submit"
                            className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                            onClick={() => {
                                closeModal();
                            }}
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