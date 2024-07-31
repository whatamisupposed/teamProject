import { CiCircleQuestion, CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSchool } from "react-icons/io";
import { GoInbox } from "react-icons/go";
import { TbBook2 } from "react-icons/tb";

function Sidebar({ setActiveComponent }) {
    return (
      <div className="fixed flex flex-col justify-between h-screen bg-blue-600 w-24 items-center">
        <div className="flex flex-col justify-center w-24">
            <div className="flex justify-center">
                <IoIosSchool size={75} />
            </div>
            
            <div className="flex flex-col py-4 items-center w-full hover:bg-blue-700 active:bg-white" onClick={() => setActiveComponent('Account')}>
                <CgProfile size={45} />
                <p>Account</p>
            </div>
            <div className="flex flex-col py-4 items-center w-full hover:bg-blue-700" onClick={() => setActiveComponent('Dashboard')}>
                <MdOutlineDashboard size={45} />
                <p>Dashboard</p>
            </div>
            <div className="flex flex-col py-4 items-center w-full hover:bg-blue-700" onClick={() => setActiveComponent('Courses')}>
                <TbBook2  size={45} />
                <p>Courses</p>
            </div>
            <div className="flex flex-col py-4 items-center w-full hover:bg-blue-700" onClick={() => setActiveComponent('Inbox')}>
                <GoInbox size={45} />
                <p>Inbox</p>
            </div>
            <div className="flex flex-col py-4 items-center w-full hover:bg-blue-700" onClick={() => setActiveComponent('Help')}>
                <CiCircleQuestion size={45} />
                <p>Help</p>
            </div>
        </div>
        <div className="flex w-full justify-center hover:bg-blue-700">
            <CiLogout size={40} />
        </div>
      </div>
    )
  }
  
  export default Sidebar;
  