import {Label} from "@/components/ui/label.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import {fetchData} from "@/templates/medecinPage/actions/medecin-action.ts";
import {LoaderSpinner} from "@/templates/medecinPage/components/LoaderSpinner.tsx";
import {AppointmentModal} from "@/templates/medecinPage/components/modals/AppointmentModal.tsx";
import {DeleteAppointmentModal} from "@/templates/medecinPage/components/modals/DeleteAppointmentModal.tsx";
import { PaginationComponent } from "@/templates/medecinPage/components/PaginationComponent.tsx";
import { TableLayout } from "@/templates/medecinPage/components/tables/TableLayout.tsx";
import {formatDate} from "@/templates/medecinPage/format/format.ts";
import {useQueries} from "@tanstack/react-query";
import {Edit, Eye, Trash} from "lucide-react";
import  { useState } from "react";


export const TableAppointment = ({ appointments }: { appointments: string[] }) => {
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
    
    const totalPages = Math.ceil(queriesAppointmentData.length / itemsPerPage);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const appointmentsToShow = queriesAppointmentData.slice(startIndex, endIndex);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const tableHeader = ["Prénom", "Nom", "Sexe", "Date Rendez-Vous", "État", "Actions"];
    
    return (
        <div className="w-full">
            {isLoading ? (
                <div className={"flex w-full h-full justify-center"}>
                    <LoaderSpinner />
                </div>
            ) : (
                <TableLayout header={tableHeader}>
                    {appointmentsToShow.length > 0 ? appointmentsToShow.map((item, key) => {
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
                                        <AppointmentModal patientData={patientData} appointment={{
                                            appointmentDate: item.data?.date,
                                            appointmentState: item.data?.state
                                        }}>
                                            <Eye size={20} className={"text-green-500 hover:text-green-700 cursor-pointer"} />
                                        </AppointmentModal>
                                        <DeleteAppointmentModal appointmentId={item.data?.id}>
                                            <Trash size={20} className={"text-red-500 hover:text-red-700 cursor-pointer"} />
                                        </DeleteAppointmentModal>
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
