import React, { useEffect, useState } from 'react';
import './Users.scss';
import Layout from '../UI/Layout/Layout';
import Heading from '../UI/Heading/Heading';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Loader from '../UI/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData, loadMoreUsers, unionLoadedUsers } from '../store/slices/usersDataSlice';

const Users = () => {
   const { usersData, countUsers, loadingUsers, errorUsers } = useSelector(state => state.usersData)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchUsersData(countUsers))
      dispatch(unionLoadedUsers(usersData))
   }, [countUsers])

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
               usersData && usersData.map((item, index) => {
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
         {loadingUsers ? <Loader /> :
            errorUsers ? <span className="error-message">An error occerd: {errorUsers}</span> :
               null}
         <Button
            classPrefix="users"
            classModifier="loadMore"
            handleClick={() => dispatch(loadMoreUsers(3))}
            content={loadingUsers ? 'Loading...' : 'Show more'}
         />
      </Layout>
   );
}

export default Users;