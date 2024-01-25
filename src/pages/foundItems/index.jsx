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
import { useLocation, useNavigate, useParams } from "react-router-dom";

function FoundItems() {
  const [selectedCategory, setSelectedCategory] = useState("");
    
  const [pageChange, setPageChange] = useState();
  const PageLimit = 10;
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchItem = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const tableData = useSelector(foundItemDetails);
  const [currentPage, setCurrentPage] = useState(tableData?.pageMeta?.page);
  const items = useSelector(itemDropdown)
  const dropdownValues = items ? Object.values(items) : [];
  const location = useLocation();
localStorage.setItem("firstpage",true);
  useEffect(() => {
    const pageNow = localStorage.getItem("firstpage")
    dispatch(adminFetchItems(currentPage, PageLimit))
    if (!searchItem.item) {
      navigate('/admin/user/foundItems')
    }
  }, [currentPage, PageLimit]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    if (page) {
      setPageChange(parseInt(page, 10));
    }
  }, [location.search]);

  useEffect(() => {
    dispatch(itemDropdownValues());
    if (searchItem.item || searchItem.category || selectedCategory) {
        const searchNow = dispatch(adminFetchItems(pageChange, PageLimit, searchItem.category ? searchItem.category : selectedCategory, !searchTerm ? "" : searchItem.item, ));
        searchNow.then((res) => {
          setData(res?.data)
        })
    }
  }, [searchItem]);

  // useEffect(()=>{
  //   searchItems();
  // const searchNow = dispatch(adminFetchItems(currentPage, PageLimit, selectedCategory, itemName, itemCode));
  // searchNow.then((res)=>{
  //   console.log(res,"res")
  //   setData(res?.data?.list)
  // })
  // },[searchTerm])

  // const searchItems = async()=>{
  //   const searchTermNow = searcItem.item;
  //     console.log(searchTermNow,"searcItem.item")
  //     if(isNaN(+searchTerm)){
  //       setItemName(searchTermNow);
  //       setItemCode("");
  //       console.log(itemName,"itemName")
  //     }else{
  //       setItemCode(searcItem.item);
  //       setItemName("");
  //       console.log(itemCode,"itemCode")
  //     }
  // }

  const handleExport = () => {
    dispatch(adminExportItems(selectedCategory,searchTerm))
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    navigate(`/admin/user/foundItems`)
    dispatch(adminFetchItems(currentPage, PageLimit))
  };

  const handleSearch = async () => {
    if (selectedCategory&&!searchTerm) {
      navigate(`/admin/user/foundItems/${selectedCategory}`)
    } else if(selectedCategory&&searchTerm){
      navigate(`/admin/user/foundItems/${searchTerm}/${selectedCategory}`)
    } else if(searchTerm&&!selectedCategory){
      navigate(`/admin/user/foundItems/${searchTerm}`)
    }
    const searchNow = dispatch(adminFetchItems(currentPage, PageLimit, selectedCategory, searchTerm));
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="basis-5/12">
            <DropdownMenu
              dropdownValues={dropdownValues}
              value={selectedCategory}
              onChange={setSelectedCategory}
              valueFromLink={searchItem.category ? searchItem.category : ""}
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
        category={searchItem.category ? searchItem.category : selectedCategory}
        searchTerm={searchTerm}
        data={searchItem.item ? data?.list : tableData?.list}
        showEdit={true}
        context="foundItems"
        currentPage={currentPage} />

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
