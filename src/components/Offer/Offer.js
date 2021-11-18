import React from 'react';
import './Offer.scss';
import Layout from '../UI/Layout/Layout';
import Heading from '../UI/Heading/Heading';
import Text from '../UI/Text/Text';
import bg_offer_img from '../../img/bg_offer.jpg';
import { Link } from 'react-scroll';

const Offer = () => {
   return (
      <Layout layoutName="offer" layoutColor="#edecea" bgImage={bg_offer_img} >
         <Heading
            classPrefix="offer"
            content="Test assignment for front-end developers"
         />
         <Text
            classPrefix="offer"
         >
            Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion. Therefore, responsive design, programming languages and specific frameworks are the must-have skillsets to look for when assessing your front-end developers.
         </Text>
         <Link
            className="offer__btn _btn"
            to="register"
            spy={true}
            smooth={true}
            duration={500}
         >
            Sign up
         </Link>
      </Layout>
   );
}

export default Offer;