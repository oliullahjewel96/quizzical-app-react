import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
function App() {
  const [showScreen, setShowScreen] = useState(false);
  const [QuizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              answers: [...question.incorrect_answers, question.correct_answer],
              isSelected: false,
            };
          })
        )
      );
  }, []);

  function handleSelect(id, isSelected) {
    setQuizData((prevQuestions) =>
      prevQuestions.map((question) => {
        console.log(question);
        return question.id === id
          ? { ...question, isSelected: !isSelected }
          : question;
      })
    );
  }

  const newQuizData = QuizData.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.question}
        answers={question.answers}
        isSelected={question.isSelected}
        handleSelect={handleSelect}
      />
    );
  });

  function openSeparateScreen() {
    setShowScreen((prevShowScreen) => !prevShowScreen);
  }
  return (
    <div className="App">
      {showScreen ? (
        <div className="quiz-container">
          {newQuizData}

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
      ) : (
        <div className="container">
          <h1 className="heading">Quizzical</h1>
          <p className="text">To start a quiz please click on the button</p>
          <button className="btn" onClick={openSeparateScreen}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
