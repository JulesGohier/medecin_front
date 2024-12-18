import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";

type TableProps = {
    tableHeaders: string[];
    data: string[][];
};

export const TableComponent = ({ tableHeaders, data }: TableProps) => {
    
    return (
        <Table className={"w-full  mx-auto mr-0 sm:mr-6 border-2 border-gray-200  mt-5 sm:mt-0 md:mt-0"}>
            <TableHeader>
                <TableRow className="text-center">
                    {tableHeaders.map((head, key) => (
                        <TableHead className="text-center" key={key}>
                            {head}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="text-center">
                        {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex} className="text-center">
                                {tableHeaders[cellIndex] === "Numéro d'identification" ? `#${cell}` : cell}
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
            </TableBody>
        </Table>
    );
};