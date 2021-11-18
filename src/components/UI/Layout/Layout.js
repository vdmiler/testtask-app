import React from 'react';

const Section = ({ layoutName, layoutColor = "#f8f8f8", bgImage, children }) => {
   return (
      <div className={layoutName} name={layoutName} style={{ backgroundColor: layoutColor, backgroundImage: `${bgImage ? `url(${bgImage})` : 'none'}` }}>
         <div className={`${layoutName}__container _container`}>
            <div className={`${layoutName}__body`}>
               {children}
            </div>
         </div>
      </div>
   );
}

export default Section;