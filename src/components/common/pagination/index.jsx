import React from "react";

const Pagination = ({ isBlueBackground, currentPage, totalPages, onPageChange }) => {
  const backgroundColor = isBlueBackground ? "bg-blue text-white" : "bg-primary-color text-white";

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      const firstPage = renderPageButton(1);
      const lastPage = renderPageButton(totalPages);

      pageNumbers.push(firstPage);
      const start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2);
      const end = Math.min(start + maxVisiblePages - 1, totalPages - 1);
      if (start > 2) {
        pageNumbers.push(renderDots());
      }
      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (end < totalPages - 1) {

        pageNumbers.push(renderDots());
      }
      pageNumbers.push(lastPage);
    }
    return pageNumbers;
  };
  const renderPageButton = (pageNumber) => (
    <a
      key={pageNumber}
      href="#"
      className={`relative inline-flex items-center px-4 py-2 rounded-md text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue mr-1 ${currentPage === pageNumber ? backgroundColor : "text-black"
        }`}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </a>
  );
  const renderDots = () => (
    <span className="relative inline-flex items-center px-2 py-2 text-gray-400 ">
      ...
    </span>
  );
  return (
    <div className="flex  justify-center">
      <div className="flex items-center justify-between">
        <div>
          <nav className="inline-flex rounded-md ">
            <a
              href="#"
              className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray focus:z-20 focus:outline-offset-0 mr-1
           ${currentPage === 1 ? 'cursor-not-allowed  text-grey' : ''
                }`}
              onClick={() => {
                if (currentPage === 1) 
                  onPageChange(currentPage)
                else
                  onPageChange(currentPage - 1)
              }
              }
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {renderPageNumbers()}

            <a
              href="#"
              className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray focus:z-20 focus:outline-offset-0
            ${currentPage === totalPages ? 'cursor-not-allowed  text-grey' : ''
                }`}
              onClick={() => 
                {
                  if(currentPage===totalPages)
                  onPageChange(currentPage)
                else
                onPageChange(currentPage+1)
                }
                }
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>

  );
};

export default Pagination;
