import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {TableActionsProps, TableDataProps} from "@/medecin/components/tables/types.ts";
import {TableActions} from "@/medecin/components/tables/TableActions.tsx";
import {TableLayout} from "@/medecin/components/tables/TableLayout.tsx";
import {Edit, Eye, Trash} from "lucide-react";

export const TablePatients = ({ data }: TableDataProps) => {
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
                <TableRow
                    key={rowIndex}
                    className={`text-center ${rowIndex % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                >
                    {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="text-center">
                            {cell}
                        </TableCell>
                    ))}
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

