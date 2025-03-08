import {Pagination, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination.tsx";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationComponent = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Pagination className="flex justify-center items-center space-x-2 mt-4">
            {currentPage === 1 ? null : (
                <PaginationPrevious
                    onClick={handlePrevious}
                    className="flex items-center cursor-pointer border border-gray-200 bg-gray-200"
                >
                    Précédent
                </PaginationPrevious>
            )}

            {Array.from({ length: totalPages }, (_, index) => (
                <PaginationLink
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={cn(
                        "px-3 py-1.5 cursor-pointer border border-gray-200",
                        currentPage === index + 1 && "bg-gray-200"
                    )}
                >
                    {index + 1}
                </PaginationLink>
            ))}

            {currentPage === totalPages ? null : (
                <PaginationNext
                    onClick={handleNext}
                    className="flex items-center cursor-pointer border border-gray-200 bg-gray-200 disabled:bg-green-500"
                >
                    Suivant
                </PaginationNext>
            )}

        </Pagination>
    );
};