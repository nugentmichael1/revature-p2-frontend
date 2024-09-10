import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Exam as ExamType } from "../../types/exam";
import axios from "axios";
import '../../index.css'
import "./Exam.css";

function Exam() {
    const [exam, setExam] = useState<ExamType>();
    const questions = exam?.questions;
    
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState(0);

    const handleOptionChange = (questionIndex: any, option: any) => {
      setUserAnswers({ ...userAnswers, [questionIndex]: option });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      let newScore = 0;
      questions?.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
          newScore++;
        }
      });
      setScore(newScore);
    };

    const getExam = async () => {
        let { examId } = useParams();
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/exam/${examId}`)
            setExam(res.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getExam();
    },[]);
  
    return (
        <div className="examcontainer">
            <h1 className="examtitle">{exam?.title}</h1>
            <form className="questions" onSubmit={handleSubmit}>
                {questions?.map((question, index) => (
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
                <h2>Your Score: {score}/{questions?.length}</h2>
                </div>
            )}
        </div>
      );
    };

export default Exam;