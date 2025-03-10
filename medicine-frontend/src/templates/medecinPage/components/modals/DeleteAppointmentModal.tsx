import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {annulerAppointement, deleteAppointement} from "@/templates/medecinPage/actions/medecin-action.ts";
import {LoaderSpinner} from "@/templates/medecinPage/components/LoaderSpinner.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import React, {useState, useTransition} from "react";



export const DeleteAppointmentModal = ({ children, appointmentId }: { children: React.ReactNode, appointmentId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPendingConfirm, startTransitionConfirm] = useTransition();
    const [isPendingCancel, startTransitionCancel] = useTransition();
    
    const query = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (id: string) => {
            return annulerAppointement(id);
        },
        onSuccess: () => {
            query.invalidateQueries(['patient', 'appointment']);
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirmation Suppression</DialogTitle>
                </DialogHeader>
                <div className="my-2 flex items-center">
                    <Paperclip size={20} className={"mr-2"} />
                    <p>Cliquer sur le bouton pour confirmer la suppression, sinon annuler</p>
                </div>
                
                <DialogFooter>
                    <Button
                        type="submit"
                        className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                        onClick={() => {
                            startTransitionConfirm(() => {
                                handleClickConfirm()
                            });
                        }}
                    >
                        {isPendingConfirm ? <LoaderSpinner /> : <>Confirmer</>}
                    </Button>
                    
                    <Button
                        type="submit"
                        className={"bg-red-800 hover:bg-red-700 w-full flex items-center gap-2"}
                        onClick={() => {
                            startTransitionCancel(() => {
                                closeModal();
                            });
                        }}
                    >
                        {isPendingCancel ? <LoaderSpinner /> : <>Quitter</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
