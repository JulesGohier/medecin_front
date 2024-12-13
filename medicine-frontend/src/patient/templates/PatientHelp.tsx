import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";

const PatientHelp = () => {
    return (
        <DashboardWrapper>
            <Button variant={"themed"}>Help</Button>
        </DashboardWrapper>
    );
};

export default PatientHelp;