import { SignupInput } from "@hkv24/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BACKEND_URL } from "../config"

function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
        const jwt = response.data;
        localStorage.setItem("token", JSON.stringify(jwt));
        navigate('/blogs')
    } catch(e) {
        console.log(e)
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
            <div className="px-10">
                <div className="text-4xl font-extrabold ">
                    Create an account
                </div>
                <div className="text-gray-500">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link className="underline pl-2" to={type === "signup" ? "/signin" : "/signup"}>
                        {type === "signin" ? "Sign Up" : "Sign In"}
                    </Link>
                </div>
            </div>

            <div className="pt-8">
                {type === "signup"
                ? <LabelledInput label="Name" placeholder="Your Name" onChange={(e) => {
                    setPostInputs(c => ({...c, name: e.target.value}))
                }} /> 
                : null}
                <LabelledInput label="Email" placeholder="Enter Your Email Id" onChange={(e) => {
                    setPostInputs(c => ({...c, email: e.target.value}))
                }} />

                <LabelledInput label="Password" type={'password'} placeholder="Your Password" onChange={(e) => {
                    setPostInputs(c => ({...c, password: e.target.value}))
                }} />
                <button onClick={sendRequest} type="button" className="w-full mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
      </div>
    </div>
  )
}


interface LabelledInputType{
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
}
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-md font-semibold text-black pt-4">{label}</label>
            <input onChange={onChange} type={ type || 'text' } id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}

export default Auth