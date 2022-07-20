import { ACTIONS } from './../../App.js';

import styles from './../overview/overview.module.css'

const Button = props => {
    const onClickHandler = (event) => {
        event.preventDefault();
        props.dispatch({
            type: ACTIONS.CHANGE_VIEW,
            payload: {
                category: props.category,
                selection: props.selection
            }
        })
    }

    return (
        <div className={styles.box}>
            <button type={props.type} className={styles.element} value={props.value} onClick={onClickHandler}>
                {props.children}
            </button>
        </div>

    )
}

export default Button;