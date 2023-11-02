import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineRefresh } from 'react-icons/md';
import CustomCombinedButton from '../../components/common/button';
import Table from '../../components/tables';
import Pagination from '../../components/common/pagination';

function User() {
  const handleReset = () => {  };
  const handleSearch = () => {  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <div>
        <h1 className="text-black font-bold my-10 text-4xl">User Management</h1>
        <div className="flex ">
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
      </div>
      <Table />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default User;
