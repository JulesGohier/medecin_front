import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {TableAppointment} from "@/medecin/components/tables/TableAppointment.tsx";

const MedecinAppointments = () => {
    const data = [
        { firstName: "Lilian", lastName: "Caffier", sexe: "Homme", date_rdv: "2023-12-15", state: "En cours" },
        { firstName: "Jules", lastName: "Gohier", sexe: "Homme", date_rdv: "2024-01-12", state: "En cours" },
        { firstName: "Romain", lastName: "Tirbois", sexe: "Homme", date_rdv: "2023-12-17", state: "En cours" },
        { firstName: "Thomas", lastName: "Kerhervé", sexe: "Homme", date_rdv: "2023-12-14", state: "En cours" },
    ];
    
    return (
        <DashboardWrapper>
            <div className={"mt-2 w-full"}>
                <div className={"flex flex-col text-2xl text-black"}>
                    <h2 className={"text-xl font-semibold"}>Rendez-vous</h2>
                    <p className={"text-lg font-medium"}>Tableau de vos rendez-vous.</p>
                </div>
                <div className={"flex flex-col sm:flex-row md:flex-row mt-16"}>
                    <TableAppointment data={data} />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MedecinAppointments;