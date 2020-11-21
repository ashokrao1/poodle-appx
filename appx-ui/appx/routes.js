//import React from 'react'
const React = module['react']
//console.log(React)
//import DashboardLayout from './layouts/DashboardLayout'
//import MainLayout from './layouts/MainLayout'
//import AccountView from './views/account/AccountView'
//import CustomerListView from './views/customer/CustomerListView'
import HeaderLayout from '/appx/pages/layouts/headerLayout'
import ConsoleLayout from '/appx/pages/layouts/consoleLayout'
import Home from '/appx/pages/landing/Home'
import SignInSide from '/appx/pages/auth/SignInSide'
//import DashboardView from './views/reports/DashboardView'
//import NotFoundView from 'src/views/errors/NotFoundView'
//import ProductListView from './views/product/ProductListView'
//import RegisterView from './views/auth/RegisterView'
//import SettingsView from './views/settings/SettingsView'

/*

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
        { path: 'dashboard', element: <DashboardView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'login',
    element: <MainLayout />,
    children: [
      { path: '/', element: <SignInSide /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
      { path: '/', element: <Navigate to="/login" /> },
    ]
  }
];
*/

const routes = {
    '/': () => <Home/>,
    '/appx/login': () => <HeaderLayout><SignInSide/></HeaderLayout>,
//    '/appx/console': () => <ConsoleLayout><DashboardView/></ConsoleLayout>,
//    '/404': () => <HeaderLayout><NotFoundView/></HeaderLayout>,
}

//console.log(routes)

export default routes;
