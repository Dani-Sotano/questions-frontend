import Card from '../../card/general/Card.js'
import InputQuestions from '../../userInput/InputQuestions'
import React, { useState } from 'react';
import styles from './../overview.module.css'
import Button from '../../cssElements/Button.js'
import {SELECTIONS} from './../../../App.js';

function Categories(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {props.categories.map((category) => (
                    <Button 
                    key={category.id}
                    category={SELECTIONS.CATEGORIES}
                    selection={category}
                    dispatch={props.dispatch}>
                        <h2 className={styles.buttonText}>{category.title}</h2>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Categories;