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
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

function FoundItems() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const PageLimit = 10;
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchItem = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const tableData = useSelector(foundItemDetails);
  const items = useSelector(itemDropdown)
  const dropdownValues = items ? Object.values(items) : [];
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageNow = searchParams.get('page');
  const currentItem = searchParams.get('item');
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    dispatch(itemDropdownValues());
    if (currentItem || currentCategory) {
      const searchNow = dispatch(adminFetchItems(page, PageLimit, currentCategory ? currentCategory : "", currentItem ? currentItem : ""));
      searchNow.then((res) => {
        setData(res?.data)
      })
    }

    if (!currentItem && !currentCategory && pageNow) {
      setSearchTerm("");
      setSelectedCategory("");
      const searchNow = dispatch(adminFetchItems(page));
      searchNow.then((res) => {
        setData(res?.data)
      })
    }
  }, [location.search]);

  const handleExport = () => {
    dispatch(adminExportItems(currentCategory ? currentCategory : "", currentItem ? currentItem : ""))
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    navigate(`/admin/user/foundItems?page=1`)
    dispatch(adminFetchItems(pageNow, PageLimit))
  };

  const handleSearch = () => {
    if (selectedCategory && !searchTerm) {
      navigate(`/admin/user/foundItems?category=${selectedCategory}&page=1`)
    } else if (selectedCategory && searchTerm) {
      navigate(`/admin/user/foundItems?item=${searchTerm}&category=${selectedCategory}&page=1`)
    } else if (searchTerm && !selectedCategory) {
      navigate(`/admin/user/foundItems?item=${searchTerm}&page=1`)
    }
    const searchNow = dispatch(adminFetchItems(pageNow, PageLimit, currentCategory, currentItem));
    searchNow.then((res) => {
      setData(res?.data)
    })
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
    if (currentCategory && !currentItem) {
      navigate(`/admin/user/foundItems?category=${currentCategory}&page=${pageNumber}`)
    } else if (currentCategory && currentItem) {
      navigate(`/admin/user/foundItems?item=${currentItem}&category=${currentCategory}&page=${pageNumber}`)
    } else if (currentItem && !currentCategory) {
      navigate(`/admin/user/foundItems?item=${currentItem}&page=${pageNumber}`)
    } else if (!currentItem && !currentCategory) {
      navigate(`/admin/user/foundItems?page=${pageNumber}`)
    }
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="basis-5/12">
            <DropdownMenu
              dropdownValues={dropdownValues}
              value={selectedCategory}
              onChange={setSelectedCategory}
              valueFromLink={currentCategory && currentCategory?.length > 0 ? currentCategory : ""}
              placeholder="Filter by Category"
              additionalClass="h-14"
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
      <Table
        headers={tableHeaders}
        category={searchItem?.item}
        searchTerm={searchTerm}
        data={searchItem.item ? data?.list : tableData?.list}
        showEdit={true}
        context="foundItems"
        currentPage={pageNow} />

      <Pagination
        isBlueBackground={true}
        currentPage={searchItem.item ? data?.page : tableData?.pageMeta?.page}
        totalPages={searchItem.item ? data?.totalPages : tableData?.pageMeta?.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FoundItems;
