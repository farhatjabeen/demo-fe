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
  // Local states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUserTerm, setSearchUserTerm] = useState("");
  const [searchBusinessTerm, setSearchBusinessTerm] = useState("");
  const PageLimit = useState(10);

  const tableData = useSelector(userDetails);
  const tableBusinessData = useSelector(businessUserDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminFetchUser(currentPage, PageLimit))
    dispatch(adminFetchBusinessUser(currentPage, PageLimit))
  }, [dispatch, currentPage, PageLimit]);

  const handleReset = (tab) => {
    if (tab === 1) {
      setSearchUserTerm("");
    } else if (tab === 2) {
      setSearchBusinessTerm("");
    }
  };

  const handleSearch = (tab) => {
    if (tab === 1) {
      dispatch(adminFetchUser(currentPage, PageLimit, searchUserTerm));
    } else if (tab === 2) {
      dispatch(adminFetchBusinessUser(currentPage, PageLimit, searchBusinessTerm));
    }
  };


  const handlePageChange1 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChange2 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const userHeaders = [
    { key: "userCode", label: "User ID" },
    { key: "name", label: "User Name" },
    { key: "count", label: "Listing Count" },
    { key: "emailMailId", label: "Mail ID" },
    { key: "mobileNumber", label: "Mobile Number" },
    { key: "action", label: "Actions" },

  ];

  const businessHeaders = [
    { key: "userCode", label: "Business ID" },
    { key: "companyName", label: "Company Name" },
    { key: "companyCategory", label: "Category" },
    { key: "name", label: "Contact Name" },
    { key: "emailMailId", label: "Mail ID" },
    { key: "mobileNumber", label: "Contact Phone" },
    { key: "count", label: "Listing Count" },
    { key: "action", label: "Actions" },
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
                value={searchUserTerm}
                onChange={(event) => setSearchUserTerm(event.target.value)}
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
            <Table headers={userHeaders} data={tableData?.list} context="user" />
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
                value={searchBusinessTerm}
                onChange={(event) => setSearchBusinessTerm(event.target.value)}
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
            <Table headers={businessHeaders} data={tableBusinessData?.list} context="businessUser" />
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
