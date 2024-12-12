import React from "react";
import {SidebarComponent} from "@/components/features/layout/SidebarComponent.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";

export const DashboardWrapper = ({ children } : { children: React.ReactNode }) => {
    return (
        <SidebarProvider className={"flex w-full min-h-screen"}>
           <SidebarComponent />
            <main className="w-full  py-7 px-9">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

