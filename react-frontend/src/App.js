import './App.css';
import React from 'react'
import Location from './components/Location';
import Login from './pages/form/Login';
import ActivateUser from './pages/activateUser/ActivateUser';
import ResendToken from './pages/resendToken/ResendToken';
import Home from './pages/home/Home';


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
      <Route path='/' element={<Home/>}/>

      <Route path='/register' element={<SignupForm/>}/>
      {/* </div> */}

      <Route path='/login' element={<Login/>}/>
      <Route path='/activate' element={<ActivateUser/>}/>

      <Route path='/check-mail' element={<CheckMail/>}/>
      <Route path='/resend-token' element={<ResendToken/>}/>


      <Route path='/locations' element={<Location/>}/>
      {/* <Route path='/locations' element={<HeaderComponent/>}/> */}

      HeaderComponent


        </Routes>
      </Router>

  

    </DataProvider>

    </React.Fragment>

  );
}

export default App;
