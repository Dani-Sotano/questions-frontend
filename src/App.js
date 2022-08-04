import React, { useState, useReducer } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Goal from "./components/Goal";
import InputQuestions from "./components/modal/InputQuestion";
import Questions from "./components/Questions";
import ReactModal from 'react-modal';

import styles from './styles/css/Overview.module.css'

export const VIEW = {
  CATEGORY: 'category',
  GOAL: 'goal',
  QUESTION: 'question'
}

export const ACTIONS = {
  CHANGE_VIEW: "change-view",
  REMOVE_CATEGORY: "remove_category",
  REMOVE_GOALS: "remove_goals"
}

const reducer = function (state, action) {
  if (action.type === ACTIONS.CHANGE_VIEW) {
    if (action.payload.view === VIEW.CATEGORY) {
      return { ...state, category: action.payload.selection, view: VIEW.GOAL }
    } else if (action.payload.view === VIEW.GOAL) {
      return { ...state, goal: action.payload.selection, view: VIEW.QUESTION }
    } else {
      return { ...state, category: action.payload.selection, view: VIEW.QUESTION };
    }
  }
  if (action.type === ACTIONS.REMOVE_CATEGORY) {
    return { ...state, goal: null, category: null, view: VIEW.CATEGORY }
  } else if (action.type === ACTIONS.REMOVE_GOALS) {
    return { ...state, goal: null, view: VIEW.GOAL }
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, {
    category: null,
    goal: null,
    view: VIEW.CATEGORY
  })

  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper} onClick={isOpen ? handleCloseModal : undefined}>
      <Header
      className={styles.header}
        openModal={setIsOpen}
        isOpen={isOpen}
        category={state.category}
        goal={state.goal}
        dispatch={dispatch}
      >
      </Header>

    
      <div className={styles.content}>
      {state.view === VIEW.GOAL &&
        <Goal
          dispatch={dispatch}
          category={state.category}
          view={VIEW.GOAL}></Goal>}
      {state.view === VIEW.CATEGORY &&
        <Categories
          dispatch={dispatch}
          view={VIEW.CATEGORY}></Categories>
      }
      {state.view === VIEW.QUESTION &&
        <Questions
          category={state.category}
          goal={state.goal}
        ></Questions>
      }
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel="Input new question"
        className={styles.modal}
      >
        <div onClick={e => e.stopPropagation()} >
          <InputQuestions closeModal={handleCloseModal}></InputQuestions>
        </div>
      </ReactModal>


    </div>

  );
}

export default App;
