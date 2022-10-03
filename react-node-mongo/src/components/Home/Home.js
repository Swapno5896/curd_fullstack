import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user/')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const handelDelet = (_id) => {
        const proced = window.confirm('are you sure to delet')
        if (proced) {
            console.log('deleting', _id);
            const url = `http://localhost:5000/user/${_id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('deleted');
                        const remaining = users.filter(user => user._id !== _id);
                        setUsers(remaining)
                    }
                })
        }
    }
    return (
        <div>
            <h1>We have {users.length} user</h1>
            <ul>
                {
                    users.map(user => <li
                        id={user._id}
                    >name : {user.name}

                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handelDelet(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Home;