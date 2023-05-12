import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { openai } from '../library/Chatgpt';
import {db} from '../library/Firebase'
import { collection, getDocs} from "firebase/firestore";
import Chat from '../components/Chat';
import { useState } from 'react';
export default function Home({list, chats}) {
  const [currentChat, setCurrentChat] = useState(null)
  const filtered = currentChat ? chats.filter(element => element.chatId === currentChat.chatId) : null
  
  const setChat = async (element) =>{
      setCurrentChat(element)
  } 
  return (
    <div >
      <Head>
        <title>ChatGPT Clone</title>
        <link rel="icon" href="/chatgpt.ico" />
      </Head>
      <main className='w-screen h-screen flex'>
        <Sidebar currentChat={currentChat}  setChat= {setChat} list={list} chats={chats}/> 
        <Chat setChat= {setChat}  current= {filtered}/>
      </main>
    </div>
  )
}
export async function getServerSideProps() {
    const response = await openai.listModels()
    const querySnapshot = await getDocs(collection(db, "chats"));
    
    let chats = []
    querySnapshot.forEach((doc) => {
     chats.push(doc.data())
    });
    
  return {
      props: { list: response.data, chats: chats  },
  };
}
