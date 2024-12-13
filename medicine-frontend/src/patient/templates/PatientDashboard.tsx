import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";

const PatientDashboard = () => {
  return (
    <DashboardWrapper>
      <Button variant={"themed"}>Dashboard</Button>
    </DashboardWrapper>
  );
};

export default PatientDashboard;
