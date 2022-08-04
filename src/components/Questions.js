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

function setDisabledValues(state) {
    let nextDisabled = false;
    let prevDisabled = false;
    if (state.currentQuestionId + 1 === state.questions.length - 1) {
        nextDisabled = true;
    }
    if (state.currentQuestionId - 1 == 0) {
        prevDisabled = true;
    }
    return [prevDisabled, nextDisabled]
}

const reduce = (state, action) => {
    if (action.type === ACTIONS.NEXT_QUESTION) {
        let [prevDisabled, nextDisabled] = setDisabledValues(state);
        return { ...state, currentQuestionId: state.currentQuestionId + 1, nextDisabled: nextDisabled, prevDisabled: prevDisabled }
    }
    if (action.type === ACTIONS.PREV_QUESTION) {
        let [prevDisabled, nextDisabled] = setDisabledValues(state);
        return { ...state, currentQuestionId: state.currentQuestionId - 1, nextDisabled: nextDisabled, prevDisabled: prevDisabled }
    }
    if (action.type === ACTIONS.DATA_UPDATE) {
        return { ...state, questions: action.data, isLoading: false }
    }
}

function Questions({ category, goal }) {

    let data = [];

    let [state, dispatch] = useReducer(reduce, {
        questions: data,
        currentQuestionId: 0,
        prevDisabled: true,
        nextDisabled: data.length === 1,
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
    
    return (
        <div className={styles.overview}>
            <div className={styles.background_question}></div>
            <div className={styles.container_question}>
                <div className={styles.question_box}>
                    {!state.isLoading && state.questions.length &&
                        <div className={styles.question}>
                            {state.questions[state.currentQuestionId]}
                        </div>
                    }
                    {!state.isLoading && !state.questions.length &&
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
