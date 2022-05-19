import { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);
  console.log(questions);
  const newQuestion = questions.map((question) => {
    return (
      <>
        <div className="questions" key={question.id}>
          <h3>{question.question}</h3>
          <div className="options">
            <h6>{question.correct_answer}</h6>
            {question.incorrect_answers.map((option) => {
              return <h6>{option}</h6>;
            })}
          </div>
        </div>
        <hr />
      </>
    );
  });
  return (
    <div className="quiz-container">
      {newQuestion}

      {/* <div className="questions">
        {newQuestion}
        <div className="options">
          <h6 className="isSelected">Liverpool </h6>
          <h6>Manchester United </h6>
          <h6>Chelsea </h6>
          <h6>Arsenal </h6>
        </div>
      </div>
      <hr />
      <div className="questions">
        <h3>
          Which one is the most successful Football club and also the best club
          in England. can you guess?Which one is the most successful Football
          club and also the best club in England. can you guess?
        </h3>
        <div className="options">
          <h6 className="isSelected">Liverpool </h6>
          <h6>Manchester United </h6>
          <h6>Chelsea </h6>
          <h6>Arsenal </h6>
        </div>
      </div>
      <hr />
      <div className="questions">
        <h3>Which one is the most successful Football club in England?</h3>
        <div className="options">
          <h6>Liverpool </h6>
          <h6>Manchester United </h6>
          <h6>Chelsea </h6>
          <h6>Arsenal </h6>
        </div>
      </div>
      <hr />
      <div className="questions">
        <h3>Which one is the most successful Football club in England?</h3>
        <div className="options">
          <h6>Liverpool </h6>
          <h6 className="wrong">Manchester United </h6>
          <h6>Chelsea </h6>
          <h6>Arsenal </h6>
        </div>
      </div>
      <hr />
      <div className="questions">
        <h3>Which one is the most successful Football club in England?</h3>
        <div className="options">
          <h6 className="correct">Liverpool </h6>
          <h6>Manchester United </h6>
          <h6>Chelsea </h6>
          <h6>Arsenal </h6>
        </div>
      </div> */}
      {/* <hr style={{ marginBottom: "10px" }} /> */}
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
        className="btn"
      >
        Check answers
      </button>
    </div>
  );
};

export default Quiz;
