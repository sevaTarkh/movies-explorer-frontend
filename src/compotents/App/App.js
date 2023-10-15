import './App.css';
import React, {  useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Main from '../Main/Main';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js';
import auth from '../../utils/Auth.js';
import api from '../../utils/MainApi.js'
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import ErrorPopup from '../ErrorPopup/ErrorPopup.js';
import EditPopup from '../EditPopup/EditPopup.js'
import { 
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  SERVER_ERROR_APP,
  CONFLICT_ERROR
} from '../../utils/constants';


function App() {
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    _id: '',
    email: ''
  });

  const [Usertoken, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    
    if(isLoggedIn){
      api.getUserInformationFromServer(Usertoken)
        .then((data) =>{
          setCurrentUser(data.user)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }, [isLoggedIn, Usertoken])

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token)
    if (token) {
      auth.checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          localStorage.removeItem('token')
          console.log(err);
        })  
    }
  }, [isLoggedIn]);

  function loginUser(data){
    const { email, password } = data;
      auth.login(email, password)
      .then((user)=>{
         setIsLoggedIn(true);
         localStorage.setItem('token', user.token)
         setToken(user.token);
         navigate("/movies", {replace: true})
      })
      .catch((err)=>{
         console.log(err)
         setErrorPopupOpen(true)
         if(err === 400){
          setErrorMessage(BAD_REQUEST_ERROR)
          }
          if(err===401){
            setErrorMessage(AUTH_ERROR)
            }
          if(err===500){
          setErrorMessage(SERVER_ERROR_APP)
          }
      })
  }

  function registerUser(data){
    auth.register(data)
    .then(()=>{
      loginUser(data)
    })
    .catch((err)=> {
      setErrorMessage('')
      console.log(err)
      setErrorPopupOpen(true)
      if(err === 409){
        setErrorMessage(CONFLICT_ERROR)
      }
      if(err===500){
        setErrorMessage(SERVER_ERROR_APP)
      }
    }) 
  }

  function handleUpdateUser(data){
    api.editProfileInformation(data, Usertoken)
        .then((data)=>{
          setCurrentUser({
            name: data.user.name,
            email: data.user.email
          })
          setEditPopupOpen(true)
        })
        .catch((err)=>{
          console.log(err)
          setEditPopupOpen(false)
          setErrorPopupOpen(true)
          if(err === 409){
            setErrorMessage(CONFLICT_ERROR)
          }
        })
  }

  const logedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("inputValue");
    localStorage.removeItem("lastCheckBox");
    localStorage.removeItem("movies");
    localStorage.removeItem("lastMovies");
    localStorage.removeItem("shortFilm");
    localStorage.removeItem("saved-movies");
    setIsLoggedIn(false);
    navigate("/");
    setToken('');
  }

  const closePopup = () => {
    setErrorPopupOpen(false)
    setEditPopupOpen(false)
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>  
          <Route path='/' element={<Main isLogedIn={isLoggedIn}/>}/>
          <Route path='/signup' element={
            <Register 
                registerUser={registerUser}
            />}
          />
          <Route path='/signin' element={
            <Login 
              loginUser={loginUser}
            />}
          />
          <Route path='/profile' element={
            <ProtectedRouteElement 
              element={Profile}
              handleUpdateUserInfo={handleUpdateUser}
              logedOut={logedOut}
              isloggedin={isLoggedIn}
              />}
            />;
          <Route path='/movies' element={
            <ProtectedRouteElement
              element={Movies}
              isloggedin={isLoggedIn}
            />}
          />;
          <Route path='/saved-movies' element={
            <ProtectedRouteElement
              element={SavedMovies}
              isloggedin={isLoggedIn}
            />}
          />;
          <Route path='*' element={<NotFound/>}/>;
        </Routes>
        <ErrorPopup
          isOpen={isErrorPopupOpen}
          onClose={closePopup}
          message={isErrorMessage}
        />
        <EditPopup
          isOpen={isEditPopupOpen}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
