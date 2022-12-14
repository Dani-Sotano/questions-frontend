import React, { useState, useReducer, useEffect } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Goal from "./components/Goal";
import InputQuestions from "./components/modal/InputQuestion";
import Questions from "./components/Questions";
import ReactModal from 'react-modal';
import NightSky from './resources/NightSky.jpeg'
import LakeSide from './resources/background.jpg';
import Tahoe from './resources/Tahoe.jpeg';





import styles from './styles/css/Overview.module.css'

export const VIEW = {
  CATEGORY: 'category',
  GOAL: 'goal',
  QUESTION: 'question'
}

export const ACTIONS = {
  CHANGE_VIEW: "change-view",
  REMOVE_CATEGORY: "remove_category",
  REMOVE_GOALS: "remove_goals",
  CHANGE_MODAL: "change_modal",
  IMAGE: "background_image"
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
  if (action.type === ACTIONS.CHANGE_MODAL) {
    return { ...state, modalOpen: action.isOpen }
  }
  if(action.type === ACTIONS.IMAGE){
    state.categoryImage.src = action.payload.category,
    state.goalsImage.src = action.payload.goals,
    state.questionsImage.src = action.payload.questions
    return { ...state, 
      categoryImage: state.categoryImage,
      goalsImage: state.goalsImage,
      questionsImage: state.questionsImage
    }
  }
}




function App() {

  const [state, dispatch] = useReducer(reducer, {
    category: null,
    goal: null,
    view: VIEW.CATEGORY,
    modalOpen: false,
    categoryImage: new Image(),
    goalsImage: new Image(),
    questionsImage: new Image(),
  })

  useEffect(() => {
    dispatch({
      type: ACTIONS.IMAGE,
      payload: {
        category: LakeSide,
        goals: Tahoe,
        questions: NightSky
      }})

    }, [state.categoryImage])

    const handleCloseModal = () => {
      dispatch({ type: ACTIONS.CHANGE_MODAL, isOpen: false })
    }

    const handleOpenModal = () => {
      dispatch({ type: ACTIONS.CHANGE_MODAL, isOpen: true })
    }

    return (
      <div
        className={styles.wrapper}
        onClick={state.openModal ? handleCloseModal : undefined}>
        <Header
          className={styles.header}
          openModal={handleOpenModal}
          isOpen={state.modalOpen}
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
              view={VIEW.GOAL}
              image={state.goalsImage.src}></Goal>}
          {state.view === VIEW.CATEGORY &&
            <Categories
              dispatch={dispatch}
              view={VIEW.CATEGORY}
              image={state.categoryImage.src}></Categories>
          }
          {state.view === VIEW.QUESTION &&
            <Questions
              category={state.category}
              goal={state.goal}
              image={state.questionsImage.src}
            ></Questions>
          }
        </div>
        <ReactModal
          ariaHideApp={false}
          isOpen={state.modalOpen}
          contentLabel="Input new question"
          className={styles.modal}
        >
          <div>
            <InputQuestions closeModal={handleCloseModal}></InputQuestions>
          </div>
        </ReactModal>


      </div>

    );
  }

export default App;
