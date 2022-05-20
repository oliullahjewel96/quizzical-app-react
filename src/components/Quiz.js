import React from "react";
import { nanoid } from "nanoid";
const Quiz = (props) => {
  const styles = {
    backgroundColor: props.isSelected ? "#d6dbf5" : "transparent",
  };
  return (
    <>
      <div className="questions">
        <h3>{props.question}</h3>
        <div className="options">
          {props.answers.map((answer) => {
            const obj = { ...answer, id: nanoid() };
            return (
              <h6
                key={obj.id}
                className="correct"
                style={styles}
                onClick={() => props.handleSelect(obj.id)}
              >
                {answer}{" "}
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
