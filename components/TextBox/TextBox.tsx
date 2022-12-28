import { useState, useEffect, useRef, ChangeEvent } from "react";
import "@fontsource/vt323";
import styles from "./TextBox.module.css";

const TextBox = () => {
  const [gameText, setGameText] = useState<string | undefined>("");
  const [gameStart, setGameStart] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<any>("");
  const [name, setName] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [rawText, setRawText] = useState("");
  const [iterations, setIterations] = useState(5);
  const [gameEnded, setGameEnded] = useState(false);
  const [count, setCount] = useState(0);

  const genderOptions = [
    { value: "", text: "You are" },
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
  ];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setGender(event.target.value as string);
  };

  function setOptions(text: string) {
    const startIndex1 = text.indexOf("Option 1");
    const endIndex1 = text.indexOf("Option 2");
    const output1 = text.substring(startIndex1, endIndex1);

    const startIndex2 = text.indexOf("Option 2");
    const endIndex2 = text.length;
    const output2 = text.substring(startIndex2, endIndex2);
    setOptionOne(output1);
    setOptionTwo(output2);
  }

  async function startGame() {
    if (inputRef.current?.value && gender) {
      setName(inputRef.current?.value);
      setGameText("Loading...");
      setGameStart(true);
      setIterations(Math.floor(Math.random() * (10 - 5 + 1) + 5));
      const name = inputRef.current?.value.toString();
      const response = await fetch("/api/startStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gender, name }),
      });
      const data = await response.json();
      const { output } = data;
      console.log("raw", data);

      console.log("OpenAI replied...", output.text);
      setOptions(output.text);

      setRawText(output.text);

      const startIndex = 0;
      const endIndex = output.text.indexOf("Option 1");
      const trimmedText = output.text.substring(startIndex, endIndex);

      setGameText(trimmedText);
    }
  }

  async function onOption1Click() {
    if (optionOne !== "") {
      console.log("count", count);
      setGameText("Loading...");
      setOptionOne("");
      setOptionTwo("");
      if (count < iterations) {
        const basePrompt = `prompt : write me an anime highschool drama story where I am the main character, a young ${gender} called ${name}, where I have to to make choices like in a game before continuing the story,\n example : \n
    the story : \n
    Option 1: \n  
    Option 2: \n `;
        const completionPrompt = `${basePrompt} \n ${rawText} \n Complete the story with ${optionOne} and shortly the main character will need to make a choice before continuing. \n example : \n
    the story : \n
    Option 1: \n  
    Option 2: \n  `;
        const response = await fetch("/api/completeStory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completionPrompt }),
        });
        console.log("zzzz", count)
        const data = await response.json();
        const { output } = data;
        console.log("raw", output);
;
        setOptions(output.text);

        setRawText(output.text);

        const startIndex = 0;
        const endIndex = output.text.indexOf("Option 1");
        const trimmedText = output.text.substring(startIndex, endIndex);

        setGameText(trimmedText);

      } else {
        const basePrompt = `prompt : write me an anime highschool drama story where I am the main character, a young ${gender} called ${name}, where I have to to make choices like in a game before continuing the story,\n example : \n
        the story : \n
        Option 1: \n  
        Option 2: \n `;
        const completionPrompt = `${basePrompt} \n ${rawText} \n Complete the story with ${optionOne} with a twist in the end that can be happy or sad. \n example : \n
        the story : \n `;
        const response = await fetch("/api/completeStory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completionPrompt }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("raw", output);

        setGameText(output.text);

        setGameEnded(true);
      }
    }
  }

  async function onOption2Click() {
    if (optionTwo !== "") {
      console.log("count", count);

      setGameText("Loading...");
      setOptionOne("");
      setOptionTwo("");
      if (count < iterations) {
        const basePrompt = `prompt : write me an anime highschool drama story where I am the main character, a young ${gender} called ${name}, where I have to to make choices like in a game before continuing the story,\n example : \n
    the story : \n
    Option 1: \n  
    Option 2: \n `;
        const completionPrompt = `${basePrompt} \n ${rawText} \n Complete the story with ${optionTwo} and shortly the main character will need to make a choice before continuing. \n example : \n
    the story : \n
    Option 1: \n  
    Option 2: \n  `;
        const response = await fetch("/api/completeStory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completionPrompt }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("raw", output);

        setOptions(output.text);

        setRawText(output.text);

        const startIndex = 0;
        const endIndex = output.text.indexOf("Option 1");
        const trimmedText = output.text.substring(startIndex, endIndex);

        setGameText(trimmedText);
      } else {
        const basePrompt = `prompt : write me an anime highschool drama story where I am the main character, a young ${gender} called ${name}, where I have to to make choices like in a game before continuing the story,\n example : \n
        the story : \n
        Option 1: \n  
        Option 2: \n `;
        const completionPrompt = `${basePrompt} \n ${rawText} \n Complete the story with ${optionTwo} with a twist in the end that can be happy or sad. \n example : \n
        the story : \n `;
        const response = await fetch("/api/completeStory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completionPrompt }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("raw", output);

        setGameText(output.text);
        setGameEnded(true);
      }
    }
  }

  return (
    <>
      {gameStart ? (
        <div className={styles.container}>
          <div>{gameText}</div>
          {gameEnded ? (
            <div className={styles["btn-over"]}>
              <button className={styles.btn}>Play Again</button>
            </div>
          ) : (
            <div className={styles["btn-grid"]}>
              <button className={styles.btn} onClick={onOption1Click}>
                {optionOne == "" ? "Option 1" : optionOne}
              </button>
              <button className={styles.btn} onClick={onOption2Click}>
                {optionTwo == "" ? "Option 2" : optionTwo}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.container_name}>
          <div className={styles.form}>
            <input
              ref={inputRef}
              value={inputRef?.current?.value}
              type="text"
              placeholder="Your Name "
            />

            <select value={gender} onChange={(e) => handleSelectChange(e)}>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className={styles["btn-name"]}>
            <button className={styles.btn} onClick={startGame}>
              Start
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default TextBox;
