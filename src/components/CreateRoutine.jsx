import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateRoutine = () => {
    let initialState = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        axios.get('http://localhost:8800/users/')
        .then(response => {
            if (response.data.length > 0) {
                setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
            })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    
    

    function handleChange(event){
        const { name, value } = event.target;

        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    function handleDateChange(date){
        setState(prevState => {
            return {
                ...prevState,
                date: date
            };
        });
    }

    function onSubmit(e){
        e.preventDefault();

        const routine = state;

        console.log(routine);

        axios.post('http://localhost:8800/routines/add', routine)
        .then(res => console.log(res.data));

        window.location = '/';
    }



    
   

    return (
         <div>
            <h3>Create New Routine Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <select 
                    required
                    className="form-control"
                    name="username"
                    value={state.username}
                    onChange={handleChange}>
                    {
                        state.users.map(function(user) {
                        return <option 
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                    }
                </select>
                </div>
                <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    name="duration"
                    value={state.duration}
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={state.date}
                    onChange={handleDateChange}
                    />
                </div>
                </div>

                <div className="form-group" style={{marginTop:"15px"}}>
                <input type="submit" value="Create Routine Log" className="btn btn-primary" />
                </div>
            </form>
            </div>
    );
}

export default CreateRoutine;
