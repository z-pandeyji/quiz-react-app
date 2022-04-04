import React from 'react'

export default function Welcome(props) {
  return (
    <div className="welcome-container">
      <h1 className="welcome--title">Quiz-App with React</h1>
      <p className="welcome--subtitle">Test your knowledge</p>
      <button className="welcome--start-btn" onClick={props.togglePlaying}>
        Start Quiz
      </button>
    </div>
  );
}