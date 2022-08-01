import React from 'react';
import styles from '../../styles/Input.module.css'


const GoalSelector = (props) => {
  const handleOnClick = (event) => {
    props.addGoal({
      category: props.category.name,
      goal: event.target.value
    })
  }
  return (
    <div className={styles.selection_goals}>
    {props.category.goals.map((goal, index) =>
      <div key={index} className={styles.selection_goal}>
        <button
        className={styles.goal_button}
          value={goal}
          onClick={handleOnClick}>{goal}</button>
      </div>)
    }
  </div>
  )

}


export default GoalSelector;
