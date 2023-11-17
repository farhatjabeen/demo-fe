import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import CustomCombinedButton from "../../components/common/adminButton";
import Table from "../../components/tables";
import Pagination from "../../components/common/pagination";
import Tabs from "../../components/tabs";
function User() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const handleReset = (tab) => {
    if (tab === 1) {
      setSearchTerm1("");
    } else if (tab === 2) {
      setSearchTerm2("");
    }
  };
  const handleSearch = (tab) => {
    if (tab === 1) {
      // Search logic for tab 1
    } else if (tab === 2) {
      // Search logic for tab 2
    }
  };

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handlePageChange1 = (pageNumber) => {
    setCurrentPage1(pageNumber);
  };
  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
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
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
    { id: "#1124", userName: "Item E", listingCount: "Chennai,India", mailID: "16/10/2023;0.00", mobileNumber: "1234567891" },
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
    { id: "#1543", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1542", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1543", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1143", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
    { id: "#1124", companyName: "test", category: "12", contactName: "16/10/2023;0.00", mailID: "Nithin", contactPhone: "1234567891", listingCount: "12" },
  ];
  const itemsPerPage = 5;
  const totalItems1 = data2.length;
  const totalPages1= Math.ceil(totalItems1 / itemsPerPage);
  const totalItems2 = data3.length;
  const totalPages2= Math.ceil(totalItems2 / itemsPerPage);

  const displayedData2 = data2.slice((currentPage1 - 1) * itemsPerPage, currentPage1 * itemsPerPage);
  const displayedData3 = data3.slice((currentPage2 - 1) * itemsPerPage, currentPage2 * itemsPerPage);
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
            <Table headers={headers2} data={displayedData2} />
            <Pagination
              isBlueBackground={true}
              currentPage={currentPage1}
              totalPages={totalPages1}
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
                  onClick={ () => handleReset(2)}
                  isReset={true}
                  buttonColor="blue"
                />
              </div>
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Search"
                  icon={<BsSearch size={20} className="mr-2" />}
                  onClick={ () => handleSearch(2)}
                  isReset={true}
                  buttonColor="other"
                />
              </div>
            </div>
            <Table headers={headers3} data={displayedData3} />
            <Pagination
              isBlueBackground={true}
              currentPage={currentPage2}
              totalPages={totalPages2}
              onPageChange={handlePageChange2}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default User;

