import React from 'react';
import './Loader.scss';
import loader_img from '../../../img/loader.svg';

const Loader = () => {
   return (
      <div className="peloader">
         <img src={loader_img} alt="" className="peloader__img" />
      </div>
   );
}

export default Loader;