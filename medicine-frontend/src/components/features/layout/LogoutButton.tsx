import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
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
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                        Déconnexion
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutButton;
