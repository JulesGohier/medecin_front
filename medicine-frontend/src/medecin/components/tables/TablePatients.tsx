import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {TableActionsProps} from "@/medecin/components/tables/types.ts";
import {TableActions} from "@/medecin/components/tables/TableActions.tsx";
import {TableLayout} from "@/medecin/components/tables/TableLayout.tsx";
import {Edit, Eye, Trash} from "lucide-react";

interface Patient {
    firstName: string;
    lastName: string;
    sexe: string;
    num_secu: number;
    num_id: number;
}

interface TablePatientProps {
    data: Patient[];
}

export const TablePatients = ({ data }: TablePatientProps) => {
    const tableHeader = ["Prénom", "Nom", "Sexe", "Numéro de sécurité social","Numéro d'identification",  "Actions"]
    const tableActions: TableActionsProps[] = [
        {
            icon: Eye,
            className: "text-green-500 hover:text-green-700"
        },
        {
            icon: Edit,
            className: "text-gray-500 hover:text-gray-700"
        },
        {
            icon: Trash,
            className: "text-red-500 hover:text-red-700"
        },
    ]
    
    return (
        <TableLayout header={tableHeader}>
            {data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={`text-center ${rowIndex % 2 === 1 ? "bg-gray-100" : "bg-white"}`}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.sexe}</TableCell>
                    <TableCell>{row.num_secu}</TableCell>
                    <TableCell>#{row.num_id}</TableCell>
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
    );
};
