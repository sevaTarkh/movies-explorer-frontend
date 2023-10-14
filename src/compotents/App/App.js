import './App.css';
import React, {  useEffect, useState } from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
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
          setErrorMessage('Произошла ошибка: Bad Request')
          }
          if(err===401){
            setErrorMessage('Произошла ошибка: Auth Error')
            }
          if(err===500){
          setErrorMessage('Произошла ошибка: Server error, попробуйте позже :(')
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
        setErrorMessage('Произошла ошибка: User with this email already exists')
      }
      if(err===500){
        setErrorMessage('Произошла ошибка: Server error, попробуйте позже :(')
      }
      })
    
  }

  function handleUpdateUser(data){
    console.log('1212, ', data)
    api.editProfileInformation(data, Usertoken)
       .then((data)=>{
          setCurrentUser({
            name: data.name,
            email: data.email
          })
          setEditPopupOpen(true)
       })
       .catch((err)=>{
          console.log(err)
          setEditPopupOpen(false)
          setErrorPopupOpen(true)
          if(err === 409){
            setErrorMessage('Произошла ошибка: User with this email already exists')
          }
       })
  }

  const logedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("inputValue");
    localStorage.removeItem("lastCheckBox");
    localStorage.removeItem("movie");
    localStorage.removeItem("movies");
    localStorage.removeItem("lastInput");
    localStorage.removeItem("lastMovies");
    localStorage.removeItem("shortFilm");
    localStorage.removeItem("jwt");
    localStorage.removeItem("saved-movies");
    localStorage.removeItem("savedMovies");
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
              currentUser={currentUser}
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
