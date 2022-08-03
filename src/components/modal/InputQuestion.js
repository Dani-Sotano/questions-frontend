import React, { useEffect, useState } from 'react';
import styles from '../../styles/css/Input.module.css';
import GoalSelector from './GoalSelector';
import { getCategories, getGoals, saveQuestionToDB } from '../../data/DataService'

const InputQuestion = (props) => {

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
          let goalsWithOptions = goals.map(goal => {
            return {
              name: goal,
              selected: false
            }
          })
          return {
            name: category,
            goals: goalsWithOptions,
            selected: false
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
    saveQuestionToDB(enteredQuestion, selectedGoals)
  }

  const updateCategory = (event) => {
    
    let category = event.target.value;
    let index = selectedCategories.indexOf(category)
    if(index === -1){
      setSelectedCategories(selectedCategories => [...selectedCategories, category]);
    }
    else {
      setSelectedCategories(selectedCategories.filter(el => el === !category))
      selectedGoals.delete(category)
      setSelectedGoals(selectedGoals)
    }
    let newOptions = options.map(option => {
      if(option.name === category)
      option.selected = !option.selected;
      return option;
    })
    setSelectionOptions(newOptions)

  }


  const addGoal = (selection) => {
    if (selectedGoals.has(selection.category)) {
      let selectedGoalsByCategory = selectedGoals.get(selection.category);
      selectedGoalsByCategory.push(selection.goal)
      selectedGoals.set(selection.category, selectedGoalsByCategory)
      setSelectedGoals(selectedGoals)
    } else {
      selectedGoals.set(selection.category, [selection.goal])
      setSelectedGoals(selectedGoals)
    }
  }

  const removeGoal = (selection) => {
    let array = selectedGoals.get(selection.category);
    if(array.length > 1){
      let index = array.indexOf(selection.goal);
      array.splice(index, 1)
      setSelectedGoals(selectedGoals.set(selection.category, array))
    } else {
      selectedGoals.delete(selection.category)
      setSelectedGoals(selectedGoals)
    }
  }

  return (
    <div className={styles.container}>
    <form onSubmit={formSubmissionHandler} className={styles.form}>
      <div className={styles.input}>
        <label htmlFor='question' className={styles.inputLabel}>Thank you for sharing your Question</label>
        <textarea
          className={styles.inputField}
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
              className={category.selected ? styles.category_selected : styles.category_not_selected}
              onClick={updateCategory}
              value={category.name}
              type="button"
            >
              {category.name}
            </button>
            <GoalSelector
              category={category}
              addGoal={addGoal}
              removeGoal={removeGoal}
            ></GoalSelector>

          </div>
        ))}
      </div>
      <div >
                {/* <button onClick={handleCloseModal}>Close Modal</button> */}
      <button className={styles.submitButton}>Submit</button>
        <button className={styles.closeButton} onClick={props.closeModal}>Close</button>

      </div>
    </form>
    </div>

  );
};

export default InputQuestion;
