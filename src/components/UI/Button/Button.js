import React from 'react';
import './Button.scss';

const Button = ({ type = 'button', classPrefix, classModifier, content, handleClick = () => { } }) => {
   return (
      <>
         <button
            type={type}
            className={`${classPrefix ? classPrefix + '__btn' : ''} ${classModifier ? classPrefix + '__btn_' + classModifier : ''} _btn`}
            onClick={handleClick}
         >
            {content}
         </button>
      </>
   );
}

export default Button;