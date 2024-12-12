import {SidebarComponent} from "@/components/features/layout/SidebarComponent.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import React from "react";

export const SidebarLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <SidebarComponent />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

