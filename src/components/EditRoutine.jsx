import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';


const EditRoutine = () => {

    let initialState = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }
    const [state, setState] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8800/routines/'+ id)
        .then(response => {
            
            setState(prevState => {
                return {
                    ...prevState,
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                };
            });   
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('http://localhost:8800/users/')
        .then(response => {
            if (response.data.length > 0) {
           
            setState(prevState => {
            return {
                ...prevState,
                users: response.data.map(user => user.username),
            };
        });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [id]);

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


    function onSubmit(e) {
        e.preventDefault();

        const routine = {
        username: state.username,
        description: state.description,
        duration: state.duration,
        date: state.date
        }

        console.log(routine, routine.date);

        axios.post('http://localhost:8800/routines/update/' + id, routine)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <select
                    required
                    name="username"
                    className="form-control"
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
                    name="description"
                    className="form-control"
                    value={state.description}
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    name="duration"
                    className="form-control"
                    value={state.duration}
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    name="date"
                    selected={state.date}
                    onChange={handleDateChange}
                    />
                </div>
                </div>

                <div className="form-group" style={{marginTop:"15px"}}>
                <input type="submit" value="Edit Routines Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default EditRoutine;
