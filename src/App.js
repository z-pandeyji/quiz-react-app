import React from 'react'
import Welcome from './Welcome'
import Quiz from './Quiz'
import './App.css';

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
 return array;
}

export default function App() {
  const [quiz, setQuiz] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  function getQuiz() {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((res) => res.json())
      .then((data) => {
        const quiz = data.results.map((item) => ({
          question: item.question,
          answers: shuffle([item.correct_answer, ...item.incorrect_answers]),
          correctAnswer: item.correct_answer,
          guessAnswer: '',
        }));
        setQuiz(quiz);
      });
  }

  React.useEffect(() => {
    getQuiz();
  }, []);

  function togglePlaying() {
    setIsPlaying((isPlaying) => !isPlaying);
  }

  function selectAnswer(question, guessAnswer) {
    setQuiz((quiz) => {
      return quiz.map((quiz) =>
        quiz.question === question
          ? { ...quiz, guessAnswer: guessAnswer }
          : quiz
      );
    });
  }

  function checkAnswers() {
    setIsFinished(true);

    let correctAnswers = 0;

    for (const item of quiz) {
      if (item.guessAnswer === item.correctAnswer) {
        correctAnswers += 1;
      }
    }

    setMessage(`You scored ${correctAnswers}/${quiz.length} correct answers`);
  }

  function playAgain() {
    setIsPlaying(false);
    setIsFinished(false);
    getQuiz();
  }

  return (
    <>
      <h4 className="connect">
        <a
          href="https://www.linkedin.com/in/shivanshu-pandey-ji/"
          target="_blank"
        >
          LinkedIn
        </a>
      </h4>
      <main>
        {!isPlaying ? (
          <Welcome togglePlaying={togglePlaying} />
        ) : (
          <Quiz
            quiz={quiz}
            isFinished={isFinished}
            message={message}
            selectAnswer={selectAnswer}
            checkAnswers={checkAnswers}
            playAgain={playAgain}
          />
        )}
      </main>
    </>
  );
}