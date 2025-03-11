import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderSpinner } from "@/templates/patientPage/components/LoaderSpinner.tsx";

export const RedirectionConnexion = ({ isOpen }: { isOpen: boolean }) => {
  const [compteur, setCompteur] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompteur((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.clear();
          window.location.href = "/Connexion";
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Sécurité de votre compte
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-gray-700">
            Pour protéger votre compte, une reconnexion est nécessaire après la
            modification de votre
            <span className="font-semibold text-red-500"> email </span> ou
            <span className="font-semibold text-red-500"> mot de passe</span>.
          </p>
          <p className="text-gray-700">
            Redirection vers la page de connexion dans
            <span className="font-bold text-red-500"> {compteur}s</span>.
          </p>
          <LoaderSpinner />
          <p className="text-sm text-gray-500">Merci de votre compréhension.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
