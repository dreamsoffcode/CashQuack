import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atom";
import { Navbar } from "./navbar";
import {useNavigate } from "react-router-dom";

export function Landing(){
  // const {firstName} = useRecoilValue(userAtom);
  const Navigate = useNavigate()
  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar /> */}
      <div className="grow flex items-center justify-center bg-black">
        <img src="../../CashQuack.png" className="w-1/2 cursor-pointer border rounded-md p-5" onClick={()=>Navigate('/signup')}></img>
      </div>
      
    </div>
  );
}