import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import './BasisForm.scss';
import Button from '../Button/Button';
import { excerptedText, getStorageWithExpiry, setStorageWithExpiry } from '../../functions';
import { useDispatch } from 'react-redux';
import { fetchFormData } from '../../store/slices/formDataSlice';
import axios from 'axios';

const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const phonePattern = /^[\+]{0,1}380([0-9]{9})$/;
const SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg'];

const BasisFormSchema = Yup.object().shape({
   name: Yup
      .string()
      .min(2)
      .max(60)
      .required('Required'),
   email: Yup
      .string()
      .min(2)
      .max(100)
      .matches(emailPattern, 'Email address is not valid')
      .required('Required'),
   phone: Yup
      .string()
      .matches(phonePattern, 'Phone number is not valid')
      .required('Required'),
   position: Yup
      .string()
      .required('Required'),
   photo: Yup.mixed()
      .nullable()
      .required('Required')
      .test(
         'FILE_SIZE',
         'File Size is too large',
         value => !value || (value && value.size <= 5e+6)
      )
      .test(
         'FILE_FORMAT',
         'Unsupported File Format',
         value => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
});

const BasisFormValues = {
   name: '',
   email: '',
   phone: '',
   position: 'front',
   photo: ''
}

const BasisForm = ({ showModal }) => {
   const fileRef = useRef(null);
   const dispatch = useDispatch();

   const getPositionIds = async () => {
      try {
         const response = await axios('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
         const positions = await response.data.positions;
         const randomItem = positions[Math.floor(Math.random() * positions.length)];
         return randomItem.id;
      } catch (error) {
         console.log(error)
      }
   }

   const getToken = async () => {
      const token = getStorageWithExpiry('token');
      if (!token) {
         try {
            const response = await axios('https://frontend-test-assignment-api.abz.agency/api/v1/token');
            const code = await response.data.token;
            setStorageWithExpiry('token', code, 2400);
            return getStorageWithExpiry('token');
         } catch (error) {
            console.error(error);
         }
      } else {
         return token;
      }
   }

   return (
      <>
         <Formik

            initialValues={BasisFormValues}

            validationSchema={BasisFormSchema}

            onSubmit={(values, { resetForm }) => {
               setTimeout(() => {
                  dispatch(fetchFormData({ values, getPositionIds, getToken, showModal }));
               }, 500);
               resetForm();
            }}
         >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
               <Form className="basis">

                  <div className="basis__item">
                     <Field
                        type="text"
                        name="name"
                        placeholder="Your name"
                        type="text"
                        className="basis__input"
                        style={errors.name && touched.name ? { borderColor: '#cb3d40' } : null}
                     />
                     {errors.name && touched.name && (<div className="basis__error">{errors.name}</div>)}
                  </div>

                  <div className="basis__item">
                     <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        className="basis__input"
                        style={errors.email && touched.email ? { borderColor: '#cb3d40' } : null}
                     />
                     {errors.email && touched.email && (<div className="basis__error">{errors.email}</div>)}
                  </div>

                  <div className="basis__item">
                     <Field
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="basis__input"
                        style={errors.phone && touched.phone ? { borderColor: '#cb3d40' } : null}
                     />
                     {errors.phone && touched.phone && (<div className="basis__error">{errors.phone}</div>)}
                  </div>

                  <div className="basis__group">

                     <span className="basis__label">
                        Select your position
                     </span>

                     <div className="basis__item">
                        <Field className="basis__radio" type="radio" id="front" name="position" value="Frontend developer" checked />
                        <label htmlFor="front">Frontend developer</label>
                     </div>

                     <div className="basis__item">
                        <Field className="basis__radio" type="radio" id="back" name="position" value="Backend developer" />
                        <label htmlFor="back">Backend developer</label>
                     </div>

                     <div className="basis__item">
                        <Field className="basis__radio" type="radio" id="desig" name="position" value="Designer" />
                        <label htmlFor="desig">Designer</label>
                     </div>

                     <div className="basis__item">
                        <Field className="basis__radio" type="radio" id="qa" name="position" value="QA" />
                        <label htmlFor="qa">QA</label>
                     </div>

                  </div>

                  <div className="basis__file">
                     <input
                        hidden
                        ref={fileRef}
                        type="file"
                        name="photo"
                        placeholder="Upload"
                        className="basis__input"
                        onChange={e =>
                           setFieldValue('photo', e.target.files[0])
                        }
                     />
                     <button
                        className="upload"
                        id="upload"
                        onClick={() => {
                           fileRef.current.click();
                        }}>
                        Upload
                     </button>
                     <div className="path">
                        {values.photo && values.photo.name && excerptedText(values.photo.name)}
                     </div>
                     {errors.photo && touched.photo && (<div className="basis__error">{errors.photo}</div>)}
                  </div>

                  <Button
                     handleClick={handleSubmit}
                     classPrefix="register"
                     content="Sign up"
                  />

               </Form>
            )}
         </Formik>
      </>
   )
}
export default BasisForm;