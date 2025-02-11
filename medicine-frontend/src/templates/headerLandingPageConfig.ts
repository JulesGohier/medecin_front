import logo from "@/assets/icon-medicine.png";

export interface NavLink {
    label: string;
    href: string;
  }
  
  export interface HeaderConfig {
    title: string;
    logo: string;
  }
  
  export const headerConfig: HeaderConfig = {
      title: "Médecine",
      logo: logo,
  };
  