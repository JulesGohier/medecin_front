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
import {Calendar, CalendarIcon, LayoutDashboard, Settings, UsersRound, LogOut} from "lucide-react";
import {parseurJSON} from "@/parseurJson.ts";
import LogoutButton from "@/components/features/layout/LogoutButton.tsx";

export const SidebarComponent = () => {
  const role = parseurJSON('role')

  let user_items: { title: string; url: string; icon: any }[] = [];

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

  let tools = [
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
  ]

  const medecine_items = [
    {
      title: "Patients",
      url: "/mes_patients",
      icon: UsersRound,
    },
    {
      title: "Rendez-vous",
      url: "/mes_consultations",
      icon: Calendar,
    },

  ]

  let link = "";
  if (role === "ROLE_MEDECIN") {
    link = "/dashboard_medecin"
    tools = tools.slice(1);
    user_items = medecine_items;
  } else if (role === "ROLE_PATIENT") {
    link = "/dashboard_patient"
    user_items = patient_items
  } else if (role === "ROLE_ADMIN"){
    link = "/dashboard_admin"
    tools = tools.slice(1);
  }

  const items = [
    {
      title: "Tableau de bord",
      url: `${link}`,
      icon: LayoutDashboard,
    },
  ];


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
                {user_items.map((item) => (
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
        <div className="mt-auto p-4">
          <LogoutButton />
        </div>
      </Sidebar>
  );
};
