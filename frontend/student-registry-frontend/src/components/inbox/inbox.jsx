import { IoMdMore } from "react-icons/io";
import Message from "./message";

function Inbox() {

  return (
    <>
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4 flex flex-col">
                <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-bold">Inbox</h1>
                    <button><IoMdMore size={30} /></button>
                </div>
                <div className="h-px bg-slate-300"></div>
                <div className="w-full">
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    
                </div>
            </div>
            <div className="w-1/4">
                
            </div>
        </div>
    </>
  )
}

export default Inbox
