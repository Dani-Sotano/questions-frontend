import React, { useState, useReducer } from "react";
import Categories from "./components/Categories";
import Goal from "./components/Goal";
import Background from "./components/Background";
import InputQuestions from "./components/modal/InputQuestion";
import Questions from "./components/Questions";
import ReactModal from 'react-modal';

export const VIEW = {
  CATEGORY: 'category',
  GOAL: 'goal',
  QUESTION: 'question'
}

export const ACTIONS = {
  CHANGE_VIEW: "change-view"
}

const reducer = function (state, action) {
  if (action.type === ACTIONS.CHANGE_VIEW) {
    if (action.payload.view === VIEW.CATEGORY) {
      return { ...state, category: action.payload.selection, view: VIEW.GOAL }
    } else if (action.payload.view === VIEW.GOAL) {
      return { ...state, goal: action.payload.selection, view: VIEW.QUESTION }
    }
    return { ...state, category: action.payload.selection, view: VIEW.QUESTION };
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, {
    category: null,
    goal: null,
    view: VIEW.CATEGORY
  })

  const [isOpen, setIsOpen] = useState(false)


  const handleOpenModal = () => {
    setIsOpen(true)
  }
  
  // const handleCloseModal = () => {
  //   setIsOpen(false);
  // }

  return (
    <Background>

      <button onClick={handleOpenModal}>Trigger Modal</button>
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel="Minimal Modal Example"
      >
        <div>
          <InputQuestions></InputQuestions>
        </div>

        {/* <button onClick={handleCloseModal}>Close Modal</button> */}
      </ReactModal>



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
    </Background>
  );
}

export default App;
