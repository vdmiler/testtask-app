import React from 'react';
import './Card.scss';
import Heading from '../Heading/Heading';
import Text from '../Text/Text';
import { excerptedText, getFileNameFromLink } from '../../functions';
import placeholder_img from '../../../img/placeholder.png';

const Card = ({ photo, name, position, email, phone }) => {
   const excerptName = name && excerptedText(name),
      excerptPosition = position && excerptedText(position),
      excerptEmail = email && excerptedText(email),
      excerptPhone = phone && excerptedText(phone);
   const link = getFileNameFromLink(photo);
   return (
      <div className="card">
         <div className="card__picture">
            <img src={link === 'placeholder' ? placeholder_img : photo} alt="" className="card__img" />
         </div>
         <div className="card__content">
            <Heading
               classPrefix="card"
               tag="h3"
               content={excerptName}
            />
            <Text
               classPrefix="card"
               classModifier="position"
            >
               {excerptPosition}
            </Text>
            <a href={`mailto:${email}`} className="card__link card__link_email">
               {excerptEmail}
            </a>
            <a href={`tel:${phone}`} className="card__link card__link_phone">
               {excerptPhone}
            </a>
         </div>
      </div>
   );
}

export default Card;