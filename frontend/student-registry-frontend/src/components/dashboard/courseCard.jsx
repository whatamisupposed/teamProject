import { IoMdMore } from "react-icons/io";


function CourseCard() {

  return (
    <>
        <div className="flex flex-col w-64 h-64 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl">
            <div className="flex justify-between p-3 h-32 mb-2 bg-red-600 rounded-t-lg">
                <div></div>
                <IoMdMore size={30} />
            </div>
            <h1 className="px-3">Mathmatics</h1>
            <h1 className="px-3">Course start - Course End</h1>
            <h1 className="px-3">Grade: A</h1>
        </div>
    </>
  )
}

export default CourseCard
