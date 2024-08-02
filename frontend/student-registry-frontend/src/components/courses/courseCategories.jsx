import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";

function CourseCategories({ onFilterChange }) {
    const [selectedSubjectAreas, setSelectedSubjectAreas] = useState(new Set());
    const [selectedPriceType, setSelectedPriceType] = useState("");

    const handleCheckboxChange = (e) => {
        const value = e.target.id;
        const newSelectedSubjectAreas = new Set(selectedSubjectAreas);
        if (e.target.checked) {
            newSelectedSubjectAreas.add(value);
        } else {
            newSelectedSubjectAreas.delete(value);
        }
        setSelectedSubjectAreas(newSelectedSubjectAreas);
        onFilterChange({
            subjectAreas: Array.from(newSelectedSubjectAreas),
            priceType: selectedPriceType
        });
    };

    const handleRadioChange = (e) => {
        const value = e.target.id;
        setSelectedPriceType(value);
        onFilterChange({
            subjectAreas: Array.from(selectedSubjectAreas),
            priceType: value
        });
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
                {/* List of checkboxes */}
                {["Art & Design", "Theology", "Business", "Computer Science", "Data Science", "Education & Teaching", "Health & Medicine", "Humanities", "Mathematics", "Programming", "Science", "Social Sciences"].map(subject => (
                    <div key={subject}>
                        <input
                            type="checkbox"
                            id={subject}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2 font-medium text-base" htmlFor={subject}>{subject}</label>
                    </div>
                ))}
            </div>
            <h1 className="text-xl font-bold mt-4">Price</h1>
            <div className="flex flex-col ml-4">
                {/* List of radio buttons */}
                {["Free", "Paid"].map(priceType => (
                    <div key={priceType}>
                        <input
                            type="radio"
                            id={priceType}
                            name="priceType"
                            checked={selectedPriceType === priceType}
                            onChange={handleRadioChange}
                        />
                        <label className="ml-2 font-medium text-base" htmlFor={priceType}>{priceType}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseCategories;
