import React, { useState, useEffect } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { FaRotateLeft } from 'react-icons/fa6'
import CustomCombinedButton from '../../components/common/adminButton'
import Table from '../../components/tables'
import Pagination from '../../components/common/pagination'
import Tabs from '../../components/tabs'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminFetchUser,
  userDetails,
  adminFetchBusinessUser,
  businessUserDetails,
} from '../../redux/reducers/itemsSlice'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function User() {
  // Local states
  const [searchUserTerm, setSearchUserTerm] = useState('')
  const [resetHandle, setResetHandle] = useState(false)
  const [isId, setIsId] = useState(true)
  const [searchBusinessTerm, setSearchBusinessTerm] = useState('')
  const PageLimit = 10
  const tableData = useSelector(userDetails)
  const tableBusinessData = useSelector(businessUserDetails)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const pageNow = searchParams.get('page')
  const currentUser = searchParams.get('name')
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')
    if (!currentUser && window.location.pathname === '/admin/user/users') {
      setSearchUserTerm('')
      dispatch(adminFetchUser(page, PageLimit))
    }

    if (!currentUser && window.location.pathname === '/admin/user/businessUser') {
      setSearchUserTerm('')
      dispatch(adminFetchBusinessUser(page, PageLimit))
    }

    if (currentUser && window.location.pathname === '/admin/user/users') {
      dispatch(adminFetchUser(page, PageLimit, currentUser))
    } else if (currentUser && window.location.pathname === '/admin/user/businessUser') {
      dispatch(adminFetchBusinessUser(page, PageLimit, currentUser))
    }
  }, [location.search, navigate, PageLimit])

  const handleReset = async (tab) => {
    setResetHandle(true)
    if (tab === 1) {
      setSearchUserTerm('')
      const values = await dispatch(adminFetchUser(pageNow, PageLimit))
      if (values) {
        setResetHandle(false)
      }
    } else if (tab === 2) {
      setSearchBusinessTerm('')
      const values = await dispatch(adminFetchBusinessUser(pageNow, PageLimit))
      if (values) {
        setResetHandle(false)
      }
    }
  }

  const handleSearch = (tab) => {
    if (tab === 1) {
      navigate(`?name=${searchUserTerm}&page=1`)
    } else if (tab === 2) {
      navigate(`?name=${searchBusinessTerm}&page=1`)
    }
  }

  const handlePageChange1 = (pageNumber) => {
    navigate(`/admin/user/users?page=${pageNumber}`)
  }
  const handlePageChange2 = (pageNumber) => {
    navigate(`/admin/user/businessUser?page=${pageNumber}`)
  }

  const userHeaders = [
    { key: 'userCode', label: 'User ID' },
    { key: 'name', label: 'User Name' },
    { key: 'count', label: 'Listing Count' },
    { key: 'emailMailId', label: 'Mail ID' },
    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'action', label: 'Actions' },
  ]

  const businessHeaders = [
    { key: 'userCode', label: 'Business ID' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'companyCategory', label: 'Company Category' },
    { key: 'name', label: 'Contact Name' },
    { key: 'emailMailId', label: 'Mail ID' },
    { key: 'mobileNumber', label: 'Contact Phone' },
    { key: 'count', label: 'Listing Count' },
    { key: 'action', label: 'Actions' },
  ]

  return (
    <>
      <div className="my-4 ml-4">
        <h1 className="text-black font-bold mb-4 text-4xl mt-10">User Management</h1>
        <Tabs className="my-8">
          <div label="General" route="/admin/user/users?page=1">
            <div className={`flex  ${isId ? 'my-8' : 'mt-8 mb-0'}`}>
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
                  icon={<FaRotateLeft size={18} className="mr-2 text-gray4" />}
                  onClick={() => handleReset(1)}
                  isReset={true}
                  buttonColor="blue"
                />
              </div>
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Search"
                  icon={<IoSearchSharp size={18} className="mr-2" />}
                  onClick={() => handleSearch(1)}
                  isReset={true}
                  buttonColor="other"
                />
              </div>
            </div>
            {isId ? '' : <p className="text-sm text-red">Valid ID required</p>}
            {resetHandle ? (
              <p>Loading...</p>
            ) : (
              <Table
                currentPage={pageNow}
                headers={userHeaders}
                data={tableData?.list}
                context="user"
              />
            )}
            <Pagination
              isBlueBackground={true}
              currentPage={tableData?.pageMeta?.page}
              totalPages={tableData?.pageMeta?.totalPages}
              onPageChange={handlePageChange1}
            />
          </div>
          <div label="Business" route="/admin/user/businessUser?page=1">
            <div className={`flex  ${isId ? 'my-8' : 'mt-8 mb-0'}`}>
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
                  icon={<FaRotateLeft size={18} className="mr-2 text-gray4" />}
                  onClick={() => handleReset(2)}
                  isReset={true}
                  buttonColor="blue"
                />
              </div>
              <div className="basis-1/12">
                <CustomCombinedButton
                  text="Search"
                  icon={<IoSearchSharp size={20} className="mr-2" />}
                  onClick={() => handleSearch(2)}
                  isReset={true}
                  buttonColor="other"
                />
              </div>
            </div>
            {isId ? '' : <p className="text-sm text-red">Valid ID required</p>}
            <Table
              currentPage={pageNow}
              headers={businessHeaders}
              data={tableBusinessData?.list}
              context="businessUser"
            />
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
  )
}

export default User
