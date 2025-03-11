import { Separator } from "@/components/ui/separator.tsx";
import React from "react";
import { SidebarComponent } from "@/components/features/layout/SidebarComponent.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { HeaderPatient } from "@/templates/patientPage/components/HeaderPatient.tsx";
import HeaderMedecin from "@/templates/medecinPage/components/HeaderMedecin.tsx";
import HeaderAdmin from "@/templates/adminPage/components/HeaderAdmin.tsx";
import { useQuery } from "@tanstack/react-query";
import { parseurJSON } from "@/parseurJson.ts";

export const DashboardWrapper = ({ children, user }: { children: React.ReactNode; user?: any }) => {
    const {
        data: whichRole,
        isLoading: isLoadingRole,
    } = useQuery({
        queryKey: ["whichRole"],
        queryFn: async () => {
            return parseurJSON("role");
        },
    });

    return (
        <SidebarProvider className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
            <SidebarComponent />
            <main className="flex flex-col w-full h-full py-7 px-9 bg-gray-50">
                <div className="flex items-center justify-between w-full mb-7">
                    <SidebarTrigger className="text-sm text-gray-500 hover:text-gray-900 mr-12 mt-1" />

                    {isLoadingRole ? (
                        <div className="text-sm text-gray-500">Chargement...</div>
                    ) : whichRole === "ROLE_MEDECIN" ? (
                        <HeaderMedecin user={user} />
                    ) : whichRole === "ROLE_PATIENT" ? (
                        <HeaderPatient user={user} />
                    ) : <HeaderAdmin/>}
                </div>

                <Separator className="w-full bg-gray-200 mb-4" />
                {children}
            </main>
        </SidebarProvider>
    );
};
