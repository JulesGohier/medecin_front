import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {TableActions} from "@/medecin/components/tables/TableActions.tsx";
import {TableLayout} from "@/medecin/components/tables/TableLayout.tsx";
import {TableActionsProps} from "@/medecin/components/tables/types.ts";
import {Edit, Trash} from "lucide-react";

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

export const TableAppointment = ({ data } : TableAppointmentProps) => {
    const tableHeader = ["Prénom", "Nom", "Sexe", "Date du rendez-vous", "État", "Actions"]
    const tableActions: TableActionsProps[] = [
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
    );
};

