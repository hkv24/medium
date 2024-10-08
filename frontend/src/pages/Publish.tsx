import axios from "axios"
import AppBar from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";


function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createBlog = async () => {
    const token = JSON.parse(localStorage.getItem("token") as string).jwt;

    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content: description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    navigate(`/blog/${response.data.id}`)
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center mt-[5rem]">
        <div className="max-w-screen-xl w-full">
          <input onChange={(e) => setTitle(e.target.value)} type="text" className="w-full focus:outline-none block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Title" />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          <button onClick={createBlog} type="submit" className="inline-flex px-2 items-center py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:outline-none hover:bg-blue-800">
            Publish post
          </button>
        </div>        
      </div>
    </div>
  )
}



function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <form className="mt-4">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between py-2 border">
              <textarea onChange={onChange} rows={10} className="block focus:outline-none w-full px-2 text-sm text-gray-800 bg-white" placeholder="Write an article..." required />
          </div>
      </div>
    </form>
  )
}

export default Publish