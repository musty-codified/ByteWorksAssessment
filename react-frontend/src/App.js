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
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import {ProtectAdminRoute, ProtectUserRoute, IsAuthenticated, AdminAuthRequired} from './context/ProtectRoute';
import LocationTableView from './components/location/LocationTableView';
import LocationDetail from './pages/locationDetails/LocationDetail';
import Layout from './components/layout/Layout';
import Statistics from './pages/adminDashboard/Analytics';
import AdminLayout from './components/layout/AdminLayout';
import LocationInfo from './pages/locationInfo/LocationInfo';
import LocationClearingCost from './pages/locationClearingCost/LocationClearingCost';
import Page404 from './pages/404Page/Page404';
import GeoLocations from './components/geoLocations/GeoLocations';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import RouteCalculation from './pages/routeCalculation/RouteCalculation';


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
                <Route index element={
                  <ProtectUserRoute>
                     <HomePage/>
                 </ProtectUserRoute>
                         }
                   />
                <Route path='locations' element={<GeoLocations/>}/>
                <Route path='about' element ={<About/>}/>
                <Route path='contact' element ={<Contact/>}/>
                  
                <Route  element={<AdminAuthRequired/>}>
                <Route path ="admin" element={<AdminLayout/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path='locations' element={<LocationTableView tableTitle={"LOCATIONS"}/>}/>
                <Route path='stats' element={<Statistics/>}/>
                </Route>
              </Route>

                </Route>

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

               {/* consider swapping this route with the "/locations (Geolocations page) route in the admin page" */}
               <Route path='/location/all' element={<Location/>}/>

               <Route path='/locations/:id' element={<LocationDetail/>}>
               <Route index element={<LocationInfo/>}/>
               <Route path='clearingCost' element={<LocationClearingCost/>}/>
               </Route>
               
               <Route path='/routing' element={<RouteCalculation/>}/>
               <Route path="*" element={<Page404/>} />
        </Routes>
      <Footer />
    </Router>
    </DataProvider>
    </React.Fragment>

  );
}

export default App;
