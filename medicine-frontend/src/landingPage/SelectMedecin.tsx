import { useState } from "react";
import axios from "axios";

type Medecin = {
    num_rpps: string;
    nom: string;
    prenom: string;
};

export function SelectMedecin({ formData, handleInputChange }) {
    const [medecins, setMedecins] = useState<Medecin[]>([]);

    axios.get("http://localhost:9000/api/medecins")
        .then((res) => {
            setMedecins(Array.isArray(res.data.member) ? res.data.member : []);
        })
        .catch((err) => {
            console.error("Erreur API :", err);
        });

    {/* Pour le menu déroulant des médecins */}
    return (
        <select
            className="p-2 w-full border border-gray-300 rounded"
            name="num_rpps"
            value={formData.num_rpps}
            onChange={handleInputChange}
        >
            <option value="">Sélectionnez un médecin</option>
            {medecins.map((med) => (
                <option key={med.num_rpps} value={med.num_rpps}>
                    {med.nom} {med.prenom}
                </option>
            ))}
        </select>
    );
};