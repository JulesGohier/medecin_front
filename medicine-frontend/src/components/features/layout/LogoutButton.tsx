import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 w-full flex items-center gap-4">
                    <LogOut size={20} />
                    Déconnexion
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="text-lg font-semibold">Déconnexion</DialogHeader>
                <p className="text-gray-600">Vous allez être bientôt déconnecté. Voulez-vous continuer ?</p>
                <DialogFooter className="flex justify-end mt-4">
                    <Button className={"bg-red-500 hover:bg-red-600 w-full flex items-center"} onClick={handleLogout}>
                        Déconnexion
                    </Button>
                    <Button variant="outline" className={"w-full flex items-center bg-gray-300 hover:bg-gray-400"} onClick={() => setIsDialogOpen(false)}>
                        Annuler
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
