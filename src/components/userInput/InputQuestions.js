import './InputQuestions.css'
import React, { useState } from 'react';

const InputQuestions = (props) => {
    const [enteredQuestion, setEnteredQuestion] = useState('')
    const [enteredGoal, setEnteredGoal] = useState('')
    const [enteredCategory, setEnteredCategory] = useState('')

    const changeQuestionHandler = (event) => {
        setEnteredQuestion(event.target.value)
    }
    const changeGoalHandler = (event) => {
        setEnteredGoal(event.target.value)
    }
    const changeCategoryHandler = (event) => {
        setEnteredCategory(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault(); // no request is sent
        const data = {
            question: enteredQuestion,
            category: enteredCategory,
            goal: enteredGoal
        };
        props.onSaveQuestionsData(data)
        setEnteredCategory('')
        setEnteredGoal('')
        setEnteredQuestion('')
    }

    return <div>
        <form onSubmit={submitHandler}>
            <div>
                <label>Category</label>
                <input type='text' value={enteredCategory} onChange={changeCategoryHandler} />
            </div>
            <div>
                <label>Goal</label>
                <input type='text' value={enteredGoal} onChange={changeGoalHandler} />
            </div>
            <div>
                <label>Question</label>
                <input type='text' value={enteredQuestion} onChange={changeQuestionHandler}/>
            </div>
            <div>
                <button type='submit'>Add Question</button>
            </div>
        </form>
    </div>
}

export default InputQuestions;