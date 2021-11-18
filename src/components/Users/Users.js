import React, { useEffect, useState } from 'react';
import './Users.scss';
import Layout from '../UI/Layout/Layout';
import Heading from '../UI/Heading/Heading';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Loader from '../UI/Loader/Loader';
import { getUnique } from '../functions';

const Users = () => {
   const [users, setUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [items, setItems] = useState(6)

   useEffect(() => {
      const loadUsers = async () => {
         try {
            setIsLoading(true);
            const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${items}`, {
               method: 'GET',
               headers: {
                  'Content-type': 'application/json',
                  'Authorization': 'Bearer eyJpdiI6Im9mV1NTMlFZQTlJeWlLQ3liVks1MGc9PSIsInZhbHVlIjoiRTJBbUR4dHp1dWJ3ekQ4bG85WVZya3ZpRGlMQ0g5ZHk4M05UNUY4Rmd3eFM3czc2UDRBR0E4SDR5WXlVTG5DUDdSRTJTMU1KQ2lUQmVZYXZZOHJJUVE9PSIsIm1hYyI6ImE5YmNiODljZjMzMTdmMDc4NjEwN2RjZTVkNzBmMWI0ZDQyN2YzODI5YjQxMzE4MWY0MmY0ZTQ1OGY4NTkyNWQifQ=='
               }
            })
            const data = await response.json();
            setUsers(getUnique([...users, ...data.users], 'id'))
         } catch (error) {
            setErrorMsg(`Error message: ${error}. Try again later.`);
         } finally {
            setIsLoading(false);
         }
      }
      loadUsers();
   }, [items])

   const loadMore = () => {
      setItems(prev => prev + 3);
   }

   return (
      <Layout layoutName="users">
         <div className="users__titles">
            <Heading
               classPrefix="users"
               tag="h2"
               content="Our cheerful users"
            />
            <Heading
               classPrefix="users"
               tag="h3"
               content="The best specialists are shown below"
            />
         </div>
         <ul className="users__list">
            {
               users && users.map((item, index) => {
                  return (
                     <Card
                        key={index}
                        photo={item.photo}
                        name={item.name}
                        position={item.position}
                        email={item.email}
                        phone={item.phone}
                     />
                  )
               })
            }
         </ul>
         {isLoading ? <Loader /> : null}
         <Button
            classPrefix="users"
            classModifier="loadMore"
            handleClick={loadMore}
            content={isLoading ? 'Loading...' : 'Show more'}
         />
      </Layout>
   );
}

export default Users;