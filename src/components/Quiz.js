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
                  !props.displayResult && answer.isSelected
                    ? "isSelected"
                    : props.displayResult &&
                      answer.isSelected &&
                      props.checkAnswers
                    ? "correct"
                    : props.displayResult &&
                      answer.isSelected &&
                      !props.checkAnswers
                    ? "wrong"
                    : "transparent"
                }`}
                // style={{
                //   backgroundColor:
                //     answer.isSelected &&
                //     props.checkAnswers &&
                //     props.displayResult
                //       ? "#94d7a2"
                //       : answer.isSelected &&
                //         !props.checkAnswers &&
                //         props.displayResult
                //       ? "#ffc0cb"
                //       : "transparent",
                // }}
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
