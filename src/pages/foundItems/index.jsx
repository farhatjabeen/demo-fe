import { React, useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import DropdownMenu from "../../components/common/dropdown";
import CustomCombinedButton from "../../components/common/adminButton";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { adminExportItems, adminFetchItems, foundItemDetails, itemDropdown, itemDropdownValues } from '../../redux/reducers/itemsSlice';

function FoundItems() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PageLimit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const tableData = useSelector(foundItemDetails);
  const items = useSelector(itemDropdown)
  const dropdownValues = items ? Object.values(items) : [];

  useEffect(() => {
    dispatch(adminFetchItems(currentPage, PageLimit))
  }, [dispatch, currentPage, PageLimit]);

  useEffect(() => {
    dispatch(itemDropdownValues());
  }, []);
  useEffect(() => {
    dispatch(itemDropdownValues());
  }, []);


  const handleExport = () => {
    dispatch(adminExportItems())
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };
  const handleSearch = () => {
    dispatch(adminFetchItems(currentPage, PageLimit, selectedCategory, searchTerm));
  };


  const tableHeaders = [
    { key: "itemCode", label: "Item ID" },
    { key: "itemName", label: "Item Name" },
    { key: "location", label: "Location" },
    { key: "foundTime", label: "Time Found" },
    { key: "userName", label: "Found By" },
    { key: "mobileNumber", label: "Phone Number" },
    { key: "action", label: "Actions" },
  ];


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="m-4">
      <div className="flex justify-between mt-10">
        <div>
          <h1 className="text-black font-bold text-4xl">Found Items</h1>
        </div>
        <div className="flex">
          <CustomCombinedButton
            text="Export"
            icon={<AiOutlineArrowUp className="mr-1" />}
            onClick={handleExport}
            isReset={false}
            buttonColor="blue"

          />
        </div>
      </div>
      <div className="my-8">
        <div className="flex ">
          <input
            type="text"
            placeholder="Search using item id or name"
            className=" border text-grey pl-2 basis-5/12 rounded-md mr-4 py-2 "
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="basis-5/12">
            <DropdownMenu
              dropdownValues={dropdownValues}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filter by Category"
            />
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
      <Table headers={tableHeaders} data={tableData?.list} showEdit={true} context="foundItems" />

      <Pagination
        isBlueBackground={true}
        currentPage={tableData?.pageMeta?.page}
        totalPages={tableData?.pageMeta?.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FoundItems;
