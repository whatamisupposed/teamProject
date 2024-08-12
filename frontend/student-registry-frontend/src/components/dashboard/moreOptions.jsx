import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import axios from 'axios';

function MoreOptions({ courseId }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLeaveCourse = async () => {
    console.log("Leave Course clicked for courseId:", courseId);

    try {
      const token = localStorage.getItem('x-auth-token');
      const response = await axios.post('http://localhost:3000/api/user/leave', { courseId }, {
        headers: {
          'x-auth-token': token
        }
      });

      console.log(response.data.msg); // Should log "Course removed successfully"
    } catch (error) {
      console.error('Failed to remove course:', error.response.data);
    }
  };

  return (
    <div className="relative">
      <IoMdMore 
        size={30} 
        className="text-white cursor-pointer" 
        onClick={toggleDropdown} 
      />
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
          <button
            onClick={handleLeaveCourse}
            className="w-full px-4 py-2 text-left text-black hover:bg-gray-100"
          >
            Leave Course
          </button>
        </div>
      )}
    </div>
  );
}

export default MoreOptions;
