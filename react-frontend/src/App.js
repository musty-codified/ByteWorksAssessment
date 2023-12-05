import './App.css';
import React from 'react'
import Location from './components/LocationsView';
import Login from './pages/userForms/Login';
import ActivateUser from './pages/activateUser/ActivateUser';
import ResendToken from './pages/resendToken/ResendToken';
import HomePage from './pages/home/HomePage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';

import SignupForm from './pages/userForms/SignupForm';
import CheckMail from './pages/userForms/CheckMail';

import DataProvider from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddLocationForm from './components/forms/AddLocationForm';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';

function App() {

  return (

    <React.Fragment>
    <DataProvider>
      <Router>

        <Routes>

      <Route path='/' element={<HomePage/>}/>

      <Route path='/register' element={<SignupForm/>}/>

      <Route path='/login' element={<Login/>}/>
      <Route path='/activate' element={<ActivateUser/>}/>

      <Route path='/check-mail' element={<CheckMail/>}/>
      <Route path='/resend-token' element={<ResendToken/>}/>

      <Route path='/locations' element={<Location/>}/>
      <Route path='/nav' element={<Navbar/>}/>
      <Route path='/location-form' element={<AddLocationForm/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>

        </Routes>

        <Footer />

      </Router>

    </DataProvider>

    </React.Fragment>

  );
}

export default App;
