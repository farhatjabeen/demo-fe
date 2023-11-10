import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import CustomCombinedButton from "../../components/common/button";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import Tabs from "../../components/tabs";
function User() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleReset = () => { 
    setSearchTerm("");
  };
  const handleSearch = () => { };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const headers2 = [
    { key: "id", label: "User ID" },
    { key: "userName", label: "User Name" },
    { key: "listingCount", label: "Listing Count" },
    { key: "mailID", label: "Mail ID" },
    { key: "mobileNumber", label: "Mobile Number" },
  ];

  const data2 = [
    { id: "#1543", userName: "Item A", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1542", userName: "Item B", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1543", userName: "Item C", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1143", userName: "Item D", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
  ];
  const headers3= [
    { key: "id", label: "Business ID" },
    { key: "companyName", label: "Company Name" },
    { key: "category", label: "Category" },
    { key: "contactName", label: "Contact Name" },
    { key: "mailID", label: "Mail ID" },
    { key: "contactPhone", label: "Contact Phone" },
    { key: "listingCount", label: "Listing Count" },
  ];

  const data3 = [
    { id: "#1543", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891" ,listingCount:"12"},
    { id: "#1542", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891" ,listingCount:"12"},
    { id: "#1543", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891" ,listingCount:"12"},
    { id: "#1143", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891" ,listingCount:"12"},
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891" ,listingCount:"12"},
  ];
  return (
    <>
      <div className="m-4">
        <h1 className="text-black font-bold mb-4 text-4xl mt-10">User Management</h1>
        <Tabs className="my-8">
          <div label="General ">
            <div className="flex my-8">
              <input
                type="text"
                placeholder="Search"
                className="border pl-2 basis-10/12 rounded-md text-grey py-2"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} 
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
            <Table headers={headers2} data={data2} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div label="Business">
            <div className="flex my-8">
              <input
                type="text"
                placeholder="Search"
                className="border pl-2 basis-10/12 rounded-md text-grey py-2"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} 
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
            <Table headers={headers3} data={data3}/>
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
