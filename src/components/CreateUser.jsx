import React from 'react';
import axios from 'axios';
import { useState} from 'react';

const CreateUser = () => {


    const [user, setUser] = useState("");

    function onChangeUsername(e){
        setUser(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();

        const newUser = {
            username: user
        }

        console.log(newUser);

        axios.post('http://localhost:8800/users/add', newUser)
        .then(res => console.log(res.data));

        setUser("");
    }


    return (
        <div>
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={user}
                onChange={onChangeUsername}
                />
          </div>
          <div className="form-group" style={{marginTop:"15px"}}>
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
}

export default CreateUser;
