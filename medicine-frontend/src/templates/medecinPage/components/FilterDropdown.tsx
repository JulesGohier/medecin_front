import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { useState } from "react";

interface FilterDropdownProps {
    onSortChange: (sortBy: string) => void;
}

export const FilterDropdown = ({ onSortChange }: FilterDropdownProps) => {
    const [selectedSort, setSelectedSort] = useState();
    
    const handleSortChange = (sortBy: string) => {
        setSelectedSort(sortBy);
        onSortChange(sortBy);
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="themed" className="w-40">
                    Trier par: {selectedSort ?? "Aucun"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => handleSortChange("Nom")}
                >
                    Nom
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleSortChange("Récent")}
                >
                    Récent
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleSortChange("Ancien")}
                >
                    Ancien
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
