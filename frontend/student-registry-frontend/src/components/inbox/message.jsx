import { IoMdMore } from "react-icons/io";

function Message() {

  return (
    <>
    <div className="border-2 border-slate-100 rounded-lg my-2">

    
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/100" alt="user" className="rounded-lg"></img>
                        <h1 className="text-lg font-bold">John Doe</h1>
                    </div>
                    <div className="flex items-center gap-3 mr-5">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Accept</button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Reject</button>
                    </div>
                </div>
        </div>
    </>
  )
}

export default Message
