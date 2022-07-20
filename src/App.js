import { useState, useReducer } from "react";
import Categories from "./components/overview/categories/Categories";
import Goal from "./components/overview/goals/Goal";
import Background from "./components/background/Background";
import Questions from "./components/overview/questions/Questions";
import data from "../src/resources/questions.json";


export const SELECTIONS = {
  CATEGORIES: "categories",
  GOALS: "goals"
}

export const ELEMENTS = {
  CATEGORIES: [
    { title: 'Family', id: 0 },
    { title: 'Relationship', id: 1 },
    { title: 'Friends', id: 2 },
    { title: 'Myself', id: 3 }
  ],
  GOALS: [
    { title: 'Deep Connection', id: 0 },
    { title: 'Smalltalk', id: 1 },
    { title: 'Motivation', id: 2 },
    { title: 'Feelings', id: 3 }
  ]
}

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
    let nextView;
    if(action.payload.category  === SELECTIONS.CATEGORIES){
      nextView = VIEW.GOAL;
    } else if(action.payload.category  === SELECTIONS.GOALS){
      nextView = VIEW.QUESTION;
    }
    return { category: action.payload.selection.title, view: nextView };
  }


}


function App() {

  const [state, dispatch] = useReducer(reducer, {
    category: null,
    goal: null,
    view: VIEW.QUESTION
  })


  return (
    <Background>
      {state.view === VIEW.GOAL &&
        <Goal
          dispatch={dispatch}
          categories={ELEMENTS.GOALS}></Goal>}
      {state.view === VIEW.CATEGORY &&
        <Categories
          dispatch={dispatch}
          categories={ELEMENTS.CATEGORIES}></Categories>
      }{state.view === VIEW.QUESTION &&
        <Questions
          data={data}></Questions>
      }
    </Background>


  );
}

export default App;
