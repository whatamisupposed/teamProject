import { IoSearchSharp } from "react-icons/io5";

function CourseCategories() {
    return(
        
        <div className="flex flex-col">
            <div className="flex justify-between my-3">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button><IoSearchSharp size={30} /></button>
            </div>
            <div className="h-px bg-slate-300 mb-4"></div>
            <h1 className="text-xl font-bold">Subject Area</h1>
            <div className="flex flex-col ml-4">
                <div>
                    <input type="checkbox" 
                    id="art" />
                    <label className="ml-2 font-medium text-base" for="art">Art & Design</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="theology" />
                    <label className="ml-2 font-medium text-base" for="theology">Theology</label>
                </div>
                <div>
                   <input type="checkbox" 
                    id="business" />
                    <label className="ml-2 font-medium text-base" for="business">Business</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="computer-science" />
                    <label className="ml-2 font-medium text-base" for="computer-science">Computer Science</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="data-science" />
                    <label className="ml-2 font-medium text-base" for="data-science">Data Science</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="education-teaching" />
                    <label className="ml-2 font-medium text-base" for="education-teaching">Education & Teaching</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="health-medicine" />
                    <label className="ml-2 font-medium text-base" for="health-medicine">Health & Medicine</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="humanities" />
                    <label className="ml-2 font-medium text-base" for="humanities">Humanities</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="mathematics" />
                    <label className="ml-2 font-medium text-base" for="mathematics">Mathematics</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="programming" />
                    <label className="ml-2 font-medium text-base" for="programming">Programming</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="science" />
                    <label className="ml-2 font-medium text-base" for="science">Science</label>
                </div>
                <div>
                    <input type="checkbox" 
                    id="social-sciences" />
                    <label className="ml-2 font-medium text-base" for="social-sciences">Social Sciences</label>
                </div>
            </div>
                    



            <h1 className="text-xl font-bold mt-4">Price</h1>
            <div className="flex flex-col ml-4">
            <div>
                    <input type="radio" 
                    id="Free" name="priceType" />
                    <label className="ml-2 font-medium text-base" for="Free">Free</label>
                </div>
                <div>
                    <input type="radio" 
                    id="Free" name="priceType" />
                    <label className="ml-2 font-medium text-base" for="Free">Paid</label>
                </div>
            </div>
        </div>
        
    )
}

export default CourseCategories