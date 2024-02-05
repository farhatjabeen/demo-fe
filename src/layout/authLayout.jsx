import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { searchKey } from '../redux/reducers/itemsSlice'

export function AuthLayout(props) {
  const [customClassName, setCustomClassName] = useState('default')
  const location = useLocation()
  const searchValue = useSelector(searchKey)

  useEffect(() => {
    if (
      location.pathname.split('/').includes('findMissingItem') ||
      location.pathname.split('/').includes('addMoreDetails') ||
      location.pathname.split('/').includes('businessignup')
    ) {
      if (location.pathname.split('/').includes('findMissingItem')) {
        if (searchValue?.list?.length === undefined) {
          setCustomClassName('no-missing-items')
        }
        if (searchValue?.list?.length < 4) {
          setCustomClassName('missing-items')
        }
        if (searchValue?.list?.length > 4 && searchValue?.list?.length < 8) {
          setCustomClassName('missing-items-half-page')
        }
        if (searchValue?.list?.length > 8) {
          setCustomClassName('missing-items-full-page')
        }
      } else {
        setCustomClassName('missing-screen')
      }
    } else if (
      location.pathname.split('/').includes('mylistings') ||
      location.pathname.split('/').includes('businessHome')
    ) {
      setCustomClassName('my-listing')
    } else if (location.pathname.split('/').includes('')) {
      setCustomClassName('main-screen')
    }
  }, [location, customClassName, searchValue])

  return (
    <div className={`authLayout-${customClassName} layout-image flex flex-col min-h-screen`}>
      <Header />
      <div className="flex-grow">
        <main id="authLayoutContainer">{props?.children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
