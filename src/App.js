import { useState, useRef } from "react";
import ChatApp from "./components/chatapp";
import SignIn from './components/signin';
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const inputRoomRef = useRef();

  if (!isAuth) {
    return (
      <div className="flex justify-center">
      <SignIn setIsAuth={setIsAuth} />
      </div>
    );
  }

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }

  return (
  <div className="flex flex-col justify-center items-center self-center">
    {room ? (
      <div>
        <ChatApp room={room} />
      </div>
    ) : (
      <div className="flex flex-col border border-slate-900 justify-center items-center">
        <p className="p-2 text-slate-900 text-3xl">Enter room number</p><br />
        <input className="p-2 border border-slate-900 rounded-xl" ref={inputRoomRef} /><br />
        <button className="p-2 my-3 border rounded-lg text-slate-900 bg-white border-slate-900 hover:bg-slate-900 hover:text-white" onClick={() => setRoom(inputRoomRef.current.value)}>Submit</button>
      </div>
    )}
    <div className="my-5 flex justify-center">
      <button className="p-3 bg-red-500 text-white" onClick={signUserOut}>Sign Out</button>
    </div>
  </div>
  );
}

export default App;
