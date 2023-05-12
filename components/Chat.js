import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { db } from "../library/Firebase";
import {  useState } from "react";
import { openai } from "../library/Chatgpt";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from 'react-hot-toast';
import Example from "./Example";
export default function Chat({current}) {
    const currentChat = current ? current[0] : null
    const [text,setText] = useState("");
    const router = useRouter()
    console.log(text)
    const sendMessage = async () =>{
        if(currentChat){
            const myPromise = new Promise(async (res, rej) => {
                const msg= text
                try{
                console.log(msg)
                  const docRef = doc(db, "chats", currentChat.chatId);
                  await updateDoc(docRef, {
                      chat: arrayUnion({
                        owner: 'me',
                        message: msg
                      }),
                      chatName: msg
                  });    
                  setText("")
                  router.replace(router.asPath)   
                  const response = await openai.createCompletion({
                      model : currentChat.chatModel,
                      prompt: msg,
                      max_tokens: 1000,
                  })
                  await updateDoc(docRef, {
                      chat: arrayUnion({
                          owner: "chatgpt",
                          message: response.data.choices[0].text
                      })
                  });
                  
                  router.replace(router.asPath)  
                  setText("")
                  res(true)
                  }
                  catch {
                      rej(false)
                  }
              })
              toast.promise(myPromise, {
                  loading: 'Chatgpt is thinking',
                  success: 'Chatgpt succesfully answered',
                  error: 'Error when fetching',
                });
        }else{
            toast.error('You should create a chat!')
        }
     
    }

  return (
    <div className='w-full  h-full bg-gray-700'>
        <div className="w-full h-5/6 bg-gray-700 flex flex-col items-center overflow-y-scroll scrollbar-hide">
            {
                currentChat ? currentChat.chat.map(element =>{
                    return (
                        <div className={`w-full flex justify-center py-4 ${element.owner === "me" && "bg-gray-500"}`}>
                            <div className="w-3/4 flex flex-row items-center">       
                                <img  className="w-8 h-8 mr-4 rounded-full" src={element.owner === "chatgpt" ? "/chatgpt.png" : '/profile.jpg'} />
                                <p key={element.chatId} className={`w-full text-white py-4`}>{element.message}</p>
                            </div> 
                        </div>
                    )
                }): <Example/>
            }
        </div>
        <div className="w-full h-1/6 bg-gray-600 flex flex-row form-control items-center justify-center">
            <div className="input-group flex justify-center w-5/6">
                <input value={text} onChange={(e)=> setText(e.target.value)} type="text" placeholder="What dou you want to know?" className=" w-full  input input-bordered" />
                <button onClick={sendMessage} className="btn btn-square">
                    <FontAwesomeIcon  icon={faPaperPlane} />
                </button>
            </div>
        </div>
        <Toaster position="top-right"/>
    </div>
  )
}
