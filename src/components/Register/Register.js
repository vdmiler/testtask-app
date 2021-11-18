import React, { useState } from 'react';
import './Register.scss';
import Layout from '../UI/Layout/Layout';
import Heading from '../UI/Heading/Heading';
import BasisForm from '../UI/BasisForm/BasisForm';
import paws_img from '../../img/paws.png';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

const Register = () => {
   const [showModal, setShowModal] = useState(false);
   return (
      <Layout layoutName="register">
         <div className="register__titles">
            <Heading
               tag='h2'
               classPrefix="register"
               content="Register to get a work"
            />
            <Heading
               tag='h3'
               classPrefix="register"
               content="Your personal data is stored according to the Privacy Policy"
            />
         </div>
         <BasisForm showModal={setShowModal} />
         <Modal
            classModifier="successfully"
            activeCloseBtn={true}
            handleClick={() => setShowModal(false)}
            isActive={showModal}
         >
            <h3 className="successfully__title">
               Congratulations
            </h3>
            <p className="successfully__text">
               You have successfully passed the registration
            </p>
            <Button
               classPrefix="successfully"
               handleClick={() => setShowModal(false)}
               content="Great"
            />
         </Modal>
         <img src={paws_img} alt="" className="register__paws" />
      </Layout>
   );
}

export default Register;