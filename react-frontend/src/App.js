import './App.css';
import React from 'react'
import axios from 'axios';
import Location from './components/Location';
import SignupForm from './components/form/SignupForm';
import DataProvider from './context/AuthContext';

function App() {


 


  return (
    <DataProvider>

    <div className="App">
      <Location/>
      {/* <SignupForm/> */}
      </div>

    </DataProvider>

  );
}

export default App;
