import { Button } from "@/components/ui/button.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {deletePatient} from "@/templates/patientPage/actions/patient-action.ts";

interface DeletePatientModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    num_secu_sociale: string;
}

export const DeletePatientModal: React.FC<DeletePatientModalProps> = ({ isOpen, setIsOpen, num_secu_sociale }) => {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deletePatient(num_secu_sociale);
            setIsOpen(false);
            window.location.href = "/";
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Erreur lors de la suppression du patient.",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 w-full flex items-center gap-4">
                    Supprimer le compte patient
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6">
                <DialogTitle className="text-xl font-semibold">Êtes-vous sûr ?</DialogTitle>
                <DialogDescription className="mb-4">
                    Vous êtes sur le point de supprimer définitivement ce compte. Cette action est irréversible.
                </DialogDescription>
                <DialogFooter className="flex justify-end mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400"
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
