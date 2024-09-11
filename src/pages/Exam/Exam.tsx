import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Exam as ExamType } from "../../types/exam";
import axios from "axios";
import '../../index.css'
import "./Exam.css";
import { Question } from "../../types/question";

const Exam: React.FC = () => {
    const [exam, setExam] = useState<ExamType>();
    const [questions, setQuestions] = useState<Question[]>();
    const { examId } = useParams();
    
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
        try {
            const examRes = await axios.get(`${import.meta.env.VITE_API_URL}/exam/${examId}`)
            setExam(examRes.data);
            const questionsRes = await axios.get(`${import.meta.env.VITE_API_URL}/exam/${examId}/questions`)
            setQuestions(questionsRes.data);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getExam();
    },[]);
  
    return (
        <div className="min-h-screen examcontainer">
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
                {/* <h2>Your Score: {score}/{questions?.length}</h2> */}
                </div>
            )}
        </div>
      );
    };

export default Exam;