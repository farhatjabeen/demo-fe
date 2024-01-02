import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import Pagination from '../../components/common/pagination'
import TextInput from '../../components/common/textInput';
import SearchCards from '../../components/searchCards';
import useValidationResolver from '../../hooks/useValidationResolver';
import { searchSchema } from '../../validations';
import { clearItemData, searchByLocation, searchItem, searchKey } from '../../redux/reducers/itemsSlice';
import { Toast } from '../../components/toast';

export default function FindMissingItem() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParameters = useParams();

  const dispatch = useDispatch();
  const resolver = useValidationResolver(searchSchema);
  const searchValue = useSelector(searchKey);
  const isLastPage = searchValue?.pageMeta?.page === searchValue?.pageMeta?.totalPages;
  const methods = useForm({
    defaultValues: {
      itemName: ""
    },
    resolver
  });

  useEffect(() => {
    dispatch(searchByLocation(searchParameters.itemName, searchParameters.location));
  }, [])

  useEffect(() => {
    if (searchParameters?.itemNameAgain) {
      dispatch(searchItem(searchParameters.itemNameAgain, currentPage));
    }
  }, [searchParameters, currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const submitData = (e) => {
    try {
      e.preventDefault()
      const productName = methods.getValues();
      if(productName.itemName){
      navigate(`/findmissingitem/${productName.itemName}`)
      }else{
        Toast({type:'error',message:'Enter Item Name'})
      }
      dispatch(searchItem(productName.itemName));
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

      <div className='xl:h-20 xl:w-4/6 md:h-20 md:w-4/5 sm:h-20 sm:w-4/5 rounded-3xl bg-white border border-solid border-[#DDDDDD] flex items-center '>
        <FormProvider {...methods}>
          <form onSubmit={(e) => submitData(e)} className='w-full flex'>
            <div className='w-9/12'>
              <TextInput
                type='text'
                placeholder='Search...'
                name="itemName"
                className='ml-2 p-4 xl:h-14 sm:h-13 w-11/12 rounded-2xl border border-solid border-[#B6B6B6]'
                autoComplete="off"
                required
              />
            </div>
            <div className='w-3/12'>
              <button
                type='submit'
                className='px-16 h-14 rounded-2xl border border-solid border-[#FFFFFF] text-2xl font-semibold text-white bg-primary-color' >Search</button>
            </div>

          </form>
        </FormProvider>
      </div>

      <div className='flex flex-wrap justify-center items-center w-full'>
        {searchValue?.list?.length && searchValue.list.map((items, i) => {
          return (
            <div className='sm:w-60 md:w-52 xl:w-80 xl:ml-10 md:ml-5 sm:flex sm:items-center'>
              <SearchCards key={i} idx={i} itemId={items._id} imageName={items.itemImage || ''} itemName={items.itemName} location={items.location} date={items.foundDate} time={items.foundTime} />
            </div>
          );
        })}
      </div>

      <div className='mb-10 mt-36'>
        <Pagination
          isBlueBackground={false}
          currentPage={searchValue?.pageMeta?.page}
          totalPages={searchValue?.pageMeta?.totalPages}
          onPageChange={handlePageChange} />
      </div>
      {isLastPage && (
        <div className='bg-[#FFFAE9] my-12 xl:h-52 md:h-52 sm:h-44 xl:w-3/4 md:w-3/4 sm:w-11/12 flex flex-col justify-center'>
          <div className='flex justify-center xl:font-bold xl:text-3xl md:font-bold md:text-3xl sm:font-semibold sm:text-xl'>This is the end of the list</div>
          <div className='font-medium flex justify-center xl:text-base md:text-base sm:text-xs'>Subscribe and send an alert and Ilost will ping you if your item is found</div>
        </div>
      )}
    </div>
  );
}
