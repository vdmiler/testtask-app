import React from 'react';
import './Knowledge.scss';
import Layout from '../UI/Layout/Layout';
import Heading from '../UI/Heading/Heading';
import Text from '../UI/Text/Text';
import knowledge_img from '../../img/knowledge.png';
import { Link } from 'react-scroll';

const Knowledge = () => {
   return (
      <Layout layoutName="knowledge">
         <div className="knowledge__picture">
            <img src={knowledge_img} alt="" />
         </div>
         <div className="knowledge__content">
            <Heading
               tag="h2"
               classPrefix="knowledge"
               content="Let's get acquainted"
            />
            <Heading
               tag="h3"
               classPrefix="knowledge"
               content="I'm a good front-end developer"
            />
            <Text
               classPrefix="knowledge"
            >
               What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </Text>
            <Link
               className="knowledge__btn _btn"
               to="register"
               spy={true}
               smooth={true}
               duration={500}
            >
               Sign up
            </Link>
         </div>
      </Layout>
   );
}

export default Knowledge;