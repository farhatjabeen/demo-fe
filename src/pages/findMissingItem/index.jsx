import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import Pagination from '../../components/common/pagination'
import TextInput from '../../components/common/textInput';
import SearchCards from '../../components/searchCards';
import useValidationResolver from '../../hooks/useValidationResolver';
import { searchByKeywordSchema } from '../../validations';
import { clearItemData, searchByLocation, searchItem, searchKey, resetSearchByLocation, locationDropdownValues, locationDetails } from '../../redux/reducers/itemsSlice';
import { Toast } from '../../components/toast';
import FormDropdown from '../../components/common/formDropdown';

export default function FindMissingItem() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParameters = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const [ValueByLocation,setValueByLocation] = useState([])
  const dispatch = useDispatch();
  const resolver = useValidationResolver(searchByKeywordSchema);
  const searchValue = useSelector(searchKey);
  const cities = useSelector(locationDetails);
    const citiesInSerbia = cities ? Object.values(cities) : [];
  const isLastPage = searchValue?.pageMeta?.page === searchValue?.pageMeta?.totalPages;
  const methods = useForm({
    defaultValues: {
      keyword: "",
      location:""
    },
    resolver
  });

  useEffect(() => {
    dispatch(locationDropdownValues())
}, [dispatch]);

  useEffect(() => {
    // const apiCall = async() =>{

      if (searchParameters?.location) {
        console.log(searchParameters?.location,"searchParameters?.location")
        setIsLoader(true)
        const locationItem = dispatch(searchByLocation(searchParameters.itemName, searchParameters.location, currentPage));
        locationItem.then((res)=>{
          setIsLoader(false)
          setValueByLocation(res?.data?.list)
        })
      } 
      if (searchParameters?.itemNameAgain) {
        setIsLoader(true)
        const keywordItem = dispatch(searchItem(searchParameters.itemNameAgain, currentPage));
        keywordItem.then((res)=>{
          setIsLoader(false)
          setValueByLocation(res?.data?.list)
        })
      }
    // }
    // apiCall();
  }, [searchParameters, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const submitData = async () => {
    try {
      const productName = methods.getValues();
      console.log(productName,"productname")
      if(productName.keyword && productName.location){
        navigate(`/findMissingItem/${productName.keyword}/${productName.location}`)
        console.log("hi from locate")
        
      } else if (productName.keyword) {
        navigate(`/findMissingItem/${productName.keyword}`)
        setIsLoader(true)
        const searchKeyword = await dispatch(searchItem(productName.keyword));
        if (searchKeyword) {
          setIsLoader(false)
        }
      } else {
        Toast({ type: 'error', message: 'Enter Item Name' })
      }
      
    } catch (error) {
      console.log("submitData errors", error)
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearItemData())
    }
  }, [])

  return (
    <div className="flex flex-col items-center mt-5 mb-20">
      <h1 className="font-bold text-4xl mb-10">
        Search results
      </h1>

      <div className='h-20 xl:w-9/12 md:w-8/12 sm:w-8/12 rounded-3xl bg-white border border-solid border-pantone flex items-center'>
        <FormProvider {...methods}>
          {/* <form onSubmit={(e) => submitData(e)} className='w-full flex'> */}
          <form onSubmit={methods.handleSubmit(submitData)} className='w-full flex'>

            <div className='flex w-9/12'>
              <TextInput
                type='text'
                placeholder='Search...'
                name="keyword"
                className='ml-3 p-4 xl:h-14 sm:h-13 w-96 rounded-2xl border border-solid border-greys'
                autoComplete="off"
                isSearchReport={true}
                errorClass="absolute xl:bottom-4 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                required
              />
              <FormDropdown
                placeholder="Location"
                name="location"
                editButton={true}
                optionButtonClass={`xl:w-96 xl:h-14 py-4 pl-4 xl:rounded-2xl md:h-12 md:w-52 md:rounded-xl sm:rounded-xl sm:w-40 sm:h-10 ml-2.5 border border-solid border-greys`}
                autoComplete="off"
                firstOptionName="Location"
                dropdownValues={citiesInSerbia}
                errorClass="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
              />
            </div>
            <div className='w-4/12 ml-7 mr-3 '>
              <button
                type='submit'
                className='cursor-pointer w-full h-14 rounded-2xl border border-solid border-white text-2xl font-semibold text-white bg-primary-color' >Search</button>
            </div>

          </form>
        </FormProvider>
      </div>

      {isLoader ?
        <p className='font-bold pt-24 flex justify-center ml-7 w-full text-md'>Loading...</p>
        :
        <div className='flex flex-wrap justify-center items-center w-full mr-7'>
          {ValueByLocation?.length ? ValueByLocation?.map((items, i) => {
            return (
              <div className='sm:w-60 md:w-52 xl:w-80 xl:ml-10 md:ml-5 mt-8 sm:flex sm:items-center'>
                <SearchCards key={i} idx={i} itemId={items._id} imageName={items.itemImage || ''} itemName={items.itemName} location={items.location} date={items.foundDate} time={items.foundTime} />
              </div>
            );
          })
            :
            <p className='font-bold pt-24 flex justify-center ml-7 w-full text-md'>No Data Found</p>}
        </div>}

      <div className='mb-10 mt-32'>
        <Pagination
          isBlueBackground={false}
          currentPage={searchValue?.pageMeta?.page}
          totalPages={searchValue?.pageMeta?.totalPages}
          onPageChange={handlePageChange} />
      </div>
      {isLastPage && (
        <div className='bg-light-yellow my-12 xl:h-52 md:h-52 sm:h-44 xl:w-3/4 md:w-3/4 sm:w-11/12 flex flex-col justify-center'>
          <div className='flex justify-center xl:font-bold xl:text-3xl md:font-bold md:text-3xl sm:font-semibold sm:text-xl'>This is the end of the list</div>
        </div>
      )}
    </div>
  );
}
