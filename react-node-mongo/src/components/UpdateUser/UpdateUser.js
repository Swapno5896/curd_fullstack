import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { _id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/user/${_id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])


    // update
    const handeUpdateUser = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const user = { name, email }
        console.log(user);

        // send to database
        fetch(`http://localhost:5000/user/${_id}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                event.target.reset()
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <h2>update user : {_id}</h2>
            <form action="" onSubmit={handeUpdateUser}>
                <input type="text" name='name' placeholder='Name' required />
                <input type="email" name='email' placeholder='Email' required />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default UpdateUser;