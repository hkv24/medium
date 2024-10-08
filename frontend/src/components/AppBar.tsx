import { Link } from "react-router-dom"
import { Avatar } from "../pages/BlogCard"


function AppBar() {
  return (
    <div className=" border-b flex justify-between items-center px-10 py-1">
      <Link to={'/blogs'} className="cursor-pointer text-4xl text-gray-900 font-serif">
        Medium
      </Link>
      <div className="flex items-center gap-4">
        <Link to={'/publish'}>
          <button type="button" className=" m-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
        </Link>
        <Avatar size={12} name="harsh" />
      </div>
    </div>
  )
}

export default AppBar