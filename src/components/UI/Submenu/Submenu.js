import React from "react";
import './Submenu.scss';
import { Link } from "react-scroll";

const Submenu = ({ subItems, activeSubMenu }) => {
   return (
      <ul className={`submenu ${activeSubMenu ? '_active' : ''}`}>
         {
            subItems.map(subItem => {
               return (
                  <li className="submenu__item" key={subItem.id}>
                     <Link
                        activeClass="active"
                        className="submenu__link"
                        to={subItem.path}
                        spy={true}
                        smooth={true}
                        duration={500}
                     >
                        {subItem.label}
                     </Link>
                  </li>
               )
            })
         }
      </ul>
   );
}

export default Submenu;