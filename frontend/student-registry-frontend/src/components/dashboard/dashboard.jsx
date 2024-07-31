import { IoMdMore } from "react-icons/io";
import CourseCard from "./courseCard";

function Dashboard() {

  return (
    <>
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4">
                <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button><IoMdMore size={30} /></button>
                </div>
                <div className="h-px bg-slate-300"></div>
                <div className="flex flex-wrap justify-center">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
            <div className="w-1/4">
                
            </div>
        </div>
    </>
  )
}

export default Dashboard
