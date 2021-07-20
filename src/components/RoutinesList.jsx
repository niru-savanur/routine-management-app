import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Routine = props => (
  <tr>
    <td>{props.routine.username}</td>
    <td>{props.routine.description}</td>
    <td>{props.routine.duration}</td>
    <td>{props.routine.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.routine._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRoutine(props.routine._id) }}>delete</a>
    </td>
  </tr>
)


const RoutinesList = () => {

    const [routines, setRoutines] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8800/routines/')
        .then(response => {
            setRoutines( response.data )
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);


    function deleteRoutine(id) {
        axios.delete('http://localhost:8800/routines/'+id)
        .then(response => { console.log(response.data)});

        setRoutines(routines.filter(el => el._id !== id))
    }

    function routineList() {
        return routines.map(currentRoutine => {
        return <Routine routine={currentRoutine} deleteRoutine={deleteRoutine} key={currentRoutine._id}/>;
        })
    }




    return (
        <div>
            <h3>Logged Routines</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { routineList() }
            </tbody>
            </table>
        </div>
    );
}

export default RoutinesList;
