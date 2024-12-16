import {Button} from "@/components/ui/button.tsx";


export const ContactButton = ({ Icon, href, label }: { Icon: React.ComponentType, href: string, label: string }) => (

       <Button className={"bg-red-500 hover:bg-red-600 w-full flex items-center gap-2"}>
           <Icon />
           <a href={href}>{label}</a>
       </Button>
);
