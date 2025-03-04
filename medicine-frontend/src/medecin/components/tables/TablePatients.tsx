import {Label} from "@/components/ui/label.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import {Patient} from "@/medecin/components/cards/NextAppointmentCard.tsx";
import { PaginationComponent } from "@/medecin/components/PaginationComponent.tsx";
import { TableLayout } from "@/medecin/components/tables/TableLayout.tsx";
import  { useState } from "react";


export const TablePatients = ({ patients }: {  patients: Patient[]  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    const tableHeader = [
        "Prénom",
        "Nom",
        "Sexe",
        "Numéro de sécurité sociale",
        "Numéro de téléphone",
        "Actions",
    ];
    
    const totalPages = Math.ceil(patients.length / itemsPerPage);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="w-full">
            <TableLayout header={tableHeader}>
                {patients.length > 0 ? patients.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        className={`text-center ${rowIndex % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                    >
                        <TableCell>{row.prenom}</TableCell>
                        <TableCell>{row.nom}</TableCell>
                        <TableCell>{row.sexe}</TableCell>
                        <TableCell>{row.num_secu_sociale}</TableCell>
                        <TableCell>#{row.num_tel}</TableCell>
                        <TableCell className="text-center">
                            <div className="flex justify-center space-x-2">
                            </div>
                        </TableCell>
                    </TableRow>
                )) : (
                    <div className="flex w-full h-full text-center mt-6 ml-64 items-center justify-center">
                        <Label>Aucun Patients</Label>
                    </div>
                
                )}
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