import CreateExamForm from "../../components/Exam/CreateExamForm";

interface CreateExamProps {
    moduleId: number;
  }

const CreateExam: React.FC<CreateExamProps> = ({ moduleId }) => {
    return (
        <div className="bg-white border border-4 rounded-lg shadow relative m-10 max-w-xl mx-auto">
            <CreateExamForm moduleId={moduleId} />
        </div>
    );
}

export default CreateExam;