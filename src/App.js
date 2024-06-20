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
      <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-center items-center">
        <div className="flex justify-center">
          <SignIn setIsAuth={setIsAuth} />
        </div>
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
  <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center self-center">
    {room ? (
      <div className="h-screen w-screen">
        <ChatApp room={room} />
      </div>
    ) : (
      <div className="px-10 py-20 flex flex-col border border-white rounded-lg shadow-2xl justify-center items-center self-center">
        <p className="p-2 text-white text-3xl">Enter room number</p><br />
        <input className="p-2 border border-gray-400 rounded-xl" ref={inputRoomRef} /><br />
        <button className="px-3 py-4 my-3 border rounded-2xl shadow-xl text-slate-900 bg-white border-gray-400 hover:bg-blue-700 hover:text-white" onClick={() => setRoom(inputRoomRef.current.value)}>Submit</button>
        <div className="my-5 flex justify-center">
          <button className="p-3 my-5 rounded-2xl bg-red-600 text-white hover:bg-red-700" onClick={signUserOut}>Sign Out</button>
        </div>
      </div>
    )}
  </div>
  );
}

export default App;
