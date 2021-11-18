import React from 'react';

const Heading = ({ tag, classPrefix, classModifier, content }) => {
   switch (tag) {
      case 'h2':
         return (
            <>
               <h2
                  className={`${classPrefix ? classPrefix + '__title' : ''} ${classModifier ? classPrefix + '__title_' + classModifier : ''} _title`}
               >
                  {content}
               </h2>
            </>
         )
      case 'h3':
         return (
            <>
               <h3
                  className={`${classPrefix ? classPrefix + '__title' : ''} ${classModifier ? classPrefix + '__title_' + classModifier : ''} _title`}
               >
                  {content}
               </h3>
            </>
         )
      default:
         return (
            <>
               <h1 className={`${classPrefix ? classPrefix + '__title' : ''} ${classModifier ? classPrefix + '__title_' + classModifier : ''} _title`}
               >
                  {content}
               </h1>
            </>
         )
   }
}

export default Heading;