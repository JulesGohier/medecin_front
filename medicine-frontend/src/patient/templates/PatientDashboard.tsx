import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { YourMedecinCard } from "@/patient/components/YourMedecinCard.tsx";
import {BookingAppointment} from "@/patient/components/BookingAppointment.tsx";
import {CabinetCard} from "@/patient/components/CabinetCard.tsx";
import {NextAppointement} from "@/patient/components/NextAppointement.tsx";


export const PatientDashboard = () => {
    return (
        <DashboardWrapper>
            <div className="grid w-full gap-4 min-h-[500px] max-h-[80vh] grid-cols-1 md:grid-cols-[2fr_3fr]">
                <div className="flex flex-col gap-4 h-full">
                    <YourMedecinCard className="w-full flex-1" />
                    <CabinetCard className="w-full flex-1" />
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <BookingAppointment className="w-full flex-1 min-h-[300px] md:min-h-[500px]" />
                    <NextAppointement className="w-full h-[160px] rounded-2xl flex flex-col justify-center" />
                </div>
            </div>
        </DashboardWrapper>
    );
};