import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationDemo({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationDemoProps) {
  // Number of page buttons to show before and after the current page
  const pageRange = 1;
  
  // Calculate the range of pages to show
  const getPageNumbers = () => {
    const pages = [];

    // Start and end page range
    let start = Math.max(currentPage - pageRange, 1);
    let end = Math.min(currentPage + pageRange, totalPages);

    // Adjust start and end if there are more pages before the start
    if (currentPage - pageRange < 1) {
      end = Math.min(end + (pageRange - (currentPage - 1)), totalPages);
    }
    
    // Adjust start and end if there are more pages after the end
    if (currentPage + pageRange > totalPages) {
      start = Math.max(start - ((currentPage + pageRange) - totalPages), 1);
    }
    
    // Push pages to the list
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="h-8">
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            className="h-8 "
          />
        </PaginationItem>
        {currentPage > pageRange + 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
              className="h-8 w-8"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > pageRange + 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - pageRange - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        {totalPages > pageRange + 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
