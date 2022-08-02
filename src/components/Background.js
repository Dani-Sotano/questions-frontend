import React from "react";
import styles from '../styles/css/Background.module.css'

function Background(props) {
  return (
    <div className={styles.image}>
      {props.children}
    </div>
  );
}

export default Background;