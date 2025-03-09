import { LoaderSpinner } from "@/patientPage/components/LoaderSpinner.tsx";
import { useState, useEffect } from "react";

export const SessionExpire = () => {
    const [compteur, setCompteur] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCompteur((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = "/Connexion";
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg w-[700px] h-[200px]">
                <h1 className="text-2xl font-semibold text-red-500">Votre session a expiré</h1>
                <p className="mt-4 text-gray-700">
                    Votre session a expiré. Vous allez être redirigé vers la page de connexion dans
                    <span className="font-bold text-red-500"> {compteur}s </span>
                </p>
                <LoaderSpinner className="mt-5" />
                <p className="mt-3 text-sm text-gray-500">Veuillez patienter...</p>
            </div>
        </div>
    );
};
