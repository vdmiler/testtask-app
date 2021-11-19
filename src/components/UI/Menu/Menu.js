import React, { useState } from 'react';
import './Menu.scss';
import { menuItemsDesktop, menuItemsMobile } from '../../constants';
import { Link } from 'react-scroll';
import Submenu from '../Submenu/Submenu';
import logo_img from '../../../img/logo.png';
import drop_down_arrow_img from '../../../img/drop-down-arrow.png';

const Menu = ({ type, activeMenu, deactivateMenu }) => {
   const [toggleSubMenu, setToggleSubMenu] = useState(false);
   switch (type) {
      case 'mobile':
         return (
            <div className={`mobile-menu ${activeMenu ? '_active' : ''}`} onClick={deactivateMenu}>
               <nav className="mobile-menu__body">
                  <a href="#" className="mobile-menu__logo">
                     <img src={logo_img} alt="" className="mobile-menu__img" />
                  </a>
                  <ul className="mobile-menu__list">
                     {
                        menuItemsMobile.map(menuItem => {
                           return (
                              <li className="mobile-menu__item" key={menuItem.id}>
                                 {!('subitems' in menuItem) ?
                                    <Link
                                       activeClass="active"
                                       className="mobile-menu__link"
                                       to={menuItem.path}
                                       spy={true}
                                       smooth={true}
                                       duration={500}
                                    >
                                       {menuItem.label}
                                    </Link>
                                    : (
                                       <div className="mobile-menu__item_dropdown" onClick={e => { e.stopPropagation(); setToggleSubMenu(!toggleSubMenu) }}>
                                          {menuItem.label}
                                          <img src={drop_down_arrow_img} alt="" className={`drop_down_arrow ${toggleSubMenu ? '_active' : ''}`} />
                                          <Submenu subItems={menuItem.subitems} activeSubMenu={toggleSubMenu} />
                                       </div>
                                    )
                                 }
                              </li>
                           )
                        })
                     }

                  </ul>
               </nav>
            </div>
         )
      default:
         return (
            <nav className="menu">
               <ul className="menu__list">
                  {
                     menuItemsDesktop.map(menuItem => {
                        return (
                           <li className="menu__item" key={menuItem.id}>
                              <Link
                                 activeClass="active"
                                 className="menu__link"
                                 to={menuItem.path}
                                 spy={true}
                                 smooth={true}
                                 duration={500}
                              >
                                 {menuItem.label}
                              </Link>
                           </li>
                        )
                     })
                  }
               </ul>
            </nav>
         )
   }
}

export default Menu;