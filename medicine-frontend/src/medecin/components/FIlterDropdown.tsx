
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterDropdownProps {
    onSortChange: (sortBy: string) => void;
}

export const FilterDropdown = ({ onSortChange }: FilterDropdownProps) => {
    const [selectedSort, setSelectedSort] = useState("Date");
    
    const handleSortChange = (sortBy: string) => {
        setSelectedSort(sortBy);
        onSortChange(sortBy);
    };
    
    return (
        <Dropdown>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40">
                    Trier par: {selectedSort}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSortChange("Date")}>Date</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("Nom")}>Nom</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("Sexe")}>Sexe</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("État")}>État</DropdownMenuItem>
            </DropdownMenuContent>
        </Dropdown>
    );
};
