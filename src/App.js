import { useState } from "react";
import Quiz from "./components/Quiz";
function App() {
  const [showScreen, setShowScreen] = useState(false);

  function openSeparateScreen() {
    setShowScreen((prevShowScreen) => !prevShowScreen);
  }
  return (
    <div className="App">
      {showScreen ? (
        <Quiz />
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
