import { ACTIONS } from '../App.js';
import React from 'react';

import styles from '../styles/Overview.module.css'

const Button = props => {
    const onClickHandler = (event) => {
        event.preventDefault();
        props.dispatch({
            type: ACTIONS.CHANGE_VIEW,
            payload: {
                view: props.view,
                selection: props.selection
            }
        })
    }

    return (
        <div className={styles.box}>
            <button type={props.type} className={styles.element} value={props.selection} onClick={onClickHandler}>
                {props.children}
            </button>
        </div>

    )
}

export default Button;