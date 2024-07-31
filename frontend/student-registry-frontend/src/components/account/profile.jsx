import { CgProfile } from "react-icons/cg";

function Profile() {
    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
            <h1 className="text-xl mt-3">Profile</h1>
            <p>This information will be displayed publicly on your account</p>
            </div>
            <div className="flex mt-4 gap-10">
            <div className="w-1/2 flex flex-col">
                <label className="text-lg font-medium">First name</label>
                <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"/>
            </div>
            <div className="w-1/2 flex flex-col">
                <label className="text-lg font-medium">Last name</label>
                <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"/>
            </div>
            </div>

            <div className="flex mt-5 w-72 justify-between items-center">
            <CgProfile size={45} />
            <button className="border-2 border-black rounded-md px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200">Change</button>
            <button className=" rounded-md px-4 py-2 font-bold bg-slate-100 hover:bg-slate-200">Remove</button>
            </div>
            <div className="w-full flex mt-4 justify-end gap-4">
                <button className="border-2 border-black rounded-md px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200">Cancel</button>
                <button className="border-2 border-blue-500 hover:border-blue-600 rounded-md px-4 py-2 font-bold bg-blue-500 hover:bg-blue-600">Save</button>
            </div>
        </div>

    )
}

export default Profile