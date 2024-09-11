import CreateExamForm from '../../components/Exam/CreateExamForm';

const CreateExam: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <div className='relative m-10 mx-auto max-w-xl rounded-lg border border-4 bg-white shadow'>
        <CreateExamForm />
      </div>
    </div>
  );
};

export default CreateExam;
