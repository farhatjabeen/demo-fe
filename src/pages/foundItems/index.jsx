import { React, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import DropdownMenu from "../../components/common/dropdown";
import CustomCombinedButton from "../../components/common/button";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";

function FoundItems() {
  const handleAddItem = () => {};
  const handleExport = () => {};

  const handleReset = () => {};
  const handleSearch = () => {};

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="m-4">

        <div>
          <div className="w-full flex  justify-end  mt-20  ">
            <CustomCombinedButton
              text="Export"
              icon={<AiOutlineArrowUp className="mr-2" />}
              onClick={handleExport}
              isReset={false}
              buttonColor="blue"
            />

            <CustomCombinedButton
              text="Add Found Item"
              icon={<HiPlus size={20} className="mr-2" />}
              onClick={handleAddItem}
              isReset={true}
              buttonColor="other"
            />
          </div>
          <div>
            <h1 className="text-black font-bold my-10 text-4xl">Found Items</h1>
          </div>
          <div className="flex ">
            <input
              type="text"
              placeholder="Search by item id or name"
              className=" border pl-2 basis-5/12 rounded-md mr-4 py-2 "
            />
            <div className="basis-5/12">
              <DropdownMenu />
            </div>
            <div className="basis-1/12">
              <CustomCombinedButton
                text="Reset"
                icon={<MdOutlineRefresh size={20} className="mr-2" />}
                onClick={handleReset}
                isReset={true}
                buttonColor="blue"
              />
            </div>
            <div className="basis-1/12">
              <CustomCombinedButton
                text="Search"
                icon={<BsSearch size={20} className="mr-2" />}
                onClick={handleSearch}
                isReset={true}
                buttonColor="other"
              />
            </div>
          </div>
        </div>
        <Table />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default FoundItems;
