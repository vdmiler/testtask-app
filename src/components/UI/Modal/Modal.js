import React from 'react';
import './Modal.scss';

const Modal = ({ isActive, сloseButton = false, classModifier, handleClick = () => { }, children }) => {
   return (
      <div className={`${isActive ? 'modal _active' : 'modal'} ${classModifier ? '_' + classModifier : ''}`} onClick={handleClick}>
         <div className="modal__body" onClick={e => e.stopPropagation()}>
            {сloseButton ? (<div className="modal__close-btn" onClick={handleClick}>X</div>) : null}
            <div className="modal__content">
               {children}
            </div>
         </div>
      </div>
   );
}

export default Modal;