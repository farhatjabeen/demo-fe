import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'react-notifications/lib/notifications.css'

import routes from './routes'
import Page404 from '../pages/page404'
import AccessDenied from '../pages/accessDenied'
import * as Layout from '../layout'
import { NotificationContainer } from 'react-notifications'
import Loader from '../components/loader'
const AppRoutes = () => {
  const [isAllow, setAllow] = useState(true)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map(({ layout, path, childrens }, index) => {
            if (childrens) {
              const LayoutComponent = Layout[layout]
              return childrens.map(({ component, childPath, exact }, i) => {
                let comp = `${component}`.charAt(0).toLowerCase() + `${component}`.slice(1)
                const Component = require(`../pages/${comp}`).default
                return (
                  <Route
                    key={index}
                    path={`${path}${childPath}`}
                    exact={exact}
                    element={
                      <div className="mainContainer">
                        {isAllow || layout === 'AuthLayout' || layout === 'AdminAuthLayout' ? (
                          <LayoutComponent>
                            <Component />
                          </LayoutComponent>
                        ) : (
                          <AccessDenied />
                        )}
                        <Loader />
                      </div>
                    }
                  />
                )
              })
            } else {
              return path === '*' ? (
                <Route key={'page_404'} path={path} element={<Page404 />} />
              ) : (
                <Route key={'init'} path={path} element={<Navigate to="/" />} />
              )
            }
          })}
        </Routes>
        <NotificationContainer />
      </Router>
    </div>
  )
}

export default AppRoutes
