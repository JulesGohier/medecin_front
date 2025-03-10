import {
    CardDescription,
} from "@/components/ui/card.tsx";

export const InfoSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h4>{title}</h4>
    <CardDescription className={"ml-3 mt-1"}>{children}</CardDescription>
    </div>
);
