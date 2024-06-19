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
      <div className='w-screen h-full border border-slate-900'>
        <p className='p-2 bg-slate-900 text-white text-3xl mb-7 text-center'>Welcome to Room: {room}</p>
        {sms.map(message => (
          <div className='text-start'>
            <div className='pb-3 flex flex-row'>
              <p className='pr-2'>{message.user} : </p>
              <p className='pr-2'>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form className='flex justify-between border border-slate-900'>
        <input className='py-3 w-full ' type="text" placeholder='Enter your message...' value={message} onChange={e => setMessage(e.target.value)} />
        <button className='px-3 py-2 bg-slate-900 text-white' type='submit' onClick={handleSubmit }>Submit</button>
      </form>
    </div>
  )
}

export default ChatApp
