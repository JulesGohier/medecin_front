import { Label } from "@/components/ui/label.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import {fetchData} from "@/patientPage/actions/patient-action.ts";
import { LoaderSpinner } from "@/patientPage/components/LoaderSpinner.tsx"
import { AnnuleAppointmentModal } from "@/patientPage/components/modal/AnnuleAppointmentModal.tsx";
import { PaginationComponent } from "@/patientPage/components/table/PaginationComponent.tsx";
import { TableLayout } from "@/patientPage/components/table/TableLayout.tsx";
import { useQueries } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/patientPage/components/format.ts";

interface Appointment {
    id: string;
    state: string;
    date: string;
    idMedecin: string;
}

export const TableAppointment = ({ appointments }: {appointments: Appointment[]}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const tableHeader = ["Prénom", "Nom", "Spécialité" , "Date Rendez-Vous", "État", "Actions"];

    const queriesMedecinData = useQueries({
        queries: appointments
            .filter((rdv) => rdv?.idMedecin)
            .map((rdv) => ({
                queryKey: ["medecinRDV", rdv.idMedecin],
                queryFn: () => fetchData(rdv?.idMedecin),
            })),
    });


    const isLoading = queriesMedecinData.some((rdv) => rdv.isLoading);

    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAppointments = appointments.slice(startIndex, endIndex);


    return (
        <div className="w-full">
            {isLoading ? (
                <div className="flex w-full h-full justify-center">
                    <LoaderSpinner />
                </div>
            ) : (
                <TableLayout header={tableHeader}>
                    {paginatedAppointments.length > 0 ? paginatedAppointments.map((appointmentQuery, key) => {
                        const medecinData = queriesMedecinData[key]?.data;
                        console.log(appointmentQuery);
                        return (
                            <TableRow key={key} className={`text-center ${key % 2 === 1 ? "bg-gray-100" : "bg-white"}`}>
                                <TableCell className="capitalize">{medecinData?.prenom || "-"}</TableCell>
                                <TableCell className="capitalize">{medecinData?.nom || "-"}</TableCell>
                                <TableCell className="capitalize">{medecinData?.specialite || "-"}</TableCell>
                                <TableCell className="capitalize">{formatDate(appointmentQuery?.date, "long") || "-"}</TableCell>
                                <TableCell className="capitalize">{appointmentQuery?.state || "-"}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center space-x-2">
                                        { appointmentQuery?.state === 'réservé' ?
                                            <AnnuleAppointmentModal appointmentId={appointmentQuery?.id}>
                                                <CircleX size={20} className="text-red-500 hover:text-red-700 cursor-pointer" />
                                            </AnnuleAppointmentModal>
                                            : null }
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    }) : (
                        <div className="flex w-full h-full mt-6 ml-64 items-center text-center justify-center">
                            <Label>Aucun Rendez-Vous</Label>
                        </div>
                    )}
                </TableLayout>
            )}
            <div className="mt-4 w-full">
                {totalPages === 1 ? null : (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

        </div>
    );
};
