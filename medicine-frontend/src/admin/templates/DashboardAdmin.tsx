import {authenticateAdministrator} from "@/admin/actions/admin.action.ts";
import {LoaderSpinner} from "@/admin/components/LoaderSpinner.tsx";
import {DashboardWrapper} from "@/components/features/layout/DashboardWrapper.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useQuery} from "@tanstack/react-query";


const DashboardAdmin = () => {
    const { data: admin, isLoading } = useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            let token = localStorage.getItem("token");
            if (!token) {
                const data = await authenticateAdministrator("admin@admin.com", "password123");
                localStorage.setItem("token", data.token);
            }
            else {
                const data = await authenticateAdministrator("admin@admin.com", "password123");
                return data;
            }
        },
    });
    
    
    if (isLoading) {
        return (
            <div className={"flex w-full h-screen items-center justify-center"}>
                <LoaderSpinner />
            </div>
        );
    }
    
    if (admin.roles[0] !== "ROLE_ADMIN") {
        alert("Vous n'avez pas l'autorisation !");
    }
    
    return (
        <DashboardWrapper>
           <Button
               variant={"themed"}
           >
               Salut
           </Button>
        </DashboardWrapper>
    );
};

export default DashboardAdmin;