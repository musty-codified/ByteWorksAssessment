import './App.css';
import React from 'react'
import Location from './components/LocationsView';
import Login from './pages/userForms/Login';
import ActivateUser from './pages/activateUser/ActivateUser';
import ResendToken from './pages/resendToken/ResendToken';
import HomePage from './pages/home/HomePage';
import Footer from './components/Footer';

import SignupForm from './pages/userForms/SignupForm';
import CheckMail from './pages/userForms/CheckMail';

import DataProvider from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import AddLocationForm from './components/forms/AddLocationForm';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import {ProtectAdminRoute, ProtectUserRoute, IsAuthenticated, AdminAuthRequired} from './context/ProtectRoute';
import LocationTableView from './components/location/LocationTableView';
import LocationDetail from './pages/locationDetails/LocationDetail';
import Layout from './components/layout/Layout';
import Statistics from './pages/adminDashboard/Statistics';
import AdminLayout from './components/layout/AdminLayout';
import LocationInfo from './pages/locationInfo/LocationInfo';
import LocationClearingCost from './pages/locationClearingCost/LocationClearingCost';
import Page404 from './pages/404Page/Page404';
import GeoLocations from './components/geoLocations/GeoLocations';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/HomePage';
import About from './pages/about/About';



function App() {

  return (

    <React.Fragment>
    <DataProvider>
      <Router>
         <Routes>
              {/* <Route path='/' 
                element={
              // <ProtectUserRoute>
              <HomePage/>
              // </ProtectUserRoute>
              }
              /> */}

              <Route path="/"element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='locations' element={<GeoLocations/>}/>
                <Route path='about' element ={<About/>}/>
                                      
                <Route  element={<AdminAuthRequired/>}>
                <Route path ="admin" element={<AdminLayout/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path='locations' element={<LocationTableView tableTitle={"LOCATIONS"}/>}/>
                <Route path='stats' element={<Statistics/>}/>
                </Route>
              </Route>

                </Route>
              {/* <Route path='/locations' element={<GeoLocations/>}/> */}

              {/* <Route index element={<HomePage />} /> */}


               <Route path='/login' 
               element={
               <IsAuthenticated>
               <Login/>
               </IsAuthenticated>
               }/>

               <Route path='/register' element={<SignupForm/>}/>
               <Route path='/activate' element={<ActivateUser/>}/>
               <Route path='/check-mail' element={<CheckMail/>}/>
               <Route path='/resend-token' element={<ResendToken/>}/>
               <Route path='/locations' element={<Location/>}/>

               <Route path='/locations/:id' element={<LocationDetail/>}>
               <Route index element={<LocationInfo/>}/>
               <Route path='clearingCost' element={<LocationClearingCost/>}/>
               </Route>

              <Route path="*" element={<Page404/>} />
        </Routes>
      <Footer />
    </Router>
    </DataProvider>
    </React.Fragment>

  );
}

export default App;
