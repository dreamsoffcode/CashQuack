import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atom";
import { Navbar } from "./navbar";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const setUserAtom = useSetRecoilState(userAtom)
  // const user = useRecoilValue(userAtom)

  // console.log("user is ", user)

  async function submitSignin() {
    const signinPayload = {
      username: email,
      password,
    };
    try{
      const response = await axios.post(
        "https://cash-quack-backend.vercel.app/api/v1/user/signin",
        signinPayload
      );
      // console.log(response)
      if (response.status === 200) {
        const {firstName, lastName, token} = response.data
        setUserAtom({
          username: email,
          firstName,
          lastName,
          token
        });
        navigate("/dashboard");
      } else {
        setErrorMessage(response.data.message);
      }
    }catch(e){
      console.log("errpr", e)
      setErrorMessage(e.response.data.message)
    }
    
    
  }

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <div className="flex-initial">
        <Navbar />
      </div>
      <div className="flex flex-col flex-auto justify-center items-center">
        <div className="bg-white rounded p-6">
          <div className="text-3xl flex justify-center font-bold mb-3">
            Sign In
          </div>
          <div className="text-base flex justify-center mb-4">
            Enter your credentials to access your acount
          </div>
          {errorMessage === "" ? null : (
            <div className="bg-red-500 rounded text-white flex justify-center my-5">
              {errorMessage}
            </div>
          )}
          <div className="font-semibold mt-1">Email</div>
          <input
            type="text"
            placeholder="johndoe@example.com"
            className="border rounded border-slate-300 p-2 text-sm w-full my-3"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="font-semibold mt-1">Password</div>
          <input
            type="password"
            className="border rounded border-slate-300 p-2 text-sm w-full my-3"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            className="font-semibold flex justify-center text-white bg-black rounded py-2 my-3 cursor-pointer"
            onClick={submitSignin}
          >
            Sign In
          </div>
          <div className="flex justify-center mt-1">
            <div>Don't have an account? </div>
            <div
              onClick={() => navigate("/signup")}
              className="underline ml-1 cursor-pointer"
            >
              Signup
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
