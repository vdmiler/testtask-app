import React from 'react';
import './Footer.scss';
import abz_logo_img from '../../img/abz-logo.svg';

const Footer = ({ }) => {
   return (
      <footer className="footer" id="footer">
         <div className="footer__white-line _first">
            <div className="_container">
               <p className="footer__copyright">
                  &#169; abz.agency specially for the test task
               </p>
            </div>
         </div>
         <div className="footer__black-line">
         </div>
         <div className="footer__white-line _second">
            <div className="_container">
               <div className="footer__wrapper">
                  <a href="#" className="footer__logo">
                     <img src={abz_logo_img} alt="" className="footer__img" />
                  </a>
                  <p className="footer__text">
                     0501 - Homepage - 2560
                  </p>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;