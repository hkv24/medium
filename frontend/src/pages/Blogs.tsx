import AppBar from "../components/AppBar"
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import BlogCard from "./BlogCard"


function Blogs() {
  const { loading, blogs } = useBlogs();

  // Todo -> Try to add skeletons as in medium.com
  // # Done ✓
  if(loading) {
    return (
      <div>
        <AppBar />
        <div className="flex gap-10 flex-col mt-8 items-center justify-center">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
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
        <div>
          {blogs.map((blog, idx) =>
            <BlogCard
              key={idx}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title} 
              content={blog.content}
              publishedDate={"1st Oct, 2024"}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Blogs