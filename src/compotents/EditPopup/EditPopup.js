import React from 'react';
import './EditPopup.css';
import close from '../../images/krest.svg'

 function ErrorPopup({ isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? ' popup_is-opened' : ''}`}>
      <div className='popup__container'>
        <button className='button popup__button-close' onClick={onClose}>
            <img src={close} alt='фото крестика'/>
        </button>
        <p className='popup-message-edit'>Вы успешно изменили данные</p>
      </div>
    </div>
  );
}

export default ErrorPopup;