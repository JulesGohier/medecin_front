import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {PatientCard} from "@/patient/components/PatientCard.tsx";

export const PatientDashboard = () => {
  return (
    <DashboardWrapper>
        <PatientCard/>
    </DashboardWrapper>
  );
};