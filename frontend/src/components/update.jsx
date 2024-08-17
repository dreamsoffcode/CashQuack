import { useState } from "react";
import { Navbar } from "./navbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../store/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Update() {
  const {firstName} = useRecoilValue(userAtom);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {firstName && <UpdateMain />}
      {!firstName && (
        <div className="p-3">
          Please login or signup to continue quacking cash
        </div>
      )}
    </div>
  );
}

function UpdateMain() {
  const [user, setUser] = useRecoilState(userAtom);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  let payload = {};
  if (newPassword) payload.password = newPassword;
  if (firstName != user.firstName) payload.firstName = firstName;
  if (lastName != user.lastName) payload.lastName = lastName;

  async function updateData() {
    try {
      const response = await axios.put(
        "https://507ddff1-ad1c-4e87-960e-cc49d0f250ae-00-35vdytk1f75t7.pike.replit.dev/api/v1/user",
        payload,
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        },
      );
      window.alert("Details Updated Successfully");
      setUser({
        token: user.token,
        firstName,
        lastName,
        userId: user.userId,
        username: user.username,
      });
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }

  return (
    <div className="grow flex flex-col justify-center items-center">
      {errorMessage && (
        <div className="bg-red-500 rounded text-white flex justify-center my-5 p-1">
          Error : {errorMessage}
        </div>
      )}
      <div className="grid grid-cols-2 grid-flow-row gap-1 w-1/2 m-10 items-center">
        <div className="font-semibold">New Password</div>
        <input
          type="password"
          className="border rounded border-slate-300 p-1 text-sm my-3 ml-2"
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        <div className="font-semibold">First Name</div>
        <input
          type="text"
          className="border rounded border-slate-300 p-1 text-sm my-3 ml-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <div className="font-semibold">Last Name</div>
        <input
          type="text"
          className="border rounded border-slate-300 p-1 text-sm my-3 ml-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>
      <div
        className="font-semibold flex justify-center text-white bg-black rounded py-2 my-3 cursor-pointer px-10"
        onClick={updateData}
      >
        Update
      </div>
    </div>
  );
}
