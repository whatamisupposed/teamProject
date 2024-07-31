

function Fees() {
    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
            <h1 className="text-xl mt-3">Fees</h1>
            <p>Keep in mind your unpaid fees and credit hours</p>
            </div>
            <div className="flex mt-4 gap-10">
            <div className="w-1/2 flex flex-col">
                <p className="text-lg font-medium">Unpaid Fees</p>
                <p className="text-md font-medium">$guh</p>
            </div>
            <div className="w-1/2 flex flex-col">
            <p className="text-lg font-medium">Credit Hours</p>
            <p className="text-md font-medium">Time</p>
            </div>
            </div>

            <div className="w-full flex mt-4 justify-end gap-4">
                <button className="border-2 border-blue-500 hover:border-blue-600 rounded-md px-4 py-2 font-bold bg-blue-500 hover:bg-blue-600">Pay Fees</button>
            </div>
            
        </div>

    )
}

export default Fees