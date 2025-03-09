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
        <div className="w-full flex justify-center mt-4">
            <Pagination className="flex justify-center items-center space-x-2 w-auto">
                <PaginationPrevious
                    onClick={handlePrevious}
                    className={cn(
                        "flex items-center cursor-pointer border border-gray-200 bg-gray-200 px-3 py-1 rounded-md",
                        currentPage == 1 && "visibility-hidden opacity-0"
                    )}
                >
                    Précédent
                </PaginationPrevious>

                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationLink
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        className={cn(
                            "px-3 py-1.5 cursor-pointer border border-gray-200 rounded-md",
                            currentPage === index + 1 && "bg-gray-200"
                        )}
                    >
                        {index + 1}
                    </PaginationLink>
                ))}

                <PaginationNext
                    onClick={handleNext}
                    className={cn(
                        "flex items-center cursor-pointer border border-gray-200 bg-gray-200 px-3 py-1 rounded-md",
                        currentPage == totalPages && "visibility-hidden opacity-0"
                    )}
                >
                    Suivant
                </PaginationNext>
            </Pagination>
        </div>
    );
};
