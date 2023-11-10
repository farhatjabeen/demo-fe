import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between ">
      <div>
        <nav className="inline-flex rounded-md ">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mr-1"
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
          <a
            href="/signin"
            aria-current="page"
            className="relative z-10 inline-flex  rounded-md items-center bg-blue px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue mr-1"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold   rounded-md  text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex mr-1"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold   rounded-md  text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex mr-1"
          >
            3
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold    rounded-md text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex mr-1"
          >
            4
          </a>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold   rounded-md  text-gray-700 focus:outline-offset-0 mr-1">
            ...
          </span>
          <a
            href="#"
            className="relative hidden items-center px-4 py-2 text-sm font-semibold   rounded-md  text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex mr-1"
          >
            7
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold   rounded-md text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex mr-1"
          >
            8
          </a>
          <a
            href="#"
            className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
  );
};

export default Pagination;
