import './App.css';
import React from 'react'
import axios from 'axios';
import Location from './components/Location';
import Login from './pages/form/Login';
import ActivateUser from './pages/activateUser/ActivateUser';
import ResendToken from './pages/resendToken/ResendToken';


import SignupForm from './pages/form/SignupForm';
import CheckMail from './pages/form/CheckMail';


import DataProvider from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  return (

    <React.Fragment>
    <DataProvider>
      <Router>

        <Routes>


      {/* <div className="App"> */}
      <Route path='/' element={<SignupForm/>}/>
      {/* </div> */}

      <Route path='/login' element={<Login/>}/>
      <Route path='/activate' element={<ActivateUser/>}/>

      <Route path='/check-mail' element={<CheckMail/>}/>
      <Route path='/resend-token' element={<ResendToken/>}/>


      <Route path='/locations' element={<Location/>}/>


        </Routes>
      </Router>

  

    </DataProvider>

    </React.Fragment>

  );
}

export default App;
