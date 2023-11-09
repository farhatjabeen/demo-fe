import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchCards from '../../components/searchCards';
import { useParams } from 'react-router';

export default function FindMissingItem() {
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);
  const newKey = useParams();

  useEffect(() => {
    if (newKey.itemName && newKey.location) {
      axios.get('https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu')
        .then(response => {
          const filteredData = response.data.filter(f => f.itemname.toLowerCase().includes(newKey.itemName.toLowerCase()) && f.location.toLowerCase().includes(newKey.location.toLowerCase()));
          console.log(filteredData, 'filteredData')
          setData(filteredData);
        })
        .catch(er => console.log(er));
    }
  }, [newKey]);

  const handleSearch = (() => {
    if (searchKey) {
      axios.get('https://64dc7b7ce64a8525a0f68ee2.mockapi.io/Venu')
        .then(response => {
          const filteredData = response.data.filter(f => f.itemname.toLowerCase().includes(searchKey));
          console.log(filteredData, 'filteredData')
          setData(filteredData);
        })
        .catch(er => console.log(er));
    }
  });


  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="font-bold text-4xl mb-10">
        Search results
      </h1>

      <div className='xl:h-20 xl:w-4/6 md:h-20 md:w-4/5 sm:h-20 sm:w-4/5 rounded-3xl bg-white border border-solid border-[#DDDDDD] flex items-center justify-center'>
        <input type='text' placeholder='Search...' className='xl:w-9/12 p-4 xl:h-14 sm:h-13 sm:w-8/12 rounded-2xl border border-solid border-[#B6B6B6]' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
        <button className='xl:w-1/5 sm:w-1/4 h-14 rounded-2xl border border-solid border-[#FFFFFF] text-2xl font-semibold text-white bg-primary-color ml-3.5' onClick={handleSearch}>Search</button>
      </div>

      <div className='flex flex-wrap justify-center items-center xl:w-10/12 md:w-9/12 sm:w-11/12 mt-12'>
        {data.map((items, i) => {
          return (
            <div className='h-5/6 sm:w-60 md:w-64 xl:w-80 sm:flex sm:items-center'>
              <SearchCards key={i} idx={i} itemId={items.id} itemName={items.itemname} location={items.location} date={items.date} time={items.time} />
            </div>
          );
        })}
      </div>

      <div className='bg-[#FFFAE9] mt-12 xl:h-52 md:h-52 sm:h-44 xl:w-3/4 md:w-3/4 sm:w-11/12 flex flex-col justify-center'>
        <div className='flex justify-center xl:font-bold xl:text-3xl md:font-bold md:text-3xl sm:font-semibold sm:text-xl'>This is the end of the list</div>
        <div className='font-medium flex justify-center xl:text-base md:text-base sm:text-xs'>Subscribe and send an alert and Ilost will ping you if your item is found</div>
        <div className='flex justify-center'><button className='xl:h-11 xl:w-44 md:h-11 md:w-44 sm:h-9 sm:w-36 rounded-lg bg-primary-color mt-4'>Send an Alert</button></div>
      </div>

    </div>
  );
}
