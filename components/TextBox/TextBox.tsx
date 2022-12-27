import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const TextBox = (props: any) => {
  const [text, setText] = useState<string | undefined>("");
  const [options, setOptions] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [userName, setUserName] = useState("");

  function startGame() {
    if (userName) {
      setGameStart(true);
    }
  }

  // function showOption(option) {
  //   return option.requiredState == null || option.requiredState(state);
  // }

  // function selectOption(option) {
  //   const nextTextNodeId = option.nextText;
  //   if (nextTextNodeId <= 0) {
  //     return startGame();
  //   }
  //   state = Object.assign(state, option.setState);
  //   showText(nextTextNodeId);
  // }

  return (
    <div className={styles.container}>
      <div id="text">{props.text}</div>
      <div id="option-buttons" className={styles["btn-grid"]}>
        <button className={styles.btn} onClick={props.onOption1Click}>
          Option 1
        </button>
        <button className={styles.btn} onClick={props.onOption2Click}>
          Option 2
        </button>
        <button className={styles.btn} onClick={props.onOption3Click}>
          Option 3
        </button>
        <button className={styles.btn} onClick={props.onOption4Click}>
          Option 4
        </button>
      </div>
    </div>
  );
};
export default TextBox;
