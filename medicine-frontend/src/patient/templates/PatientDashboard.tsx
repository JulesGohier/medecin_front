import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import {MedecinCard} from "@/patient/components/MedecinCard.tsx";
import {BookingAppointment} from "@/patient/components/BookingAppointment.tsx";
import {CabinetCard} from "@/patient/components/CabinetCard.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";

export const PatientDashboard = () => {
  return (
      <DashboardWrapper>
          <div className="grid w-full gap-4 min-h-[500px] max-h-[80vh] grid-cols-1 md:grid-cols-[2fr_3fr]">

              <div className="flex flex-col gap-4 h-full">
                  <MedecinCard className="w-full flex-1" />
                  <CabinetCard className="w-full flex-1" />
              </div>

              <div className="flex flex-col gap-4 h-full">
                  <BookingAppointment className="w-full flex-1 min-h-[300px] md:min-h-[500px]" />
                  <Card className="w-full h-[160px] rounded-2xl">
                      <CardTitle className={"text-black flex justify-self-center m-3"}>Votre prochain rendez-vous</CardTitle>
                      <hr/>
                      <CardContent className="flex flex-col">

                      </CardContent>
                  </Card>
              </div>
          </div>
      </DashboardWrapper>
  );
};