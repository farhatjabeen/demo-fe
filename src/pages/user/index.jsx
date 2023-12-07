import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import CustomCombinedButton from "../../components/common/adminButton";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import Tabs from "../../components/tabs";
import { useDispatch, useSelector } from 'react-redux';
import { adminFetchUser, userDetails, adminFetchBusinessUser, businessUserDetails } from "../../redux/reducers/itemsSlice";


function User() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const dispatch = useDispatch();
  const [PageLimit, setPageLimit] = useState(10);
  const tableData = useSelector(userDetails);
  const tableBusinessData = useSelector(businessUserDetails);

  useEffect(() => {
    dispatch(adminFetchUser(currentPage, PageLimit))
  }, [dispatch, currentPage, PageLimit]);
  useEffect(() => {
    dispatch(adminFetchBusinessUser(currentPage, PageLimit))
  }, [dispatch, currentPage, PageLimit]);

  const handleReset = (tab) => {
    if (tab === 1) {
      setSearchTerm1("");
    } else if (tab === 2) {
      setSearchTerm2("");
    }
  };
  const handleSearch = (tab) => {
    if (tab === 1) {
    } else if (tab === 2) {
    }
  };


  const handlePageChange1 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChange2 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const userHeaders = [
    { key: "_id", label: "User ID" },
    { key: "userName", label: "User Name" },
    { key: "createdAt", label: "Listing Count" },
    { key: "emailMailId", label: "Mail ID" },
    { key: "mobileNumber", label: "Mobile Number" },
    // { key: "actions", label: "Actions" },

  ];

  const businessHeaders = [
    { key: "_id", label: "Business ID" },
    { key: "companyName", label: "Company Name" },
    { key: "companyCategory", label: "Category" },
    { key: "contactName", label: "Contact Name" },
    { key: "emailMailId", label: "Mail ID" },
    { key: "mobileNumber", label: "Contact Phone" },
    { key: "listingCount", label: "Listing Count" },
    // { key: "actions", label: "Actions" },
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
                value={searchTerm1}
                onChange={(event) => setSearchTerm1(event.target.value)}
              />
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Reset"
                  icon={<MdOutlineRefresh size={20} className="mr-2" />}
                  onClick={() => handleReset(1)}
                  isReset={true}
                  buttonColor="blue"
                />
              </div>
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Search"
                  icon={<BsSearch size={20} className="mr-2" />}
                  onClick={() => handleSearch(1)}
                  isReset={true}
                  buttonColor="other"
                />
              </div>
            </div>
            <Table headers={userHeaders} data={tableData?.list} />
            <Pagination
              isBlueBackground={true}
              currentPage={tableData?.pageMeta?.page}
              totalPages={tableData?.pageMeta?.totalPages}
              onPageChange={handlePageChange1}
            />
          </div>
          <div label="Business">
            <div className="flex my-8">
              <input
                type="text"
                placeholder="Search"
                className="border pl-2 basis-10/12 rounded-md text-grey py-2"
                value={searchTerm2}
                onChange={(event) => setSearchTerm2(event.target.value)}
              />
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Reset"
                  icon={<MdOutlineRefresh size={20} className="mr-2" />}
                  onClick={() => handleReset(2)}
                  isReset={true}
                  buttonColor="blue"
                />
              </div>
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Search"
                  icon={<BsSearch size={20} className="mr-2" />}
                  onClick={() => handleSearch(2)}
                  isReset={true}
                  buttonColor="other"
                />
              </div>
            </div>
            <Table headers={businessHeaders} data={tableBusinessData?.list} />
            <Pagination
              isBlueBackground={true}
              currentPage={tableBusinessData?.pageMeta?.page}
              totalPages={tableBusinessData?.pageMeta?.totalPages}
              onPageChange={handlePageChange2}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default User;

