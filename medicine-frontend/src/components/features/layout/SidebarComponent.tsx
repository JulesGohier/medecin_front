import SidebarLink from "@/components/features/layout/SidebarLink.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {CalendarIcon, LayoutDashboard, Settings, UsersRound} from "lucide-react";

export const SidebarComponent = () => {
  const items = [
    {
      title: "Tableau de bord",
      url: "/",
      icon: LayoutDashboard,
    },
  ];

  const patient_items = [
    {
      title: "Medecins",
      url: "/medecins",
      icon: UsersRound,
    },
    {
      title: "Mes rendez-vous",
      url: "/mes_rendez_vous",
      icon: CalendarIcon,
    },
  ]

  const tools = [
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
  ]

  return (
      <Sidebar variant={"sidebar"}>
        <SidebarHeader>
          <div className={"flex items-center py-2 mb-16"}>
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
            <SidebarGroupLabel className={"uppercase text-[#929DAC] text-lg"}>
              Principal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="py-1 px-1">
                {items.map((item) => (
                    <SidebarMenuItem
                        key={item.title}
                        className={"py-3"}
                    >
                      <SidebarMenuButton asChild>
                        <SidebarLink
                            href={item.url}
                            icon={item.icon}
                            label={item.title}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                {patient_items.map((item) => (
                    <SidebarMenuItem
                        key={item.title}
                        className={"py-3"}
                    >
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
            <SidebarGroupLabel className={"uppercase text-[#929DAC] text-lg mt-16"}>
              Outils
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tools.map((item) => (
                    <SidebarMenuItem
                        key={item.title}
                        className={"py-3"}
                    >
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
