import { React, useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import DropdownMenu from "../../components/common/dropdown";
import CustomCombinedButton from "../../components/common/adminButton";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { adminfetchItems, foundItemDetails } from '../../redux/reducers/itemsSlice';

function FoundItems() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const tableDatas = useSelector(foundItemDetails);

  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const handleExport = () => { };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };
  const handleSearch = () => { };
  const headers1 = [
    { key: "id", label: "User ID" },
    { key: "itemName", label: "Item Name" },
    { key: "location", label: "Location" },
    { key: "timefound", label: "Time Found" },
    { key: "found by", label: "Found By" },
    { key: "mobileNumber", label: "Phone Number" },
  ];

  useEffect(() => {
    dispatch(adminfetchItems())
  },[dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              placeholder="Search by item id or name"
              className=" border text-grey pl-2 basis-5/12 rounded-md mr-4 py-2 "
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="basis-5/12">
              <DropdownMenu categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => setSelectedCategory(category)}
                isFilterMode={true} />
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
        <Table headers={headers1} data={Object.values(tableDatas.list)} showEdit={true} />

        <Pagination
          isBlueBackground={true}
          currentPage={tableDatas.pageMeta.page}
          totalPages={tableDatas.pageMeta.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default FoundItems;



