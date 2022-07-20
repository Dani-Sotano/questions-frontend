import React, { useReducer, useState } from 'react'
import styles from './../overview.module.css'

const reduce = () => {
    debugger;
}

function Questions(props) {

    let [movies, setMovies] = useState([]);

    function fetchMoviesHandler(){
        fetch('https://swapi.dev/api/films/') // returns a promise
        .then(response => {
            return response.json();
        }).then(data => {
            data.results;
        })
    }


    //TODO: test if no question exist
    let questionIds = Object.keys(props.data.questions);
    let [state, dispatch] = useReducer(reduce, {
        questions: props.data.questions,
        ids: questionIds,
        currentQuestionId: questionIds[0]
    })

    let value = state.questions[state.currentQuestionId]
    return (
        <div className={styles.questioncontainer}>
            <div className={styles.questionbox}>
                <div className={styles.text}>
                    {value.question}
                </div>
            </div>
        </div>
    )
}

export default Questions;
