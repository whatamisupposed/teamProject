import { IoMdMore } from "react-icons/io";


function CourseRegister() {

  return (
    <>
        <div className="flex flex-col w-64 h-64 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl">
            <div className="flex justify-between p-3 h-32 mb-2 bg-red-600 rounded-t-lg">
                <div></div>
                <IoMdMore size={30} />
            </div>
            <div className="flex justify-between">
                <h1 className="mx-3">Mathmatics</h1>
                <h1 className="mx-3">Price</h1>
            </div>
            
            <h1 className="px-3">Course start - Course End</h1>
            
            <button className="font-bold m-4 p-2 border-2 border-gray-200 rounded-lg hover:bg-slate-100">Enroll Now</button>
        </div>
    </>
  )
}

export default CourseRegister
