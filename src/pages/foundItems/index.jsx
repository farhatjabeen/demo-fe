import { React, useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { FaRotateLeft } from "react-icons/fa6";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
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

  const handleTermChange = (e) =>{
    const valueNow = e.target.value;
    setSearchTerm(e.target.value)
    console.log(searchTerm,"searchTerm")
    console.log(isNaN(+searchTerm),"isNaN(+searchTerm")
    if(isNaN(+valueNow)){
      setItemName(searchTerm);
      setItemCode("");
    }else{
      setItemCode(searchTerm);
      setItemName("");
    }
  }

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    dispatch(adminFetchItems(currentPage, PageLimit))
  };
  const handleSearch = async() => {
    
    if(itemCode || itemName){
      dispatch(adminFetchItems(currentPage, PageLimit, selectedCategory, itemName, itemCode));
    }
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
            className=" border border-gray3 placeholder:text-gray3 pl-2 basis-5/12 rounded-md mr-4 py-2 "
            value={searchTerm}
            onChange={handleTermChange}
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
              icon={<FaRotateLeft size={18} className="mr-3 text-gray4" />}
              onClick={handleReset}
              isReset={true}
              buttonColor="blue"
              additionalClasses="py-3"
            />
          </div>
          <div className="basis-1/12">
            <CustomCombinedButton
              text="Search"
              icon={<IoSearchSharp size={20} className="mr-3" />}
              onClick={handleSearch}
              isReset={true}
              buttonColor="other"
              additionalClasses="py-3"
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
