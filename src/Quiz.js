import React from 'react'

export default function Quiz(props) {
  return (
    <section>
      <ul className="quiz--questions">
        {props.quiz.map((item) => {
          return (
            <li key={item.question} className="quiz--item">
              <h3>{item.question}</h3>
              <div>
                {item.answers.map((answer) => {
                  let styles = {
                    backgroundColor: 'transparent',
                    border: '1px solid #4D5B9E',
                  };

                  if (answer === item.guessAnswer) {
                    if (props.isFinished) {
                      if (answer === item.correctAnswer) {
                        styles = {
                          backgroundColor: '#94D7A2',
                          border: 'none',
                        };
                      } else {
                        styles = {
                          backgroundColor: '#F8BCBC',
                          border: 'none',
                          opacity: 0.5,
                        };
                      }
                    } else {
                      styles = {
                        backgroundColor: '#D6DBF5',
                        border: 'none',
                      };
                    }
                  } else {
                    if (props.isFinished) {
                      if (answer === item.correctAnswer) {
                        styles = {
                          backgroundColor: '#94D7A2',
                          border: 'none',
                        };
                      } else {
                        styles = {
                          backgroundColor: 'transparent',
                          border: '1px solid #4D5B9E',
                          opacity: 0.5,
                        };
                      }
                    }
                  }

                  return (
                    <button
                      key={answer}
                      style={styles}
                      onClick={() => props.selectAnswer(item.question, answer)}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <footer className="quiz--footer">
        {props.isFinished ? (
          <>
            <p>{props.message}</p>
            <button className="quiz--check" onClick={props.playAgain}>
              Play again
            </button>
          </>
        ) : (
          <button className="quiz--check" onClick={props.checkAnswers}>
            Check answers
          </button>
        )}
      </footer>
    </section>
  );
}