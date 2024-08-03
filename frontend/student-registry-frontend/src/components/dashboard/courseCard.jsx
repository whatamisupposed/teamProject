import { IoMdMore } from "react-icons/io";

function CourseCard({ name, startDate, endDate, grade, color }) {
  return (
    <div
      className="flex flex-col w-64 h-64 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between p-3 h-32 mb-2 bg-red-600 rounded-t-lg" style={{ backgroundColor: color }}>
        <div></div>
        <IoMdMore size={30} />
      </div>
      <h1 className="px-3">{name}</h1>
      <h1 className="px-3">Course start: {new Date(startDate).toLocaleDateString()} - Course End: {new Date(endDate).toLocaleDateString()}</h1>
      <h1 className="px-3">Grade: {grade}</h1>
    </div>
  );
}

export default CourseCard;
