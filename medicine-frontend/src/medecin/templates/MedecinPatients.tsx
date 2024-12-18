import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {TablePatients} from "@/medecin/components/tables/TablePatients.tsx";

const MedecinPatients = () => {
    const data = [
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", num_secu: 213098765432109, num_id: 1 },
    ]
    
    return (
        <DashboardWrapper>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Patients</h2>
                    <p className={"text-lg font-medium"}>Tableau de vos patients.</p>
                </div>
                <div className={"flex flex-col sm:flex-row md:flex-row mt-16"}>
                    <TablePatients data={data} />
                </div>
            </div>
        </DashboardWrapper>
);
};

export default MedecinPatients;