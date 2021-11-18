import React from 'react';

const Text = ({ classPrefix, classModifier, children }) => {
   return (
      <>
         <p
            className={`${classPrefix ? classPrefix + '__text' : ''} ${classModifier ? classPrefix + '__text_' + classModifier : ''} _paragraph`}
         >
            {children}
         </p>
      </>
   )
}

export default Text;