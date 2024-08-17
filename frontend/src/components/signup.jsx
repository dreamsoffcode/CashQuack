import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atom";
import { Navbar } from "./navbar";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const setUserAtom = useSetRecoilState(userAtom);

  async function submitSignup() {
    const signupPayload = {
      firstName,
      lastName,
      username: email,
      password,
    };
    try {
        const response = await axios.post(
          "https://cash-quack-backend.vercel.app/api/v1/user/signup",
          signupPayload,
        );
        if (response.status === 200) {
          setUserAtom({
            username: email,
            firstName,
            lastName,
            token: response.data.token,
          });
          navigate("/dashboard");
        } else {
          setErrorMessage(response.data.message);
        }
    } catch(e) {
      // console.log(e)
      // console.log("inside catch")
      setErrorMessage(e.response.data.message);
    }
  }

  return (
    
      
    <div className="bg-gray-100 flex flex-col h-screen">
      {/* {console.log("error", errorMessage)} */}
      <div className="flex-initial">
        <Navbar />
      </div>
      <div className="flex flex-col flex-auto justify-center items-center">
      <div className="bg-white rounded p-6">
        <div className="text-3xl flex justify-center font-bold mb-3">
          Sign Up
        </div>
        <div className="text-base flex justify-center px-10 mb-4">
          Enter your information to create an account
        </div>
        {errorMessage &&  (
          <div className="bg-red-500 rounded text-white flex justify-center my-5">
            {errorMessage}
            {console.log("reached here")}
          </div>
        )}
        <div className="font-semibold mt-1">First Name</div>
        <input
          type="text"
          placeholder="John"
          className="border rounded border-slate-300 p-2 text-sm w-full my-3"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <div className="font-semibold mt-1">Last Name</div>
        <input
          type="text"
          placeholder="Doe"
          className="border rounded border-slate-300 p-2 text-sm w-full my-3"
          onChange={(e) => setLastName(e.target.value)}
        ></input>
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
          onClick={submitSignup}
        >
          Sign Up
        </div>
        <div className="flex justify-center mt-1">
          <div>Already have an account? </div>
          <div
            onClick={() => navigate("/signin")}
            className="underline ml-1 cursor-pointer"
          >
            login
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
