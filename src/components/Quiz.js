import React from "react";
import { nanoid } from "nanoid";
const Quiz = (props) => {
  console.log(props);
  const styles = {
    backgroundColor: props.isSelected ? "#d6dbf5" : "transparent",
  };
  return (
    <>
      <div className="questions">
        <h3>{props.question}</h3>
        <div className="options">
          {props.answers.map((answer) => {
            return (
              <h6
                key={answer.id}
                className="correct"
                style={styles}
                onClick={() => props.handleSelect(props.id, answer.id)}
              >
                {answer.answer}{" "}
              </h6>
            );
          })}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Quiz;
