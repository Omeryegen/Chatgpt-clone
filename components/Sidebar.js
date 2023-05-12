import {db} from '../library/Firebase'
import { useState } from 'react';
import {  doc, setDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faTrashCan } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar({list, chats, setChat, currentChat}) {
    const [model, setModel] = useState(list.data[0].id)
    
    const router = useRouter()
  const addChat = async() => {
    try {
      const id = crypto.randomUUID()
      const docSample = doc(db, "chats",  id);
      const data = {
        chatId: id,
        chatName: "New Chat",
        chatModel: model,
        chat: []
      }
      await setDoc(docSample, data);
      setChat(data)
      router.replace(router.asPath)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const deleteChat = async(id) => {
    try {
      await deleteDoc(doc(db, "chats", id));
      if( currentChat && currentChat.chatId === id){
        setChat(null)
      }
      
      router.replace(router.asPath)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const setColor = (id) =>{
    if(currentChat && currentChat.chatId === id){
      return true
    }else {
      return false
    }
  }
  return (
    <div className='flex flex-col items-center w-70  h-screen bg-zinc-800 p-4 '>
      <button onClick={addChat} className="w-full text-white border-2 h-8 border-white hover:bg-zinc-700 mb-2 rounded-lg">Add New Chat</button>
      <select value={model} onChange={(e)=> setModel(e.target.value)} className="select w-full max-w-xs mb-4">
       {
        list.data.map(element => {
          return <option key={element.id}>{element.id}</option>
        })
       }
      </select>
      <div className='w-full'>
        {
          chats.length > 0 ? chats.map(element =>{
            return (
              <div key={element.chatId} className={`py-4 rounded-lg mb-2 px-2 flex flex-row justify-between items-center ${setColor(element.chatId) ? 'bg-gray-500 hover:bg-gray-600': "bg-zinc-800 hover:bg-zinc-700"}`}>
                <FontAwesomeIcon className='w-1/6' style={{fontSize: 20, color: 'white'}}  icon={faMessage}/>
                <div onClick={()=> {
                  setChat(element)
                  }} className='w-4/6 px-2 cursor-pointer '>
                  <p className='w-full truncate text-white text-sm' >{element.chatName.substr(0,20)}</p>
                </div>
                <button onClick={()=> deleteChat(element.chatId)} className='text-white w-1/6'><FontAwesomeIcon icon={faTrashCan}/></button>
              </div>
            )
          }): null
        }
      </div>
    </div>
  )
}

