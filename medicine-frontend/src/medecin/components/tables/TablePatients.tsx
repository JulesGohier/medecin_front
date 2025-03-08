import {Label} from "@/components/ui/label.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import {fetchData} from "@/medecin/actions/medecin-action.ts";
import {Patient} from "@/medecin/components/cards/NextAppointmentCard.tsx";
import { PaginationComponent } from "@/medecin/components/PaginationComponent.tsx";
import { TableLayout } from "@/medecin/components/tables/TableLayout.tsx";
import {useQueries} from "@tanstack/react-query";
import  { useState } from "react";


export const TablePatients = ({ patients }: {  patients: Patient[]  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    
    const queriesPatient = useQueries({
        queries: patients.map((patient) => ({
            queryKey: ['patient', patient],
            queryFn: () => fetchData(patient),
        })),
    });
    
    
    const itemsPerPage = 12;
    
    const tableHeader = [
        "Prénom",
        "Nom",
        "Sexe",
        "Numéro de sécurité sociale",
        "Numéro de téléphone",
        "Actions",
    ];
    
    console.log(queriesPatient);
    
    
    const totalPages = Math.ceil(patients.length / itemsPerPage);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="w-full">
            <TableLayout header={tableHeader}>
                {queriesPatient.length > 0 ? queriesPatient.map((patient, key) => (
                    <TableRow
                        key={key}
                        className={`text-center ${key % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                    >
                        <TableCell>{patient.data?.prenom}</TableCell>
                        <TableCell>{patient.data?.nom}</TableCell>
                        <TableCell>{patient.data?.sexe}</TableCell>
                        <TableCell>{patient.data?.num_secu_sociale}</TableCell>
                        <TableCell>{patient.data?.num_tel}</TableCell>
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