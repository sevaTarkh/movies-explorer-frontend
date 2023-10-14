import React from 'react';
import './ErrorPopup.css';
import close from '../../images/krest.svg'

 function ErrorPopup({ isOpen, onClose, message }) {
  return (
    <div className={`popup ${isOpen ? ' popup_is-opened' : ''}`}>
      <div className='popup__container'>
        <button className='button popup__button-close' onClick={onClose}>
            <img src={close} alt='фото крестика'/>
        </button>
        <p className='popup-message'>{message}</p>
      </div>
    </div>
  );
}

export default ErrorPopup;