import React, { Fragment } from 'react'
import * as Layout from '../../layout'

const AccessDenied = ({ layout }) => {
  return (
    <Fragment>
      {layout == 'MainLayout' ? (
        <Layout.AuthLayout>
          <div className="flex-grow text-center p-32 pb-36">
            <h2>Access denied for this page. Please login and continue</h2>
          </div>
        </Layout.AuthLayout>
      ) : (
        <Layout.AdminAuthLayout>
          <div className="flex-grow text-center p-32 pb-36">
            <h2>Access denied for this page. Please login and continue</h2>
          </div>
        </Layout.AdminAuthLayout>
      )}
    </Fragment>
  )
}

export default AccessDenied
