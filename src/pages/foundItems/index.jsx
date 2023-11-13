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
  const handleAddItem = () => { };
  const handleExport = () => { };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };
  const handleSearch = () => { };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const headers1 = [
    { key: "id", label: "Item ID" },
    { key: "itemName", label: "Item Name" },
    { key: "location", label: "Location" },
    { key: "timeFound", label: "Time Found" },
    { key: "foundby", label: "Found by" },
    { key: "phoneNumber", label: "Phone number" },
  ];

  const data1 = [
    { id: "#1543", itemName: "Item A", location: "Chennai,India", timeFound: "16/10/2023;0.00", foundby: "Nithin", phoneNumber: "1234567891" },
    { id: "#1542", itemName: "Item B", location: "Chennai,India", timeFound: "16/10/2023;0.00", foundby: "Nithin", phoneNumber: "1234567891" },
    { id: "#1543", itemName: "Item C", location: "Chennai,India", timeFound: "16/10/2023;0.00", foundby: "Nithin", phoneNumber: "1234567891" },
    { id: "#1143", itemName: "Item D", location: "Chennai,India", timeFound: "16/10/2023;0.00", foundby: "Nithin", phoneNumber: "1234567891" },
    { id: "#1124", itemName: "Item E", location: "Chennai,India", timeFound: "16/10/2023;0.00", foundby: "Nithin", phoneNumber: "1234567891" },
  ];

  return (
    <>
      <div className="m-4">
        <div className="flex justify-between mt-10">
          <div>
            <h1 className="text-black font-bold text-4xl">Found Items</h1>
          </div>
          <div className="flex">
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
        </div>
        {/* Filters */}
        <div className="my-8">
          <div className="flex ">
            <input
              type="text"
              placeholder="Search by item id or name"
              className=" border text-grey pl-2 basis-5/12 rounded-md mr-4 py-2 "
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="basis-5/12">
              <DropdownMenu categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => setSelectedCategory(category)} />
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
        <Table headers={headers1} data={data1} />
        <Pagination
          isBlueBackground={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default FoundItems;


