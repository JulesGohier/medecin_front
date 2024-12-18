import {
    Table, TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";


export const TableLayout = ({ header, children }: { header: string[], children: React.ReactNode }) => {
    return (
        <Table className="w-full mx-auto mr-0 sm:mr-6 border-2 border-gray-200 rounded-xl  sm:mt-0 md:mt-0 overflow-hidden">
            <TableHeader>
                <TableRow className="text-center bg-gray-100">
                    {header.map((head, key) => (
                        <TableHead className="text-center" key={key}>
                            {head}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    );
};