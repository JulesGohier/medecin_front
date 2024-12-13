import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";

const PatientSettings = () => {
    return (
        <DashboardWrapper>
            <Button variant={"themed"}>Settings</Button>
        </DashboardWrapper>
    );
};

export default PatientSettings;
