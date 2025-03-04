import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {MedecinCard} from "@/patient/components/MedecinCard.tsx";

export const PatientMedecin = () => {
    return (
        <DashboardWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <MedecinCard />
                <MedecinCard />
                <MedecinCard />
                <MedecinCard />
                <MedecinCard />
                <MedecinCard />
            </div>
        </DashboardWrapper>
    );
};