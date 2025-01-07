import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {MedecinCard} from "@/patient/components/MedecinCard.tsx";
import {BookingAppointment} from "@/patient/components/BookingAppointment.tsx";

export const PatientDashboard = () => {
  return (
    <DashboardWrapper >
        <div className={"w-full h-full grid grid-cols-[2fr_3fr] gap-10"}>
            <MedecinCard className={"mt-3 h-full flex flex-col gap-10"}/>
            <BookingAppointment className={"w-full mt-3"}/>
        </div>
    </DashboardWrapper>
  );
};