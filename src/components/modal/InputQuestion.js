import React, { useEffect, useState } from 'react';
import styles from '../../styles/Input.module.css';
import GoalSelector from './GoalSelector';
import { getCategories, getGoals } from '../../data/DataService';

const InputQuestion = () => {

  const [enteredQuestion, setEnteredQuestion] = useState("")
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedGoals, setSelectedGoals] = useState(new Map());
  const [options, setSelectionOptions] = useState([]);


  useEffect(() => {

    async function fetchData() {
      let categoryNames = await getCategories();
      let selectionOptions = await Promise.all(
        categoryNames.map(async category => {
          let goals = await getGoals(category)
          return {
            name: category,
            goals: goals
          }
        }))
      setSelectionOptions(selectionOptions)
    }
    fetchData();
  }, []);

  const questionChangeHandler = event => {
    setEnteredQuestion(event.target.value)
  }


  const formSubmissionHandler = event => {
    event.preventDefault();
    console.log(selectedCategories);
    console.log(selectedGoals)
  }

  const addCategory = (event) => {
    setSelectedCategories(selectedCategories => [...selectedCategories, event.target.value]);
  }

  const addGoal = (selection) => {
    console.log(selection)
    if (selectedGoals.has(selection.category)) {
      let selectedGoalsByCategory = selectedGoals.get(selection.category);
      selectedGoalsByCategory.push(selection.goal)
      setSelectedGoals(selectedGoals => selectedGoals.set(selection.category, selectedGoalsByCategory))
    } else {
      setSelectedGoals(selectedGoals => selectedGoals.set(selection.category, [selection.goal]))
    }
    console.log(selectedGoals)
  }



  return (
    <form onSubmit={formSubmissionHandler} className={styles.container}>
      <div className={styles.input}>
        <label htmlFor='question'>Here you can share your question</label>
        <input
          type='text'
          id='name'
          maxLength={250}
          onChange={questionChangeHandler}
          value={enteredQuestion}
        />
      </div>
      <div className={styles.selection}>
        {options.map((category, index) => (
          <div key={index} className={styles.selection_row}>
            <button
              className={styles.selection_category}
              onClick={addCategory}
              value={category.name}
            >
              {category.name}
            </button>
            <GoalSelector
              category={category}
              addGoal={addGoal}
            ></GoalSelector>

          </div>
        ))}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default InputQuestion;
