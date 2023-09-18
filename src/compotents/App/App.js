import './App.css';
//import React, { useEffect, useState } from 'react';
//import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import React, {  useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Main from '../Main/Main';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js';


function App() {

  const [isRegistrateSuccess, setRegistrateSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function loginUser(){
    setIsLoggedIn(true);
  }

  function registerUser(){
    setRegistrateSuccess(true)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      
        <Routes>  
          <Route path='/' element={<Main/>}/>
          <Route path='/signup' element={<Register registerUser={registerUser}/>}/>
          <Route path='/signin' element={<Login login={loginUser}/>}/>
          <Route path='/profile' element={<Profile/>}/>;
          <Route path='/movies' element={<Movies/>}/>;
          <Route path='/saved-movies' element={<SavedMovies/>}/>;
          <Route path='*' element={<NotFound/>}/>;
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
