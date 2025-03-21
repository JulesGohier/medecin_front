import {useQuery} from "@tanstack/react-query";
import {fetchAllMedecins} from "@/templates/landingPage/actions/landing-action.ts";

export function SelectMedecin({ informationInscription, handleInputChange }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["medecins"],
        queryFn: async()=> {
            const allMedecin = await fetchAllMedecins();
            const medecinGeneraliste = allMedecin.filter((medecin)=> medecin.specialite == 'Médecin Généraliste')
            return medecinGeneraliste;
        },
    });

    const medecins = data || [];

    return (
        <select
            className="p-2 w-full border border-gray-300 rounded"
            name="medecin_perso"
            value={informationInscription.medecin_perso}
            onChange={handleInputChange}
            disabled={isLoading || isError}
        >
            {isLoading ? (
                <option>Chargement des médecins...</option>
            ) : isError ? (
                <option>Erreur lors du chargement</option>
            ) : (
                <>
                    <option value="">Sélectionnez un médecin</option>
                    {medecins.length > 0 ? (
                        medecins.map((med) => (
                            <option key={med.num_rpps} value={med.num_rpps}>
                                {med.nom} {med.prenom}
                            </option>
                        ))
                    ) : (
                        <option>Aucun médecin disponible</option>
                    )}
                </>
            )}
        </select>
    );
}

