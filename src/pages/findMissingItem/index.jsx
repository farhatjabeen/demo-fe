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
import { clearItemData, searchByLocation, searchItem, searchKey, resetSearchByLocation } from '../../redux/reducers/itemsSlice';
import { Toast } from '../../components/toast';

export default function FindMissingItem() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParameters = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const resolver = useValidationResolver(searchByKeywordSchema);
  const searchValue = useSelector(searchKey);
  const isLastPage = searchValue?.pageMeta?.page === searchValue?.pageMeta?.totalPages;
  const methods = useForm({
    defaultValues: {
      keyword: ""
    },
    resolver
  });


  useEffect(() => {
    if (searchParameters?.location) {
      dispatch(searchByLocation(searchParameters.itemName, searchParameters.location, currentPage));
    }
    if (searchParameters?.itemNameAgain) {
      dispatch(searchItem(searchParameters.itemNameAgain, currentPage));
    }
  }, [searchParameters, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const submitData = async () => {
    try {
      const productName = methods.getValues();
      if (productName.keyword) {
        navigate(`/findMissingItem/${productName.keyword}`)
      } else {
        Toast({ type: 'error', message: 'Enter Item Name' })
      }
      setIsLoader(true)
      const searchKeyword = await dispatch(searchItem(productName.keyword));
      if (searchKeyword) {
        setIsLoader(false)
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

      <div className='h-20 xl:w-9/12 md:w-8/12 sm:w-8/12 rounded-3xl bg-white border border-solid border-[#DDDDDD] flex items-center'>
        <FormProvider {...methods}>
          {/* <form onSubmit={(e) => submitData(e)} className='w-full flex'> */}
          <form onSubmit={methods.handleSubmit(submitData)} className='w-full flex'>

            <div className='w-9/12'>
              <TextInput
                type='text'
                placeholder='Search...'
                name="keyword"
                className='ml-3 p-4 xl:h-14 sm:h-13 w-full rounded-2xl border border-solid border-[#B6B6B6]'
                autoComplete="off"
                isSearchReport={true}
                errorClass="absolute xl:bottom-4 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1"
                required
              />
            </div>
            <div className='w-3/12 ml-7 mr-3 '>
              <button
                type='submit'
                className='w-full h-14 rounded-2xl border border-solid border-[#FFFFFF] text-2xl font-semibold text-white bg-primary-color' >Search</button>
            </div>

          </form>
        </FormProvider>
      </div>

      {isLoader ?
        <p className='font-bold pt-24 flex justify-center ml-7 w-full text-md'>Loading...</p>
        :
        <div className='flex flex-wrap justify-center items-center w-full mr-7'>
          {searchValue?.list?.length ? searchValue?.list?.map((items, i) => {
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
        <div className='bg-[#FFFAE9] my-12 xl:h-52 md:h-52 sm:h-44 xl:w-3/4 md:w-3/4 sm:w-11/12 flex flex-col justify-center'>
          <div className='flex justify-center xl:font-bold xl:text-3xl md:font-bold md:text-3xl sm:font-semibold sm:text-xl'>This is the end of the list</div>
        </div>
      )}
    </div>
  );
}
