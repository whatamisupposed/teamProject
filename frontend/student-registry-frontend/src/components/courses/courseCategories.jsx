
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";

function CourseCategories({ onFilterChange }) {
    const [selectedPriceType, setSelectedPriceType] = useState("");

    const handleCheckboxChange = (e) => {
        console.log("Checkbox changed:", e.target.id);
        onFilterChange("subjectArea", e.target.id);
    };
    
    const handleRadioChange = (e) => {
        console.log("Radio button changed:", e.target.id); 
        setSelectedPriceType(e.target.id);
        onFilterChange("priceType", e.target.id);
    };
    

    return (
        <div className="flex flex-col">
            <div className="flex justify-between my-3">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button><IoSearchSharp size={30} /></button>
            </div>
            <div className="h-px bg-slate-300 mb-4"></div>
            <h1 className="text-xl font-bold">Subject Area</h1>
            <div className="flex flex-col ml-4">
                <div>
                    <input type="checkbox" id="Art & Design" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Art & Design">Art & Design</label>
                </div>
                <div>
                    <input type="checkbox" id="Theology" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Theology">Theology</label>
                </div>
                <div>
                    <input type="checkbox" id="Business" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Business">Business</label>
                </div>
                <div>
                    <input type="checkbox" id="Computer Science" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Computer Science">Computer Science</label>
                </div>
                <div>
                    <input type="checkbox" id="Data Science" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Data Science">Data Science</label>
                </div>
                <div>
                    <input type="checkbox" id="Education & Teaching" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Education & Teaching">Education & Teaching</label>
                </div>
                <div>
                    <input type="checkbox" id="Health & Medicine" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Health & Medicine">Health & Medicine</label>
                </div>
                <div>
                    <input type="checkbox" id="Humanities" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Humanities">Humanities</label>
                </div>
                <div>
                    <input type="checkbox" id="Mathematics" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Mathematics">Mathematics</label>
                </div>
                <div>
                    <input type="checkbox" id="Programming" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Programming">Programming</label>
                </div>
                <div>
                    <input type="checkbox" id="Science" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Science">Science</label>
                </div>
                <div>
                    <input type="checkbox" id="Social Sciences" onChange={handleCheckboxChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Social Sciences">Social Sciences</label>
                </div>
            </div>

            <h1 className="text-xl font-bold mt-4">Price</h1>
            <div className="flex flex-col ml-4">
                <div>
                    <input type="radio" id="Free" name="priceType" checked={selectedPriceType === "Free"} onChange={handleRadioChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Free">Free</label>
                </div>
                <div>
                    <input type="radio" id="Paid" name="priceType" checked={selectedPriceType === "Paid"} onChange={handleRadioChange} />
                    <label className="ml-2 font-medium text-base" htmlFor="Paid">Paid</label>
                </div>
            </div>
        </div>
    );
}

export default CourseCategories;