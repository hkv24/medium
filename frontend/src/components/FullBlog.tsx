import { Blog } from "../hooks"
import { Avatar } from "../pages/BlogCard"
import AppBar from "./AppBar"


function FullBlog({ blog }: { blog: Blog | undefined }) {

    if(!blog) {
        return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-gray-500">No blogs found.</div>
        </div>
        )
    }

  return (
    <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full px-10 pt-[10rem] max-w-screen-xl">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 8th October, 2024.
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <p className="text-slate-600 text-lg">Author</p>
                    <div className="flex gap-6">
                        <div className="flex items-center">
                            <Avatar size={11} name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{blog.author.name || "Anonymous"}</p>
                            <div className="text-slate-500 pt-2">
                                Random catch phrase about the author's ability to write code.
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default FullBlog