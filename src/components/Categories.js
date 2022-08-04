import React, { useState, useEffect } from 'react';
import { ACTIONS } from '../App.js';
import styles from '../styles/css/Selection.module.css'
import { getCategories } from '../data/DataService'

function Categories(props) {

    const [categories, setCategories] = useState(["Family", "Friends", "Partner", "Myself"]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let categoryNames = await getCategories();
    //         setCategories(categoryNames);
    //     }
    //     fetchData();
    // }, []);

    const onClickHandler = (event) => {
        event.preventDefault();
        props.dispatch({
            type: ACTIONS.CHANGE_VIEW,
            payload: {
                view: props.view,
                selection: event.target.value
            }
        })
    }

    return (
        <div className={styles.overview}>
            <div className={styles.background}></div>
            <div className={styles.category_container}>
                <div className={styles.selection}>
                    <div>
                        <h1 className={styles.heading}>Who do you want to talk to?</h1>
                        <div className={styles.buttons}>
                            {categories.map((category, index) => (
                                <button 
                                type={props.type} 
                                className={styles.element} 
                                key={index} 
                                value={category} 
                                onClick={onClickHandler}>
                                    {category}
                                </button>

                            ))}
                        </div>
                    </div>

                </div>


            </div >
        </div>

    )
}

export default Categories;