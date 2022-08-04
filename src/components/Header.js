import React from 'react'
import styles from '../styles/css/Header.module.css'
import { ACTIONS } from '../App.js';

export default function Header(props) {

  const handleOpenModal = () => {
    props.openModal(true)
  }

  const handleBackToCategory = (event)  => {
    event.preventDefault();
    props.dispatch({
        type: ACTIONS.REMOVE_CATEGORY,
    })
  }

  const handleBackToGoal = (event)  => {
    event.preventDefault();
    props.dispatch({
        type: ACTIONS.REMOVE_GOALS,
    })
  }

  return (
    <div>
      <div className={styles.breadcrumb} >
        {props.category &&
          <button className={styles.element} onClick={handleBackToCategory}>{props.category}  </button>
        }
        {props.goal &&
          <div className={styles.element_container}>
            <button className={styles.element} >  &gt;  </button>
            <button className={styles.element} onClick={handleBackToGoal}>{props.goal}</button>
          </div>
        }

      </div>
      <button className={styles.button} onClick={handleOpenModal}>Add</button>
    </div>
  )
}
