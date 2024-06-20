import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from '../config/firebase'

function ChatApp(props) {
  const {room} = props;
  const [message, setMessage] = useState("");
  const [sms, setSms] = useState([]);

  const messageRef = collection(db, 'messages');

  useEffect(() => {
    const queryMessages = query(
      messageRef, 
      where("room", "==", room),
      orderBy("createdAt"),
      );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id });
      });
      setSms(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setMessage("");
  };

  

  return (
    <div>
      <div className='w-screen border border-slate-900'>
        <p className='p-4 bg-gradient-to-r from-green-400 to-cyan-500 text-white text-3xl text-center'>Welcome to Room: {room}</p>
        <div className='bg-white px-2 w-screen'>
        {sms.map(message => (
          <div className='text-start md:py-3'>
            <div className='pb-3 md:flex md:flex-row'>
              <p className='pr-2 text-wrap'>{message.user} : </p>
              <p className='pr-2 text-wrap'>{message.text}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
      <form className='px-2 py-2 bg-blue-800 flex justify-around'>
        <input className='py-3 w-full bg-white' type="text" placeholder='Enter your message...' value={message} onChange={e => setMessage(e.target.value)} />
        <button className='mx-3 px-3 py-2 bg-green-600 rounded-xl text-white' type='submit' onClick={handleSubmit }>Send</button>
      </form>
    </div>
  )
}

export default ChatApp
