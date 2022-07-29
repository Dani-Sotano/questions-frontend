import {ACTIONS} from '../components/Questions'

function getCategories(setCategories) {
    fetch(`http://localhost:5001/questions/categories`)
        .then((response) => response.json())
        .then((data) => {
            if (!data || data.categories.length === 0) {
                setCategories([]);
            }
            setCategories(data.categories)
        })
}

function getGoals(category, setGoals) {
    fetch(`http://localhost:5001/questions/goals/${category}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data || data.goals.length === 0) {
                setGoals([]);
            }
            setGoals(data.goals)
        })
}

function getQuestions(category, goal, dispatch) {
    fetch(`http://localhost:5001/questions/list/${category}/${goal}`)
        .then((response) => response.json())
        .then((data) => dispatch({
                type: ACTIONS.DATA_UPDATE,
                data: data.questions
            })
        )
}

export { getQuestions, getCategories, getGoals }
