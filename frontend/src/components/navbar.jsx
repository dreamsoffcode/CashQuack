import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atom";

export function Navbar() {
  const { firstName, lastName} = useRecoilValue(userAtom);
  const Navigate = useNavigate()
  return (
    <div className="flex justify-between shadow-md items-center px-3 py-3">
      <div className="font-semibold text-xl cursor-pointer" onClick={()=>Navigate('/dashboard')}>CashQuack</div>


        {firstName && <div className="flex items-center cursor-pointer" onClick={()=>Navigate('/update')}>
          <div className="pr-2">Hello, {firstName}</div>
          <img
            className="rounded-full w-9"
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
          ></img>
      </div>}

      {!firstName && <div className="flex items-center">
          <div className="pr-7 font-semibold cursor-pointer" onClick={()=>Navigate('/signup')}>Signup</div>
          <div className="pr-2 font-semibold cursor-pointer" onClick={()=>Navigate('/signin')}>Login</div>
      </div>}

    </div>
  );
}