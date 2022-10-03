import React from 'react';

const AddUser = () => {
    const handeAddUser = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const user = { name, email }
        console.log(user);

        // send to database
        fetch('http://localhost:5000/user/', {
            method: 'POST', // or 'PUT'
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
            <h2>Add user</h2>
            <form action="" onSubmit={handeAddUser}>
                <input type="text" name='name' placeholder='Name' required />
                <input type="email" name='email' placeholder='Email' required />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;