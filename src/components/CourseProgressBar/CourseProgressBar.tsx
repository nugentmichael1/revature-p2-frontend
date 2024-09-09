import { Progress } from '../../types/progress';

interface CourseProgressBarProps {
  progress?: Progress;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  // Code to include in the dashboard
  // need to get progress on load w/ useEffect
  // usage: send as prop progress={{ completedProgress: studentProgress[courseId] }}
  // const [studentProgress, setStudentProgress] = useState<{ [key: number]: number }>({});
  // const { state: { user } } = useAppContext();
  // const getStudentProgress = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/progress/user/${user?.id}`);
  //     const progressMap = res.data ? res.data.reduce((acc: { [key: number]: number }, item: any) => {
  //       acc[item.course.id] = item.completedProgress;
  //       return acc;
  //     }, {}) : {};
  //     setStudentProgress(progressMap);
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // }
  // useEffect(() => {
  //   if (user?.id) {
  //     getStudentProgress();
  //   }
  // }, [user]);
  
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-5 relative">
      <div
        className="bg-green-600 h-5 rounded-full"
        style={{ width: `${progress ? progress.completedProgress : 0}%` }}
      ></div>
      <p className="text-black absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
        {`${progress ? progress.completedProgress : 0}%`}
      </p>
    </div>
  );
};

export default CourseProgressBar;