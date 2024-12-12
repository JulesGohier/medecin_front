import SidebarLink from "@/components/features/layout/SidebarLink.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar.tsx";
import { LayoutDashboard } from "lucide-react";

export const SidebarComponent = () => {
    const items = [
        {
            title: "Tableau de bord",
            url: "/",
            icon: LayoutDashboard,
        }
    ]
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className={"flex items-center py-2 px-2"}>
                    <img
                        width={75}
                        height={75}
                        src={"/icon-medicine.png"}
                        alt={"Medicine Logo"}
                    />
                    <h2 className={"text-3xl ml-2 font-bold"}>
                        <span className={"text-red-800"}>M</span>
                        edicine
                    </h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={"uppercase text-[#929DAC] text-lg"}>Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <SidebarLink
                                            href={item.url}
                                            icon={item.icon}
                                            label={item.title}
                                            />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

