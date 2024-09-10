import axios from 'axios';
import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface CreateExamFormProps {
  moduleId: number;
}

const CreateExamForm: React.FC<CreateExamFormProps> = ({ moduleId }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], answer: '' },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[answerIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex: number, option: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = option;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: add fields to send other information
    const data = {
        id : 0,
        title: title,
        questions: questions,
        description: "",
        instructions: "",
        duration: 600,
        type: "",
    }
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/exam/module/${moduleId}`, data);
        console.log("Exam created successfully");
    } catch(e: any) {
        console.log(e);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between rounded-t border-b p-5">
        <h3 className="text-xl font-semibold text-gray-900">Create Exam</h3>
      </div>
      <form className="grid grid-col-2 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">Exam Title</label>
          <input
            type="text"
            placeholder="Enter exam title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm"
          />
        </div>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="space-y-4 col-span-2">
            <div className="">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Question {questionIndex + 1}
              </label>
              <input
                type="text"
                placeholder="Enter question..."
                required
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm"
              />
            </div>

            {question.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <input
                  type="text"
                  required
                  placeholder={`Answer ${idx + 1}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(questionIndex, idx, e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm"
                />
                <input
                  type="radio"
                  required
                  name={`correctAnswer-${questionIndex}`}
                  onChange={() => handleCorrectAnswerChange(questionIndex, option)}
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="mt-3 col-span-1 rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="mt-5 col-span-2 rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200"
        >
          Submit Exam
        </button>
      </form>
    </div>
  );
};

export default CreateExamForm;
