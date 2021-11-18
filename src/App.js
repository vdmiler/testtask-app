import React from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Knowledge from './components/Knowledge/Knowledge';
import Offer from './components/Offer/Offer';
import Register from './components/Register/Register';
import Users from './components/Users/Users';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Offer />
      <Knowledge />
      <Users />
      <Register />
      <Footer />
    </div >
  );
}

export default App;
