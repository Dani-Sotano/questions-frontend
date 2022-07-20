import React from "react";
import background from "../../resources/background.jpg";
import styles from './Background.module.css'

// style={{ backgroundImage: `url(${background})` }}
function Background(props) {
  return (
    <div className={styles.image}>
      {props.children}
    </div>
  );
}

export default Background;