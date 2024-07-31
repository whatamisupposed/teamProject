import { IoMdMore } from "react-icons/io";

function Help() {

  return (
    <>
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4">
                <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-bold">Help</h1>
                    <button><IoMdMore size={30} /></button>
                </div>
                <div className="h-px bg-slate-300"></div>
                <p className="mt-4 font-medium">Help is a crucial aspect of personal and professional growth, providing individuals with the support and guidance they need to overcome challenges and achieve their goals. Whether it comes in the form of advice from a mentor, assistance from a colleague, or emotional support from a friend or family member, help can make a significant difference in one's life. It fosters a sense of community, encourages collaboration, and enhances learning by allowing people to share knowledge and resources. Recognizing when to seek help and being willing to offer it to others are important skills that contribute to building strong, supportive relationships and thriving environments.</p>
            </div>
            <div className="w-1/4">
                
            </div>
        </div>
    </>
  )
}

export default Help
