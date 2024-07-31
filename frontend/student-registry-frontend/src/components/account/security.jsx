

function Security() {
    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
            <h1 className="text-xl mt-3">Security</h1>
            <p>Keep your Account Secure</p>
            </div>
            <div className="flex mt-4 gap-10">
            <div className="w-1/2 flex flex-col">
                <label className="text-lg font-medium" for="Email">Email</label>
                <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"/>
            </div>
            <div className="w-1/2 flex flex-col">
                <label className="text-lg font-medium" for="Password">Password</label>
                <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"/>
            </div>
            </div>

            <div className="w-full flex mt-4 justify-end gap-4">
                <button className="border-2 border-black rounded-md px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200">Cancel</button>
                <button className="border-2 border-blue-500 hover:border-blue-600 rounded-md px-4 py-2 font-bold bg-blue-500 hover:bg-blue-600">Save</button>
            </div>
            
        </div>

    )
}

export default Security