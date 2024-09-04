import { Link } from "react-router-dom";
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
// import axios from "axios";
import '../../index.css'
import "./Exam.css";

function Exam() {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter",
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            answer: "H2O",
        },
        ];
    
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const {state: { user },setUser,} = useAppContext();

    const handleOptionChange = (questionIndex, option) => {
      setUserAnswers({ ...userAnswers, [questionIndex]: option });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let newScore = 0;
      questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
          newScore++;
        }
      });
      setScore(newScore);
    };
  
    return (
        <div className="examcontainer">
            <h1 className="examtitle">Exam Name Here</h1>
            <form className="questions" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                <div key={index} className="question">
                    <p>{question.question}</p>
                    {question.options.map((option) => (
                    <div key={option}>
                        <label>
                        <input
                            className="radio"
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={() => handleOptionChange(index, option)}
                        />
                        {option}
                        </label>
                    </div>
                    ))}
                </div>
                ))}
                <button className="submitbutton bg-primary-500" type="submit">Submit</button>
            </form>

            {score !== null && (
                <div>
                <h2>Your Score: {score}/{questions.length}</h2>
                </div>
            )}
        </div>
      );
    };

export default Exam;