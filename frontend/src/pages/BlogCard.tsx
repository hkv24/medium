import { Link } from "react-router-dom"


interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string,
}
function BlogCard({ authorName, title, content, publishedDate, id }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="w-screen max-w-screen-md cursor-pointer">
        <div className="p-4 flex items-center">
          <Avatar name={authorName} />
          <div className="font-extralight ml-2">{authorName}</div>
          <div className="text-[3px] text-gray-400 ml-2">&#9679;</div>
          <div className="ml-2 font-thin text-slate-500">{publishedDate}</div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div>
          <p className="font-thin text-md">{content.slice(0, 120)} {(content.length > 120) ? "..." : ""}</p>
        </div>
        <div className="text-gray-600 mt-4">
          <p className="text-sm font-thin">{Math.ceil(content.length / 70)} min read</p>
        </div>

        <div className="flex justify-center my-3">
          <hr className="w-[80%]" />
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ name, size = 9 }: { name: string, size?: number }) {
    return (
        <div style={{ width: `${size * 3}px`, height: `${size * 3}px` }} className={`flex justify-center items-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`${size > 9 ? `text-s` : `text-xs`} text-gray-600 dark:text-gray-300`}>
                {name.split(' ').map(word => word[0].toUpperCase()).join('')}
            </span>
        </div>

    )
}

export default BlogCard