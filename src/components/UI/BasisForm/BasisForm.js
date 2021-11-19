import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import './BasisForm.scss';
import Button from '../Button/Button';
import { excerptedText } from '../../functions';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];

const BasisFormSchema = Yup.object().shape({
   name: Yup
      .string()
      .required('Required'),
   email: Yup
      .string()
      .email('Invalid email')
      .required('Required'),
   phone: Yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
   position: Yup
      .string()
      .required('Required'),
   file: Yup.mixed()
      .nullable()
      .required('Required')
      .test(
         'FILE_SIZE',
         'File Size is too large',
         value => !value || (value && value.size <= 8024 * 8024)
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
   file: ''
}

const BasisForm = ({ showModal }) => {
   const fileRef = useRef(null);
   return (
      <>
         <Formik

            initialValues={BasisFormValues}

            validationSchema={BasisFormSchema}

            onSubmit={(values, { resetForm }) => {
               setTimeout(() => {
                  //alert(JSON.stringify(values, null, 2));
                  showModal(true)
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
                        name="file"
                        placeholder="Upload"
                        className="basis__input"
                        onChange={e =>
                           setFieldValue('file', e.target.files[0])
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
                        {values.file.name && excerptedText(values.file.name)}
                     </div>
                     {errors.file && touched.file && (<div className="basis__error">{errors.file}</div>)}
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