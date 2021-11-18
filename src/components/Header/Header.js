import React, { useState } from 'react';
import './Header.scss';
import logo from '../../img/logo.png';
import Menu from '../UI/Menu/Menu';

const Header = () => {
   const [activeSticky, setActiveSticky] = useState(false);
   const [activeMenu, setActiveMenu] = useState(false);
   window.addEventListener('scroll', () => {
      window.pageYOffset > 300 ? setActiveSticky(true) : setActiveSticky(false)
   })
   return (
      <header className={`header ${activeSticky ? '_sticky' : ''} ${activeMenu ? '_hide' : ''}`}>
         <div className="header__container _container">
            <div className="header__body">
               <a href="#" className="header__logo logo">
                  <img src={logo} alt="" className="logo__img" />
               </a>
               <Menu />
               <button type="button" className="header__burger-btn" onClick={() => setActiveMenu(true)}>
                  <span></span>
                  <span></span>
                  <span></span>
               </button>
            </div>
         </div>
         <Menu
            type="mobile"
            activeMenu={activeMenu}
            deactivateMenu={()=>setActiveMenu(false)}
         />
      </header>
   );
}

export default Header;