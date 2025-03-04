import { useState } from "react";
import axios from "axios";

type Medecin = {
  num_rpps: string;
  nom: string;
  prenom: string;
};

const Inscription: React.FC = () => {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [formData, setFormData] = useState({ num_rpps: "" });

  // Charger la liste des médecins immédiatement
  (async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/medecins");
      setMedecins(Array.isArray(res.data.member) ? res.data.member : []);
    } catch (err) {
      console.error("Erreur API :", err);
    }
  })();

  return (
      <select className="p-2 w-full border border-gray-300 rounded"
        name="num_rpps"
        onChange={(e) => setFormData({ ...formData, num_rpps: e.target.value })}
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

export default Inscription;
