


function BlogSkeleton() {
  return (
    <div role="status" className="animate-bounce w-screen max-w-screen-md gap-4">
      <div className="p-4 flex items-center">
        <div className="h-[1rem] bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
      <div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
      <div className="text-gray-600 mt-4">
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
      </div>
      <div className="flex justify-center my-3">
        <hr className="w-[80%]" />
      </div>
    </div>
  )
}

export default BlogSkeleton
