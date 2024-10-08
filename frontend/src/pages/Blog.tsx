import AppBar from "../components/AppBar";
// import BlogSkeleton from "../components/BlogSkeleton";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: id || ""
  })

  if (loading) {
    return (
      <div>
        <AppBar />
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <FullBlog blog={blog}  />
    </div>
  )
}

export default Blog