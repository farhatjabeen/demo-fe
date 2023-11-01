import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchCards from "../../components/searchCards";

export default function FindMissingItem() {
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const newkey = localStorage.getItem("searchkey");
  useEffect(() => {
    if (newkey) {
      axios
        .get("https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu")
        .then((response) => {
          const filteredData = response.data.filter((f) =>
            f.itemname.toLowerCase().includes(newkey)
          );
          console.log(filteredData, "filteredData");
          setData(filteredData);
        })
        .catch((er) => console.log(er));
    }
  }, [newkey]);

  const handleSearch = () => {
    if (searchKey) {
      axios
        .get("https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu")
        .then((response) => {
          const filteredData = response.data.filter((f) =>
            f.itemname.toLowerCase().includes(searchKey)
          );
          console.log(filteredData, "filteredData");
          setData(filteredData);
        })
        .catch((er) => console.log(er));
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="h-[43px] w-[247px] font-bold text-[35px] mb-10">
        Search results
      </h1>

      <div className="h-[71px] w-[868px] rounded-[16px] bg-white border border-solid border-[#DDDDDD] flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-[615px] h-[53px] rounded-[12px] border border-solid border-[#B6B6B6]"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button
          className="w-[216px] h-[54px] rounded-[16px] border border-solid border-[#FFFFFF] text-2xl font-semibold text-white bg-[#E8B810] ml-[13px]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center w-[1300px] ml-[110px] mt-[50px]">
        {data.map((items, i) => {
          return (
            <SearchCards
              idx={i}
              itemName={items.itemname}
              location={items.location}
              date={items.date}
              time={items.time}
            />
          );
        })}
      </div>

      <div className="bg-[#FFFAE9] h-[212px] w-[1224px] flex flex-col justify-center">
        <div className="flex justify-center font-bold text-[32px]">
          This is the end of the list
        </div>
        <div className="font-medium flex justify-center text-base">
          Subscribe and send an alert and Ilost will ping you if your item is
          found
        </div>
        <div className="flex justify-center">
          <button className="h-[43px] w-[171px] rounded-[7.5px] bg-[#E8B810] mt-[20px]">
            Send an Alert
          </button>
        </div>
      </div>
    </div>
  );
}
