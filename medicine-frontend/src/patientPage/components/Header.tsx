import { Bell } from "lucide-react";
import waveLogo from '@/assets/icons/waving-hand.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchRDVPatient } from "@/patientPage/actions/patient-action.ts";
import { parseurJSON } from "@/parseurJson.ts";
import { fetchData } from "@/medecin/actions/medecin-action.ts"; // Fonction pour récupérer les infos du médecin
import { LoaderSpinner } from "@/medecin/components/LoaderSpinner.tsx";

export const Header = ({ user }: { user?: any }) => {
    const { data: patientData, isLoading: isAuthLoading } = useQuery({
        queryKey: ["patientData"],
        queryFn: async () => parseurJSON('patient'),
    });

    const { data: patientRdvAnnule, isLoading: isPatientLoading } = useQuery({
        queryKey: ["patientRdvAnnule"],
        queryFn: async () => {
            if (!patientData?.num_secu_sociale) return [];

            const allRdv = await fetchRDVPatient(patientData.num_secu_sociale);

            return allRdv.filter((rdv) =>
                rdv.annule_par === 'medecin' && new Date(rdv.date) > new Date()
            );
        },
        enabled: !!patientData?.num_secu_sociale,
    });

    const queriesMedecinData = useQueries({
        queries: (patientRdvAnnule ?? []).filter((rdv) => rdv?.idMedecin).map((rdv) => ({
            queryKey: ["medecinRDV", rdv.idMedecin],
            queryFn: () => fetchData(rdv.idMedecin),
            enabled: !!rdv.idMedecin,
        })),
    });
    console.log(patientRdvAnnule);
    return (
        <div className="flex items-center w-full">
            <h1 className="text-3xl">{`Bonjour, ${user?.nom} ${user?.prenom}`}</h1>
            <img
                src={waveLogo}
                width={45}
                alt="Wave Logo"
                className="ml-12"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="relative inline-flex p-2.5 hover:bg-gray-100 transition-all duration-200 rounded-full ml-auto cursor-pointer">
                        <Bell size={25} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                            {isPatientLoading ? <LoaderSpinner /> : patientRdvAnnule?.length || 0}
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="h-80 overflow-scroll">
                    {patientRdvAnnule?.length > 0 ? (
                        patientRdvAnnule.map((rdv, index) => {
                            const medecinData = queriesMedecinData[index]?.data;

                            return (
                                <DropdownMenuItem key={index} className="h-10">
                                    {medecinData
                                        ? `Dr. ${medecinData.nom} ${medecinData.prenom} a annulé le RDV du ${new Date(rdv.date).toLocaleDateString()}`
                                        : `Un médecin a annulé le RDV du ${new Date(rdv.date).toLocaleDateString()}`
                                    }
                                </DropdownMenuItem>
                            );
                        })
                    ) : (
                        <DropdownMenuItem>Aucune nouvelle notification</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
