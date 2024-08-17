import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { recepientAtom, userAtom } from "../store/atom";

import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

export function Dashboard() {
  const { firstName, lastName, token, userName } = useRecoilValue(userAtom);
  console.log(firstName, lastName, token, userName);
  return (
    <div>
      <Navbar />
      {firstName && <div>
        <Body>
          <Balance token={token} />
          <Friends token={token} userName={userName} />
        </Body>
        <SendMoneyModal token={token} />
      </div>}

      {!firstName && <div className="p-3">
      Please login or signup to continue quacking cash
      </div>
      }
      
    </div>
  );
}



function Body({ children }) {
  return <div className="m-4 text-xl">{children}</div>;
}

function Balance({ token }) {
  // console.log(token)
  const [balance, setBalance] = useState(0);
  const recepient = useRecoilValue(recepientAtom);
  useEffect(() => {
    console.log("use effect triggered");
    (async () => {
      // console.log("use effect triggered async")
      const response = await axios.get(
        "https://507ddff1-ad1c-4e87-960e-cc49d0f250ae-00-35vdytk1f75t7.pike.replit.dev/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      // console.log("response is ", response)

      if (response.status === 200) {
        setBalance(parseFloat(response.data.balance));
      }
    })();
  }, [recepient]);

  return (
    <div className="flex justify-between font-semibold items-center w-full px-10 bg-gray-200 rounded py-2">
      <div>Your Balance</div>
      <div className="font-bold ml-2 text-4xl">${balance}</div>
    </div>
  );
}

function Friends({ token, userName }) {
  const [friends, setFriends] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://507ddff1-ad1c-4e87-960e-cc49d0f250ae-00-35vdytk1f75t7.pike.replit.dev/api/v1/user/bulk",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (response.status === 200) {
        setFriends(response.data.users);
      }
    })();
  }, []);
  return (
    <div>
      <div className="bg-gray-200 mt-10 px-10 py-2 flex justify-between items-center rounded">
        <div className="font-2xl font-semibold py-2">Friends</div>
        <input
          type="text"
          className="border border-slate-400 rounded p-1 w-4/6"
          placeholder="John Doe"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>

      <div>
        {/* {console.log(friends)} */}
        {friends.map((friend) => {
          let name = friend.firstName.toLowerCase();
          // if(friend.userName === userName) return null;
          return name.includes(filter.toLowerCase()) ? (
            <Friend key={friend._id} friend={friend}></Friend>
          ) : null;
        })}
      </div>
    </div>
  );
}

function Friend({ friend }) {
  const setRecepient = useSetRecoilState(recepientAtom);

  return (
    <div className="flex justify-between items-center m-6 bg-gray-100 p-3 rounded">
      <div className="flex items-center">
        <img
          className="rounded-full w-9"
          src={`https://ui-avatars.com/api/?name=${friend.firstName}+${friend.lastName}`}
        ></img>
        <div className="ml-2">{friend.firstName}</div>
        <div></div>
      </div>
      <button
        className="bg-black text-white rounded p-1 px-2 text-sm"
        onClick={() =>
          setRecepient({
            transferStatus: "pending",
            userId: friend._id,
            firstName: friend.firstName,
            lastName: friend.lastName,
          })
        }
      >
        Send Money
      </button>
    </div>
  );
}

function SendMoneyModal({ token }) {
  const [recepient, setRecepient] = useRecoilState(recepientAtom);
  if (recepient.transferStatus === "not initiated") {
    return <></>;
  } else
    return (
      <div className="bg-gray-100 opacity-95 z-50 flex justify-center items-center h-screen w-screen fixed top-0 left-0">
        <div className="bg-white border rounded-lg p-5 opacity-100">
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => {
              setRecepient({
                userId: recepient.userId,
                transferStatus: "not initiated",
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <SendMoneyMain token={token} />
          {/* send money */}
        </div>
      </div>
    );
}

function SendMoneyMain({ token }) {
  const [amount, setAmount] = useState(0);
  const [recepient, setRecepient] = useRecoilState(recepientAtom);
  const userId = recepient.userId;
  const transferStatus = recepient.transferStatus;

  async function transferMoney() {
    const transferPayload = {
      to: recepient.userId,
      amount,
    };
    try {
      const response = await axios.post(
        "https://507ddff1-ad1c-4e87-960e-cc49d0f250ae-00-35vdytk1f75t7.pike.replit.dev/api/v1/account/transfer",
        transferPayload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (response.status === 200) {
        setRecepient({
          userId,
          transferStatus: "success",
        });
      } else {
        setRecepient({
          userId,
          transferStatus: "failed",
        });
      }
    } catch (err) {
      setRecepient({
        userId,
        transferStatus: "failed",
      });
    }
  }

  // console.log(transferStatus);
  if (transferStatus == "pending") {
    return (
      <div className="flex flex-col items-center justify-center h-full px-5 pb-5">
        <div className="text-2xl font-medium text-gray-900 m-5 mb-10">Send Money</div>
        <img
          className="rounded-full w-15"
          src={`https://ui-avatars.com/api/?name=${recepient.firstName}+${recepient.lastName}`}
        ></img>
        <div className="text-lg font-medium text-gray-900 m-2">
          {recepient.firstName} {recepient.lastName}
        </div>
        <input
          type="text"
          className="rounded border m-5 p-2"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <button
          className="rounded border m-5 py-1 px-3"
          onClick={transferMoney}
        >
          Transfer
        </button>
      </div>
    );
  } else if (transferStatus == "success") {
    return (
      <div>
        <img
          src="../success.png"
          alt="Transaction successful"
          className="w-60"
        ></img>
        {/* <div>Money Transferred:)</div> */}
      </div>
    );
  } else if (transferStatus == "failed") {
    return (
      <div>
        <img
          src="../failed.jpg"
          alt="Transaction failed"
          className="w-60"
        ></img>
        {/* <div>Something went wrong:(</div> */}
      </div>
    );
  }
}
