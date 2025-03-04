import {Separator} from "@/components/ui/separator.tsx";
import React from "react";
import { SidebarComponent } from "@/components/features/layout/SidebarComponent.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import Header from "@/medecin/components/Header.tsx";

export const DashboardWrapper = ({ children, user }: { children: React.ReactNode, user: any }) => {
    return (
        <SidebarProvider className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
            <SidebarComponent />
            <main className="flex flex-col w-full h-full py-7 px-9 bg-gray-50">
                <div className="flex items-center justify-between w-full mb-7">
                    <SidebarTrigger className="text-sm text-gray-500 hover:text-gray-900 mr-12 mt-1" />
                    <Header user={user} />
                </div>
                <Separator className="w-full bg-gray-200 mb-4" />
                {children}
            </main>
        </SidebarProvider>
    );
};
