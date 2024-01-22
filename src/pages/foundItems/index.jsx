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
import { useNavigate, useParams } from "react-router-dom";

function FoundItems() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PageLimit = 10;
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searcItem = useParams();
  const [searchTerm, setSearchTerm] = useState(searcItem.item ? searcItem.item : '');
  const tableData = useSelector(foundItemDetails);
  const items = useSelector(itemDropdown)
  const dropdownValues = items ? Object.values(items) : [];

  useEffect(() => {
    dispatch(adminFetchItems(currentPage, PageLimit))
  }, [currentPage, PageLimit]);

  useEffect(() => {
    dispatch(itemDropdownValues());
    if (searcItem.item || searcItem.category || selectedCategory) {
      setSearchTerm(searcItem.item)
      if (isNaN(+searcItem.item)) {
        setItemName(searcItem.item);
        setItemCode("");
        const searcNow = dispatch(adminFetchItems(currentPage, PageLimit, searcItem.category ? searcItem.category : selectedCategory, searcItem.item, itemCode));
        searcNow.then((res) => {
          setData(res?.data)
        })

      } else {
        setItemCode(searcItem.item);
        setItemName("");
        const searcNow = dispatch(adminFetchItems(currentPage, PageLimit, searcItem.category ? searcItem.category : selectedCategory, itemName, searcItem.item));
        console.log(searcNow,"seachnow")
        searcNow.then((res) => {
          setData(res?.data)
        })
      }
      console.log(searcItem.item, "st")

    }


  }, []);

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

  useEffect(() => {
    console.log(searchTerm, "searchTerm")
    console.log(isNaN(+searchTerm), "isNaN(+searchTerm")
    if (isNaN(+searchTerm)) {
      setItemName(searchTerm);
      setItemCode("");
    } else {
      setItemCode(searchTerm);
      setItemName("");
    }

  }, [searchTerm,searcItem.category]);

  const handleExport = () => {
    dispatch(adminExportItems())
  };

  const handleTermChange = (e) => {
    const valueNow = e.target.value;
    setSearchTerm(valueNow)
    console.log(searchTerm, "searchTerm")
    console.log(isNaN(+searchTerm), "isNaN(+searchTerm")
    if (isNaN(+valueNow)) {
      setItemName(searchTerm);
      setItemCode("");
    } else {
      setItemCode(searchTerm);
      setItemName("");
    }
  }

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    dispatch(adminFetchItems(currentPage, PageLimit))
  };
  const handleSearch = async () => {
    if(selectedCategory){
      navigate(`/admin/user/foundItems/${searchTerm}/${selectedCategory}`)
    }else{
    navigate(`/admin/user/foundItems/${searchTerm}`)
    }
    const searchNow = dispatch(adminFetchItems(currentPage, PageLimit, selectedCategory, itemName, itemCode));
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
              valueFromLink={searcItem.category ? searcItem.category : ""}
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
      <Table headers={tableHeaders} category={searcItem.category ? searcItem.category : selectedCategory} searchTerm={searchTerm} data={searcItem.item ? data?.list : tableData?.list} showEdit={true} context="foundItems" />

      <Pagination
        isBlueBackground={true}
        currentPage={searcItem.item ? data?.page : tableData?.pageMeta?.page}
        totalPages={searcItem.item ? data?.totalPages : tableData?.pageMeta?.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FoundItems;
