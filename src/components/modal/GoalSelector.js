import React, {useState, useEffect} from 'react';
import styles from '../../styles/Input.module.css'


const createButtonGoals = (goals) => {
  let button = {};
  for(let g of goals){
    button[g.name] = false;
  }
  return button;
}

const GoalSelector = (props) => {

  const [goals, setGoals] = useState("");

  useEffect(() => {
    async function createButtons() {
      let goalButton = await createButtonGoals(props.category.goals);
      setGoals(goalButton)
    }
    createButtons();
  }, []);

  const handleOnClick = (event) => {
    let goalName = event.target.value;
    if (goals[goalName]){
      setGoals({...goals, [goalName]: false})
      props.removeGoal({category: props.category.name, goal: goalName})
    } else {
      setGoals({ ...goals, [goalName]: true})
      props.addGoal({category: props.category.name, goal: goalName})
    }
  }


  return (
    <div className={styles.selection_goals}>
    {Object.keys(goals).map((name, index) =>
      <div key={index} className={styles.selection_goal}>
        <button
        type="button"
        className={!props.category.selected ? styles.goal_button_disabled :
          goals[name] ? styles.goal_button_selected :  styles.goal_button_not_selected}
          value={name}
          disabled={!props.category.selected}
          onClick={handleOnClick}>{name}</button>
      </div>)
    }
  </div>
  )

}


export default GoalSelector;
