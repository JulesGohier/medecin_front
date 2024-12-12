import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";

const Homepage = () => {
  return (
    <DashboardWrapper>
      <Button variant={"themed"}>Patient</Button>
    </DashboardWrapper>
  );
};

export default Homepage;
