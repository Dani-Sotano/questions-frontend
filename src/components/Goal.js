import React, { useState, useEffect } from 'react';
import styles from '../styles/Overview.module.css'
import Button from './Button.js'
import {getGoals} from '../data/DataService'

function Goal(props) {

    const [goals, setGoals] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            let goalNames = await getGoals(props.category);
            setGoals(goalNames);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {goals.map((goal, index) => (
                    <Button 
                    key={index} 
                    selection={goal}
                    view={props.view}
                    dispatch={props.dispatch}>
                        <h2 className={styles.buttonText}>{goal}</h2>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Goal;