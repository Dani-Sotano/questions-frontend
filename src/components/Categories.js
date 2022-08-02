import React, { useState, useEffect } from 'react';
import styles from '../styles/Overview.module.css'
import Button from './Button.js'
import { getCategories } from '../data/DataService'

function Categories(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let categoryNames = await getCategories();
            setCategories(categoryNames);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        selection={category}
                        view={props.view}
                        dispatch={props.dispatch}>
                        <h2 className={styles.buttonText}>{category}</h2>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Categories;