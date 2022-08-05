import React, { useState, useEffect } from 'react';
import styles from '../styles/css/Selection.module.css'
import { ACTIONS } from '../App.js';
import {getGoals} from '../data/DataService'
import background from "../resources/Tahoe.jpeg";

function Goal(props) {

    const [goals, setGoals] = useState([]);

    const onClickHandler = (event) => {
        event.preventDefault();
        props.dispatch({
            type: ACTIONS.CHANGE_VIEW,
            payload: {
                view: props.view,
                selection: event.target.value
            }
        })
    }


    useEffect(() => {
        const fetchData = async () => {
            let goalNames = await getGoals(props.category);
            setGoals(goalNames);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.overview}>
        <img src={props.image} className={styles.background_goal}></img>
        <div className={styles.goal_container}>
            <div className={styles.selection}>
                <div>
                    <h1 className={styles.heading}>What direction shall your conversation go?</h1>
                    <div className={styles.buttons}>
                        {goals.map((goal, index) => (
                            <button 
                            type="text"
                            className={styles.element} 
                            key={index} 
                            value={goal} 
                            onClick={onClickHandler}>
                                {goal}
                            </button>

                        ))}
                    </div>
                </div>

            </div>


        </div >
    </div>
    )
}

export default Goal;