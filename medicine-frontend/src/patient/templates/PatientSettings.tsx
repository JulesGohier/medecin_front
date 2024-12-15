import { DashboardWrapper } from "@/components/features/layout/DashboardWrapper.tsx";
import { Button } from "@/components/ui/button.tsx";

export const PatientSettings = () => {
    return (
        <DashboardWrapper>
            <Button variant={"themed"}>Settings</Button>
        </DashboardWrapper>
    );
};