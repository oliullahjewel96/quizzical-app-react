import React from "react";

const Quiz = (props) => {
  return (
    <>
      <div className="questions">
        <h3>{props.question}</h3>
        <div className="options">
          {props.answers.map((answer) => {
            return (
              <h6
                key={answer.id}
                className={`${
                  answer.isSelected ? "isSelected" : "transparent"
                }`}
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
