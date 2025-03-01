import {Label} from "@/components/ui/label.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import {fetchData} from "@/medecin/actions/medecin-action.ts";
import {LoaderSpinner} from "@/medecin/components/LoaderSpinner.tsx";
import { PaginationComponent } from "@/medecin/components/PaginationComponent.tsx";
import {TableActions} from "@/medecin/components/tables/TableActions.tsx";
import { TableLayout } from "@/medecin/components/tables/TableLayout.tsx";
import { TableActionsProps } from "@/medecin/components/tables/types.ts";
import {formatDate} from "@/medecin/format/format.ts";
import {useQueries} from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import  { useState } from "react";


export const TableAppointment = ({ appointments } :  { appointments: string[]  }) => {
    const queriesAppointmentData = useQueries({
        queries: appointments.map((appointment) => ({
            queryKey: ['appointment', appointment],
            queryFn: () => fetchData(appointment),
        })),
    });
    
    const queriesAppointmentPatientData = useQueries({
        queries: queriesAppointmentData
            .filter((appointment) => appointment.data?.idPatient)
            .map((appointment) => ({
                queryKey: ['patient', appointment.data.idPatient],
                queryFn: () => fetchData(appointment.data.idPatient),
            })),
    });
    
    const isLoading = queriesAppointmentData.some(query => query.isLoading) || queriesAppointmentPatientData.some(query => query.isLoading);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    const tableHeader = ["Prénom", "Nom", "Sexe", "Date Rendez-Vous", "État", "Actions"];
    const tableActions: TableActionsProps[] = [
        { icon: Edit, className: "text-gray-500 hover:text-gray-700" },
        { icon: Trash, className: "text-red-500 hover:text-red-700" },
    ];
    
    
    const totalPages = Math.ceil(queriesAppointmentPatientData.length / itemsPerPage);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="w-full">
            {isLoading ? (
                <div className={"flex w-full h-full justify-center"}>
                    <LoaderSpinner />
                </div>
            ) : (
                <TableLayout header={tableHeader}>
                    {queriesAppointmentData.length > 0 ? queriesAppointmentData.map((item, key) => {
                        const patientData = queriesAppointmentPatientData[key]?.data;
                        const appointmentDate = item.data?.date;
                        const appointmentState = item.data?.state;
                        return (
                            <TableRow
                                key={key}
                                className={`text-center ${key % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                            >
                                <TableCell className={"capitalize"}>{patientData?.prenom}</TableCell>
                                <TableCell className={"capitalize"}>{patientData?.nom}</TableCell>
                                <TableCell className={"capitalize"}>{patientData?.sexe}</TableCell>
                                <TableCell className={"capitalize"}>{formatDate(appointmentDate)}</TableCell>
                                <TableCell className={"capitalize"}>{appointmentState}</TableCell>
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
                        );
                    }) : (
                        <div className={"flex w-full h-full mt-6 ml-64 items-center text-center justify-center"}>
                            <Label>Aucun Rendez-Vous</Label>
                        </div>
                    )}
                </TableLayout>
            )}
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
