import React, { useEffect, useReducer } from 'react'
import styles from '../styles/css/Selection.module.css'
import { getQuestions } from '../data/DataService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'



import PropTypes from "prop-types";

export const ACTIONS = {
    NEXT_QUESTION: "next_question",
    PREV_QUESTION: "prev_question",
    DATA_UPDATE: "data_update"
}

function setDisabledValues(questions, id) {
    let nextDisabled = false;
    let prevDisabled = false;
    console.log(id)
    if (id === questions.length) {
        nextDisabled = true;
    }
    if (id === 0) {
        prevDisabled = true;
    }
    return [prevDisabled, nextDisabled]
}

const reduce = (state, action) => {
    if (action.type === ACTIONS.NEXT_QUESTION) {
        let nextQuestionId = state.currentQuestionId + 1
        let [prevDisabled, nextDisabled] = setDisabledValues(state.questions, nextQuestionId);
        return { ...state, 
            currentQuestionId: state.currentQuestionId + 1, 
            nextDisabled: nextDisabled, 
            prevDisabled: prevDisabled 
        }
    }
    if (action.type === ACTIONS.PREV_QUESTION) {
        let prevQuestionId = state.currentQuestionId -1
        let [prevDisabled, nextDisabled] = setDisabledValues(state.questions, prevQuestionId);
        return { ...state, currentQuestionId: prevQuestionId, nextDisabled: nextDisabled, prevDisabled: prevDisabled }
    }
    if (action.type === ACTIONS.DATA_UPDATE) {
        let [prevDisabled, nextDisabled] = setDisabledValues(state);
        return { ...state, questions: action.data, isLoading: false, nextDisabled: nextDisabled }
    }
}

function Questions({ category, goal, image }) {

    let data = [];

    let [state, dispatch] = useReducer(reduce, {
        questions: data,
        currentQuestionId: 0,
        prevDisabled: true,
        nextDisabled: true,
        isLoading: true
    })

    useEffect(() => {
        async function fetchData(category, goal) {
            let questions = await getQuestions(category, goal);
            dispatch({
                type: ACTIONS.DATA_UPDATE,
                data: questions
            }
            )
        }
        fetchData(category, goal);
    }, []);

    function handleNextQuestion() {
        dispatch({
            type: ACTIONS.NEXT_QUESTION
        })
    }

    function handlePrevQuestion() {
        dispatch({
            type: ACTIONS.PREV_QUESTION
        })
    }

console.log(data)

    return (
        <div className={styles.overview}>
            <img src={image} className={styles.background_question}></img>
            <div className={styles.container_question}>
                <div className={styles.question_box}>
                    {!state.isLoading && state.questions.length > 0 &&
                        <div className={styles.question}>
                            {state.questions[state.currentQuestionId]}
                        </div>
                    }
                    {(!state.isLoading && state.questions.length === 0) &&
                        <p className={styles.empty}>There is no data...</p>
                    }
                    <button className={styles.prev} onClick={handlePrevQuestion} disabled={state.prevDisabled}>
                        <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
                    </button>
                    <button className={styles.next} onClick={handleNextQuestion} disabled={state.nextDisabled}>
                        <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
                    </button>
                </div>
            </div>
        </div >
    )
}


Questions.propTypes = {
    category: PropTypes.string,
    goal: PropTypes.string
}

export default Questions;
