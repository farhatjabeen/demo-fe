import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import CustomCombinedButton from "../../components/common/button";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import Tabs from "../../components/tabs";
function User() { 
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
        <h1 className="text-black font-bold mb-4 text-4xl mt-32">User Management</h1>
        <Tabs>
          <div label="General">
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Search"
                className=" border pl-2 basis-10/12 rounded-md text-grey  py-2 "
              />

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
            <Table />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div label="Business">
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Search"
                className=" border pl-2 basis-10/12 rounded-md  py-2 "
              />

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
            <Table />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default User;
