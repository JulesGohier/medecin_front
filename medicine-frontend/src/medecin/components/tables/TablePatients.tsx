import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {TableLayout} from "@/medecin/components/tables/TableLayout.tsx";
import {Edit, Eye, Trash} from "lucide-react";

type TablePatientsProps = {
    data: string[][]
}

export const TablePatients = ({ data }: TablePatientsProps) => {
    const tableHeader = ["Prénom", "Nom", "Numéro de sécurité social", "Date du rendez-vous","État",  "Actions"]
    
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
                            <Eye className="cursor-pointer text-green-500 hover:text-green-700" size={20} />
                            <Edit className="cursor-pointer text-gray-500 hover:text-gray-700" size={20} />
                            <Trash className="cursor-pointer text-red-500 hover:text-red-700" size={20} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableLayout>
    );
};

