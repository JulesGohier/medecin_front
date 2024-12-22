import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { PaginationComponent } from "@/medecin/components/PaginationComponent.tsx";
import { TableActions } from "@/medecin/components/tables/TableActions.tsx";
import { TableLayout } from "@/medecin/components/tables/TableLayout.tsx";
import { TableActionsProps } from "@/medecin/components/tables/types.ts";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

interface Appointment {
    firstName: string;
    lastName: string;
    sexe: string;
    date_rdv: string;
    state: string;
}

interface TableAppointmentProps {
    data: Appointment[];
}

export const TableAppointment = ({ data }: TableAppointmentProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    const tableHeader = ["Prénom", "Nom", "Sexe", "Date rdv", "État", "Actions"];
    const tableActions: TableActionsProps[] = [
        { icon: Edit, className: "text-gray-500 hover:text-gray-700" },
        { icon: Trash, className: "text-red-500 hover:text-red-700" },
    ];
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="w-full">
            <TableLayout header={tableHeader}>
                {currentData.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        className={`text-center ${rowIndex % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                    >
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.sexe}</TableCell>
                        <TableCell>{row.date_rdv}</TableCell>
                        <TableCell>{row.state}</TableCell>
                        <TableCell className="text-center">
                            <div className="flex justify-center space-x-2">
                                {tableActions.map((action, key) => (
                                    <TableActions
                                        key={key}
                                        icon={action.icon}
                                        className={action.className}
                                    />
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableLayout>
            
            <div className="mt-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};